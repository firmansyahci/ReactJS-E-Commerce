import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProduct } from '../redux/actions/product'
import { getCart, getOrders } from '../redux/actions/cart'
import UploadProduct from './UploadProduct'
import CardProduct from './CardProduct'
import fork from '../assets/images/fork.png'
import menu from '../assets/images/menu.png'
import search from '../assets/images/magnifying-glass.png'
import clipboard from '../assets/images/clipboard.png'
import add from '../assets/images/add.png'
import CartEmpty from '../assets/images/food-and-restaurant.png'
import CardCart from './CardCart'
import Checkout from './Checkout'
import Axios from 'axios'

export class Product extends Component {
    state = {
        product: [],
        cart: [],
        dataHistory: [],
        detailHistory: [],
        history: false,
        search: ''
    }

    componentDidMount() {
        if (localStorage.getItem("token") === null) {
            return this.props.history.push('/login');
        }
        this.getProduct();
        this.getCart();
        this.getHistory();
        this.getDetailHistory();
    }

    // Get List Product
    getProduct = async () => {
        await this.props.dispatch(getProduct());
        this.setState({
            product: this.props.product.productData
        })
    }

    // Get List Cart
    getCart = async () => {
        await this.props.dispatch(getCart({ headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } }))
        this.setState({
            cart: this.props.cart.cartData
        })
    }

    // Get History
    getHistory = () => {
        Axios.get('http://localhost:3001/api/v1/orders/all', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } })
            .then(response => this.setState({
                dataHistory: response.data.result
            }))
    }

    // Get Detail History
    getDetailHistory = async () => {
        await this.props.dispatch(getOrders({ headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } }))
        this.setState({
            detailHistory: this.props.cart.historyData
        })
    }

    // Search Product
    searchProduct = (event) => {
        event.preventDefault();
        if (this.state.search !== '') {
            Axios.get('http://localhost:3001/api/v1/product/search/' + this.state.search)
                .then(response => this.setState({ product: response.data.result }))
        } else {
            this.getProduct();
        }
    }

    inputSearch = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // Sort Product
    sortProductAsc = (event) => {
        event.preventDefault();
            Axios.get('http://localhost:3001/api/v1/product/sort')
                .then(response => this.setState({ product: response.data.result }))
    }
    sortProductDesc = (event) => {
        event.preventDefault();
            Axios.get('http://localhost:3001/api/v1/product/sort/desc')
                .then(response => this.setState({ product: response.data.result }))
    }

    deleteCheckout = () => {
        this.setState({ cart: [] });
    }

    render() {
        const cardProduct = this.state.product.map(products => {
            return (
                <CardProduct products={products} key={products.id} />
            );
        })

        const totalCart = this.state.cart.reduce((prev, cur) => {
            return prev + cur.total_price
        }, 0);

        const renderData = this.state.cart.map(carts => {
            return (
                <CardCart products={carts} key={carts.id} />
            );
        })

        const checkOut = this.state.cart.length > 0 ? <Checkout /> : null;

        const cart = this.state.cart.length < 1 ? <><div className="row mt-5">
            <img src={CartEmpty} alt="cartempty" className="mx-auto" />
            <br />
        </div>
            <div className="row">
                <h4 className="mx-auto">Your cart is empty</h4>
            </div>
            <div className="row">
                <h6 className="mx-auto text-secondary">Please add some item from the menu</h6>
            </div></> : <></>;

        const totalPrice = this.state.detailHistory.reduce((prev, cur) => {
            return prev + cur.price
        }, 0);

        const totalPricePPn = this.state.cart.length > 0 ? <><div className="row mt-5">
            <div className="col-8">
                <h5>Total :</h5>
            </div>
            <div className="col-4">
                <h5>Rp {totalCart}</h5>
            </div>
        </div>
            <div className="row">
                <div className="col">
                    <p className="text-muted">*Belum termasuk PPN</p>
                </div>
            </div></> : <></>

        const totalPPn = totalCart * 0.1;
        const totalAll = totalCart + totalPPn;

        const countOrders = this.state.detailHistory.reduce((prev, cur) => {
            return prev + 1
        }, 0);

        const detailHistory = this.state.detailHistory.map(detailhistorys => {
            return <>
                <tr key={detailhistorys.id}>
                    <td>{detailhistorys.id}</td>
                    <td>{detailhistorys.qty}</td>
                    <td>Rp.{detailhistorys.price}</td>
                    <td>{detailhistorys.created_at}</td>
                </tr>
            </>
        })

        const cartCheckout = this.state.cart.map(cartCheckoutDetails => {
            return (<div className="row" key={cartCheckoutDetails.id}>
                <div className="col-8">
                    <h6>{cartCheckoutDetails.name} {cartCheckoutDetails.qty}x</h6>
                </div>
                <div className="col">
                    <h6>Rp.{cartCheckoutDetails.total_price}</h6>
                </div>
            </div>);
        })

        const detail = this.state.history === false ? <><div className="col-md-7 bg-secondary" style={{height:554}}>
            <div className="row mt-3">
                {cardProduct}
            </div>
        </div>
            <div className="col-md-4 bg-white">
                <div className="mx-auto">
                    {cart}
                    {renderData}
                    <br />
                    {totalPricePPn}
                    {checkOut}
                </div>
            </div>
            {/*Modal Checkout*/}
            <div className="modal fade" id="myCheckout" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Checkout</h5>
                            <button type="button" className="close" onClick={this.deleteCheckout} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mt-5">
                            {cartCheckout}
                            <div className="row">
                                <div className="col-8">
                                    <h6>PPN 10%</h6>
                                </div>
                                <div className="col-4">
                                    <h6>Rp.{totalPPn}</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                </div>
                                <div className="col-2">
                                    <h6>Total :</h6>
                                </div>
                                <div className="col-4">
                                    <h6>Rp.{totalAll}</h6>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <h6>Payment Cash</h6>
                                </div>
                            </div>
                            <div className="row m-1">
                                <button type="button" className="btn btn-danger btn-sm btn-block" onClick={this.deleteCheckout} data-dismiss="modal">Print</button>
                            </div>
                            <div className="row">
                                <h6 className="mx-auto">Or</h6>
                            </div>
                            <div className="row m-1">
                                <button type="button" className="btn btn-primary btn-sm btn-block" onClick={this.deleteCheckout} data-dismiss="modal">Send Email</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> :
            <>
                <div className="container">
                    <div className="card-deck">
                        <div className="card bg-danger text-white mt-5" style={{ width: 8 }}>
                            <div className="card-body">
                                <h5 className="card-title">Income</h5>
                                <h6 className="card-subtitle mb-2 text-white">Rp. {totalPrice}</h6>
                            </div>
                        </div>
                        <div className="card bg-info text-white mt-5" style={{ width: '14rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">Orders</h5>
                                <h6 className="card-subtitle mb-2 text-white">{countOrders}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailHistory}
                        </tbody>
                    </table>
                </div>
            </>
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-1"><img src={menu} alt="menu" /></div>
                            <div className="col-md-6 text-center p-0"><h4>Food Items</h4></div>
                            <div className="col-md-1 p-0">
                                <div className="dropdown mt-1">
                                    <a className="btn btn-secondary dropdown-toggle btn-sm" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sort
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item" onClick={this.sortProductAsc} style={{ cursor: "pointer" }}>A-Z</a>
                                        <a className="dropdown-item" onClick={this.sortProductDesc} style={{ cursor: "pointer" }}>Z-A</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-right p-0">
                                <form className="form-inline my-2 my-lg-0" onSubmit={this.searchProduct}>
                                    <input className="form-control mr-sm-2" type="search" onChange={this.inputSearch} name="search" placeholder="Search" aria-label="Search" />
                                    {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                                    <img className="ml-3" style={{ cursor: "pointer" }} onClick={this.searchProduct} src={search} alt="search" />
                                </form>
                                {/*<input class="form-control sm-2" type="search" placeholder="Search" aria-label="Search" /><img src={search} alt="search" />*/}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <h5>Cart {this.state.cart.length}</h5>
                    </div>
                </nav>

                <div className="row">
                    <div className="col-md-1 bg-white">
                        <img src={fork} alt="fork" className="m-3" style={{ cursor: "pointer" }} onClick={() => this.setState({ history: false })} />
                        <img src={clipboard} alt="clipboard" className="m-3" style={{ cursor: "pointer" }} onClick={() => this.setState({ history: true })} />
                        <img src={add} alt="add" className="m-3" style={{ cursor: "pointer" }} data-toggle="modal" data-target="#myModal" />
                        <UploadProduct />
                        <a href="logout"><i className='fas fa-sign-in-alt m-3' style={{ fontSize: 48 }}></i></a>
                    </div>
                    {detail}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ product, cart }) => {
    return {
        product,
        cart
    }
}

export default connect(mapStateToProps)(Product)