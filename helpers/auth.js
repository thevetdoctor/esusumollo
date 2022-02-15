const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const { response } = require('oba-http-response');
config();

const { JWT_SECRET } = process.env;

module.exports = async(req, res, next) => {
    const { authorization } = req.headers;

    if(typeof authorization !== 'undefined') {
        req.token = authorization.split(' ')[1];

        jwt.verify(req.token, JWT_SECRET, (error, auth) => {
            if(error) {
                console.log(error.message)
                return response(res, 403, null, 'Auth Failed');
            }
            if(auth) {
                req.body.userId = auth.user.id;
            }
            next();
        });
    } else {
        return response(res, 403, null, 'Access forbidden');
    }
}