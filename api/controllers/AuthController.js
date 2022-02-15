const {Sequelize, Op} = require("sequelize");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models').user;
const { response } = require('oba-http-response');

exports.signUp = async(req, res) => {
    let { email, password, username } = req.body;
    try {
        if(!(email && password && username)) return response(res, 400, null, 'Please supply missing input(s)');

        const hash = bcrypt.hashSync(password, 10);
            const newUser = await Users.create({username, email, password: hash});
            newUser.password = null;
            const token = jwt.sign({user: newUser }, process.env.JWT_SECRET);

        response(res, 201, { token, user: newUser }, null, 'Account created');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in creating user');
    }
}

exports.logIn = async(req, res) => {
    let { email, password } = req.body;
    try {
        if(!(email && password)) return response(res, 400, null, 'Please supply missing input(s)');

        let user = await Users.findOne({ where: {
            email
        }, raw: true});
        
        if(!user) return response(res, 400, null, 'User does not exist');
        const compared = bcrypt.compareSync(password, user.password);
        if(!compared) return response(res, 400, null, 'Invalid credentials');
        user.password = null;
        const token = jwt.sign({user: user }, process.env.JWT_SECRET);

        response(res, 200, { token, user, newUser: false }, null, 'Logged In');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in logging in user');
    }
}