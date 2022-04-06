const qr = require('qrcode');
  
const barcodeGenerator = async (data) => {

    let strData = JSON.stringify(data)
  
    qr.toString(strData, {type:'terminal'},
                    function (err, code) {
   
    if(err) return console.log("error occurred")
   
    console.log(code)
});
  
    qr.toDataURL(strData, function (err, code) {
    if(err) return console.log("error occurred")
   
    console.log(code)
})

}
  

