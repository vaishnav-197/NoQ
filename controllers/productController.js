const Shops = require('../models/shopModel')
const qr = require('qrcode');
const barcodeGenerator = require('../utilities/barcodeGenerator')



const productControl = {
    createProduct : async (req,res) => {
        
        try {
            
            const product = req.body
            delete product['admin']
            barcodeGenerator(product).then( (code)=>{
                product.barcode = code
            }).then( async()=> {
                const shop = await Shops.findById(req.user.id)
                if(!shop) return res.status(400).json({msg: 'Shop doesnot exist'})
                shop.products.push(product)


                await shop.save()
                return shop
            }).then( (shop) => {
                res.status(200).json({msg:shop})
            })

        
            
            

            



        } catch (err) {
            return res.status(500).json({msg: err.message })
        }
    }
}


module.exports = productControl



// async (req,res) => {
//     try {
        
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
// }