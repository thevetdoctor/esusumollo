const {Sequelize, Op} = require("sequelize");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models').user;
const { response } = require('oba-http-response');
const missingInput = require('../helpers/missingInput');
const { ErrorClone } = require('../helpers/error');

exports.signUp = async(req, res, next) => {
    const { email, password, username } = req.body;
    try {
        
        const required = ['email', 'password', 'username'];
        missingInput(required, req.body);

        let user = await Users.findOne({ where: {
            email
        }, raw: true});
        
        if(user) throw new ErrorClone(404, 'User already exist');   
        const hash = bcrypt.hashSync(password, 10);
            const newUser = await Users.create({username, email, password: hash});
            newUser.password = null;
            const token = jwt.sign({user: newUser }, process.env.JWT_SECRET);

        response(res, 201, { token, user: newUser }, null, 'Account created successfully');
    } catch(e) {
        next(e)
    }
}

exports.logIn = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        const required = ['email', 'password'];
        missingInput(required, req.body);
    
        let user = await Users.findOne({ where: {
            email
        }, raw: true});
        
        if(!user) throw new ErrorClone(404, 'User does not exist');
        const compared = bcrypt.compareSync(password, user.password);
        if(!compared) throw new ErrorClone(404, 'Invalid credentials');
        user.password = null;
        const token = jwt.sign({user: user }, process.env.JWT_SECRET);

        response(res, 200, { token, user, newUser: false }, null, 'Logged In');
    } catch(e) {
        next(e);
    }
}