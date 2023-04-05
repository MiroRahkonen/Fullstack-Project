const express = require('express');
const router = express.Router();
const Users = require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const passport = require('passport');


router.post('/register',async (req,res,next)=>{
    if(Object.keys(req.body).length < 4){
        return res.status(400).json({success: false,message: "Necessary information missing"})
    }

    let existingUser = await Users.findOne({username: req.body.username})
    if(existingUser){
        return res.json({success: false,message: 'Account with username already exists'});
    }

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) throw err;
        const encryptedPassword = hash;

        await Users.create(
            {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: encryptedPassword,
                notes: []
            }
        );
    })
    return res.json({success: true,message: "Account created and registered"});
})

// Authentication
router.post('/authenticate',async (req,res,next)=>{
    let foundUser = await Users.findOne({username: req.body.username})
    if(!foundUser){
        return res.json({success: false,message: 'Authentication failed, user not found'});
    }

    bcrypt.compare(req.body.password,foundUser.password,(err,isMatch)=>{
        if(err) throw err;
        if(!isMatch){
            return res.json({success: false,message: 'Password not correct'});
        }
        const jwtToken = jwt.sign(foundUser.toJSON(),config.secret,{
            expiresIn: 3600 // 1 hour
        })
        res.json({
            success: true,
            token: `JWT ${jwtToken}`,
            user: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email
            }
        })
    })
})


router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user: req.user})
})

router.get('/notes',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({notes: req.user.notes});
})

router.post('/note',passport.authenticate('jwt',{session: false}),async (req,res,next)=>{
    let user = await Users.findOne({username: req.user.username});
    if(!user){return res.status(400).json({message: 'Error finding user'})};

    let date = new Date();

    //Minutes needs more checking to keep the leading zero
    let minutes = date.getMinutes();
    if(minutes < 10){
        minutes = '0'+minutes.toString()
    };

    let currentTime = date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear()+ 
        ' '+date.getHours()+':'+minutes;

    const newNote = {
        time: currentTime,
        message: req.body.note
    }
    user.notes.push(newNote);
    //user.notes = [];
    user.save();
    res.json({message: 'Note added successfully'});
})

router.delete('/note',passport.authenticate('jwt',{session:false}),async (req,res,next)=>{
    let user = await Users.findOne({username: req.user.username});
    if(!user){return res.status(400).json({message: 'Error finding user'})};
    
    user.notes = user.notes.filter((note) => note.id !== req.body.noteID);
    user.save();
    res.json({message: 'Note deleted'});
})


module.exports = router;