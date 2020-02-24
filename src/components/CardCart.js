import React from 'react'
import API from '../axios/Api'
import { patchCart, deleteDetailCart } from '../redux/actions/cart'
import { connect } from 'react-redux'

function CardCart({ products, dispatch, totalPrice }) {
    // async function addQty() {
    //     let qty = products.qty + 1;
    //     await API.patch('cart/' + products.id, { 'qty': qty }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } })
    //     window.location.reload();
    // }

    const addQty = () => {
        let qty = products.qty + 1;
        dispatch(patchCart(products.id, {'qty': qty}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } }))
    }

    const minQty = () => {
        let qty = products.qty - 1;
        if (qty >= 1) {
            dispatch(patchCart(products.id, {'qty': qty}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } }))
        } else {
            dispatch(deleteDetailCart(products.id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }}))
        }
    }

    // async function minQty() {
    //     let qty = products.qty - 1;
    //     if (qty > 0)
    //         await API.patch('cart/' + products.id, { 'qty': qty }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } })
    //     window.location.reload();
    // }

    return (
        <div>
            <div className="row mt-3" >
                <div className="col">
                    <img src={products.image} style={{ width: 100 }} alt="img" />
                </div>
                <div className="col">
                    <h6>{products.name}</h6>
                    <br />
                    <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-success" onClick={minQty}>-</button>
                        <button className="btn btn-outline-success">{products.qty}</button>
                        <button className="btn btn-outline-success" onClick={addQty}>+</button>
                    </div>
                </div>
                <div className="col">
                    <br />
                    <h6>Rp.{products.total_price}</h6>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = ({ cart }) => {
    return {
        cart
    }
}

export default connect(mapStateToProps)(CardCart)