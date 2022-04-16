const Shops = require('../models/shopModel')
const token = require('../utilities/tokenGenerator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')





const shopCtrl = {

    createShop: async (req,res)=> {
        try {
            const {
                shopName,
                email,
                password,
                address,
            }= req.body
            const products = []
            const sales = []
            const shop = await Shops.findOne({email})
            if(shop) return res.status(400).json({msg: "The email already exists."})

            if(password.length < 6) 
                return res.status(400).json({msg: "Password is at least 6 characters long."})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = new Shops({
                shopName,
                email, 
                password: passwordHash,
                address,
                products,
                sales
            })

            await newShop.save()


            const accesstoken = token.createAccessToken({id: newShop._id})
            const refreshtoken = token.createRefreshToken({id: newShop._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateShop: async (req,res)=> {
        try {
            const shop = await Shops.findById(req.user.id)
            if(!shop) return res.status(400).json({msg: 'Shop doesnt exist'})
            
            const filter = { id: req.user.id}
            const update = { shopName:req.body.shopName }

            const doc = await Shop.findOneAndUpdate(filter, update , {
                new: true
              });
            
            res.status(200).json({msg:'Updated Succesfully'})
            
        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteShop: async (req,res)=> {
        try {
            // to be done later
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login : async (req,res)=> {
        try {
            
            const { email , password} = req.body
            const shop = await Shops.findOne({email})

            if(!shop) return res.status(400).json({msg: "Incorrect credentials."})


            const isMatch = await bcrypt.compare(password, shop.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect credentials."})

            const accesstoken = token.createAccessToken({id: shop._id})
            const refreshtoken = token.createRefreshToken({id: shop._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req,res)=> {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken : async (req,res)=> {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    shopList : async (req,res) =>{
        try {
            const shops = await Shops.find({}).select('shopName')
            console.log(shops)
            if(!shops) return res.status(400).json({msg: "No shops exist in your Region."})

            res.status(200).json({msg:shops})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = shopCtrl 