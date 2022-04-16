import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function ShopRegister() {
    const [user, setUser] = useState({
        name:'', email:'', password: '', address: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/shop/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <input type="textarea" name="address" required
                placeholder="Address" value={user.address} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/shop/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default ShopRegister