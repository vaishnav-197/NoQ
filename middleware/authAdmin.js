const Users = require('../models/userModel')
const Shops = require('../models/shopModel')
const authAdmin = async (req, res, next) =>{
    try {
        // Get user information by id
        let user = null
        if (req.body.admin == 1) {
            user = await Shops.findOne({
                _id: req.user.id
            })
        } else {
            user = await Users.findOne({
                _id: req.user.id
            })
        }

        

        if(user.role === 0)
            return res.status(400).json({msg: "Admin resources access denied"})

        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message , line:'1'})
    }
}

module.exports = authAdmin