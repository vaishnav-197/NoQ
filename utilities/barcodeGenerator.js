const qr = require('qrcode');
  
const barcodeGenerator = async(data) => {

    
    let strData = JSON.stringify(data)
  
    qr.toString(strData, {type:'terminal'},
                    function (err, code) {

    if(err) return console.log("error occurred")
    
    //Preview image    
    // console.log(code)
});
  

    code = await qr.toDataURL(strData)
    return code
}


module.exports= barcodeGenerator


  

