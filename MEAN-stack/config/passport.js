const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('../models/users');
const config = require('../config/config');

module.exports = (passport)=>{
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts,async (jwtPayload,done)=>{
        const user = await Users.findById(jwtPayload._id)
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    }))
}
