import React, {useState} from 'react'
import EditProduct from './EditProduct'
import { connect } from 'react-redux'
import { deleteProduct } from '../redux/actions/product'
import { postCart } from '../redux/actions/cart'

const CardProduct = ({ products, dispatch }) => {

    const [idProduct, setIdProduct] = useState(0);

    const deleteProducts = () => {
        dispatch(deleteProduct(products.id));
    }

    // const addCart = () => {
    //     API.post('cart/', { product_id: products.id, qty: 1 }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } });
    //     window.location.reload();
    // }

    const addCart = () => {
        dispatch(postCart({product_id: products.id, qty: 1}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } }))
    }

    return (
        <div className="col-md-4" key={products.id}>
            <img className="img-fluid" src={products.image} alt="Card image cap" style={{ width: 250, height: 150, cursor:"pointer" }} onClick={addCart}/>
            <h6>{products.name}</h6>
            <h6>Rp. {products.price}</h6>
            <i className='fas fa-edit' data-toggle="modal" data-target="#myEditModal" onClick={()=>setIdProduct(products)}></i>
            <EditProduct products={products}/>
            <i className='fas fa-trash' data-toggle="modal" data-target="#myDeleteModal" onClick={()=> setIdProduct(products.id)}></i>

            {/* Delete Modals */}
            <div className="modal" id="myDeleteModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure to delete this data?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={deleteProducts}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ product, cart }) => {
    return {
        product,
        cart
    }
}

export default connect(mapStateToProps)(CardProduct)