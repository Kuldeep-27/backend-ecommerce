const jwt = require("jsonwebtoken");

const generateToken = (id,secret_key,expire) => {
    return jwt.sign(
        {
            _id: id
        },
        secret_key,
        {
            expiresIn : expire
        }
    )
}

module.exports = {
    generateToken
}