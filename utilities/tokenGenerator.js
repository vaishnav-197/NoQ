const jwt = require('jsonwebtoken')


const token={

    createAccessToken: (user) =>{
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
    },
    createRefreshToken: (user) =>{
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
    }
}


module.exports = token


