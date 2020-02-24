import React, { Component } from 'react'
import API from '../axios/Api'
import CardCart from './CardCart'
import Checkout from './Checkout'

export class Cart extends Component {

    state = {
        cart: []
    }

    componentDidMount(){
        this.getCart();
    }

    // List Cart
    getCart = () => {
        API.get('cart/', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } })
            .then(response => this.setState({
                cart: response.data.result
            }))
    }

    render() {
        const renderData = this.state.cart.map(carts => {
            return (
                <CardCart token={this.state.token} products={carts} key={carts.id} />
            );
        })
        const checkOut = this.state.cart.length > 0 ? <Checkout /> : null;

        return (
            <div>
                {renderData}
                <br />
                {checkOut}
            </div>
            
        )
    }
}

export default Cart
