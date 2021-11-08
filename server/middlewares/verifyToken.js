const jwt = require('jsonwebtoken')

module.exports = (token) => {
    let decodeToken;
    try{
        decodeToken = jwt.verify(token, 'refreshToken')
    }
    catch(err){
        throw new Error("Unauthorized!")
    }

    let email = decodeToken.email
    return email
}