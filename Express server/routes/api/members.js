var express = require('express');
var uuid = require('uuid');
const logger = require('../../middleware/logger');
var router = express.Router();
let Members = require('../../Members');

//router.use(logger);


router.get('/',(req,res,next)=>{
    res.json(Members);
})

router.get('/:id',(req,res,next)=>{
    let member = Members.find(member => member.id.toString() === req.params.id)
    if(member){
        console.log(member)
        return res.json(member)
    }
    return res.status(400).json({message: `Member '${req.params.id}' not found`});
})

router.post('/',(req,res,next)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email){
        return res.status(400).json({message: 'Name and/or e-mail missing'});
    }
    Members.push(newMember);
    return res.json(Members);
    //Redirecting in case we are sending json to a template
    //res.redirect('/');
})

router.put('/:id',(req,res,next)=>{
    let member = Members.find(member => member.id.toString() === req.params.id)
    if(member){
        member.name = req.body.name ? req.body.name : member.name;
        member.email = req.body.email ? req.body.email : member.email;
        return res.json({message: `Member '${member.id}' updated`,member});
    }
    return res.status(400).json({message: `Member '${req.params.id}' not found`});
})

router.delete('/:id',(req,res,next)=>{
    let found = Members.some(member => member.id.toString() === req.params.id)
    if(found){
        Members = Members.filter((member) => member.id.toString() !== req.params.id)
        return res.json({message: `Member '${req.params.id}' deleted`,Members});
    }
    return res.status(400).json({message: `Member '${req.params.id}' not found`});
})


module.exports = router;