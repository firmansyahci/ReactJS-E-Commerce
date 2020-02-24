import React from 'react'
import API from '../axios/Api'
import { deleteCart, checkoutCart } from '../redux/actions/cart';
import { connect } from 'react-redux';

function Checkout({dispatch}) {

    const cancel = () => {
        dispatch(deleteCart({ headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } }))
    }

    const checkout = () => {
        dispatch(checkoutCart({}, ({ headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } })))
    }

    return (
        <div className="container">
                <div className="row mt-3">
                    <button className="btn btn-primary btn-sm btn-block" data-toggle="modal" data-target="#myCheckout" onClick={checkout}>Checkout</button>
                </div>
                <div className="row mt-3">
                    <button className="btn btn-danger btn-sm btn-block" onClick={cancel}>Cancel</button>
                </div>
                </div>
    )
}
const mapStateToProps = ({ cart }) => {
    return {
        cart
    }
}

export default connect(mapStateToProps)(Checkout)