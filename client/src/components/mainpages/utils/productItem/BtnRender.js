import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'
import QRCode from 'qrcode';

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

const generateQR = async () => {
try {
    const response = await QRCode.toDataURL(product._id);
    console.log(response);
    
} catch (error) {
    console.log(error);
}
}
    
    return (
        
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                    <button id="btn_qr" onClick={generateQR}>
                        QR
                    </button>
                </>
                : <>
                    <Link id="btn_buy" to="#!" >
                        ROW {product.row}
                    </Link>
                    <Link id="btn_buy" to="#!" >
                        SHELF {product.shelf}
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
