import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ShopItem from '../utils/shopItem/shopItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Shops() {
    const state = useContext(GlobalState)
    const [shops, setShops] = state.productsAPI.shops
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        shops.forEach(shop => {
            if(shop._id === id) shop.checked = !shop.checked
        })
        setShops([...shops])
    }

    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        shops.forEach(shop => {
            shop.checked = !isCheck
        })
        setShops([...shops])
        setIsCheck(!isCheck)
    }


    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
            </div>
        }

        <div className="shops">
            {
                shops.map(shop => {
                    return <ShopItem key={shop._id} shop={shop}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {shops.length === 0 && <Loading />}
        </>
    )
}

export default Shops
