const Shops = require('../models/shopModel')
const qr = require('qrcode');
const barcodeGenerator = require('../utilities/barcodeGenerator')



const productControl = {
    createProduct : async (req,res) => {
        
        try {
            
            // create product object
            const product = req.body
            delete product['admin']

            // generate barcode
            barcodeGenerator(product).then( (code)=>{
                product.barcode = code
            }).then( async()=> {

                // find shop
                const shop = await Shops.findById(req.user.id)
                if(!shop) return res.status(400).json({msg: 'Shop doesnot exist'})

                // push product to product array
                shop.products.push(product)


                await shop.save()
                return shop
            }).then( (shop) => {
                res.status(200).json({msg:shop})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message })
        }
    },
    updateProduct : async (req,res) => {
            try {
                // create product object to update
                const product = req.body
                delete product['admin']

                // generate new product barcode
                barcodeGenerator(product).then( (code)=>{
                    product.barcode = code
                }).then( async ()=>{
                    // find shop
                    const shop = await Shops.findById(req.user.id)
                    if(!shop) return res.status(400).json({msg: 'Shop doesnot exist'})
                    
                    // remove existing product from array
                    shop.products = shop.products.filter( (item) =>{ 
                        return item.title !== product.title; 
                      });
                    
                    //   push updated product to array
                    shop.products.push(product)
                    await shop.save()
                    return shop
                      
                }).then( (shop) => {
                    res.status(200).json({msg:shop})
                })


            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },
    deleteProduct:  async (req,res) => {
            try {
                
                // create product object to update
                const product = req.body
                delete product['admin']
                console.log('1')
                // find shop
                const shop = await Shops.findById(req.user.id)
                if(!shop) return res.status(400).json({msg: 'Shop doesnot exist'})
                console.log('2')
                // remove existing product from array
                shop.products = shop.products.filter( (item) =>{ 
                    return item.title !== product.title; 
                  });
                console.log("3")
                // save
                await shop.save()
                res.status(200).json({msg:shop})
            } catch (err) {
                return res.status(500).json({msg: err.message})
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