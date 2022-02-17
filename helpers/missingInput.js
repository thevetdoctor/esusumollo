const { ErrorClone } = require('../helpers/error');

module.exports = (requiredFields, requestBody) => {
    let missingFields =  requiredFields.filter(field => {
        return (Object.keys(requestBody).indexOf(field) < 0) || (Object.values(requestBody)[Object.keys(requestBody).indexOf(field)] == '')
    });
    if(missingFields.length){
        throw new ErrorClone(401, `Missing field(s): ${[...missingFields]}`)
    }
}