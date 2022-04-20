const Shops = require('../models/shopModel')


const ScanControl = {
    findProduct:  async (req,res) => {
            try {
                
                const shopId = req.body.shopId
                const productTitle = req.body.title
                const shop = await Shops.findById(shopId)
                
                if(!shop) return res.status(400).json({msg: 'An Error Occurred , Try Again Later'})
                
                const product = shop.products.map( (Element) =>{
                    if(Element.title === productTitle)
                        return Element
                })

                
                res.status(200).json({msg:product})

            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        }
}


module.exports = ScanControl