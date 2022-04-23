import React from 'react'
import BtnRender from './BtnRender'

function ShopItem({shop, isAdmin, deleteProduct, handleCheck}) {

    return (
        <div className="shop_card">
            {
                isAdmin && <input type="checkbox" checked={shop.checked}
                onChange={() => handleCheck(shop._id)} />
            }
            <img src={shop.images.url} alt="" />

            <div className="shop_box">
                <h2 title={shop.title}>{shop.title}</h2>
                <p>{shop.description}</p>
            </div>

            
            <BtnRender shop={shop} deleteProduct={deleteProduct} />
        </div>
    )
}

export default ShopItem
