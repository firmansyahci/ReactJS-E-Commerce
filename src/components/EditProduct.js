import React, { Component } from 'react'
import Axios from 'axios'
import { updateProduct } from '../redux/actions/product'
import { connect } from 'react-redux'

class EditProduct extends Component {
    state = {
        id: this.props.products.id,
        name: '',
        description: '',
        stock: '',
        price: '',
        category_id: '',
        image: 'null',
        category: []
    }

    componentDidMount = async () => {
        // if (this.props.products > 0) {
        //     const id = this.props.products;
        //     console.log(this.props.products)
        //     const res = await Axios.get('http://localhost:3001/api/v1/product/' + id);
        //     this.setState({
        //         name: res.data.result[0].name,
        //         description: res.data.result[0].description,
        //         stock: res.data.result[0].stock,
        //         price: res.data.result[0].price,
        //         category_id: res.data.result[0].category_id,
        //         image: res.data.result[0].image
        //     })
        // }
        const cat = await Axios.get('http://localhost:3001/api/v1/category/')
        this.setState({
            category: cat.data.result
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         id: nextProps.products.id,
    //         name: nextProps.products.name,
    //         description: nextProps.products.description,
    //         stock: nextProps.products.stock,
    //         price: nextProps.products.price,
    //         category_id: nextProps.products.category_id
    //     });
    // }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlerFileUpload = (event) => {
        this.setState({ image: event.target.files[0] });
    }

    handlerSubmit = async (event) => {
        const fd = new FormData();
        fd.append('name', this.state.name)
        fd.append('description', this.state.description)
        fd.append('stock', this.state.stock)
        fd.append('price', this.state.price)
        fd.append('category_id', this.state.category_id)
        fd.append('image', this.state.image)

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        await this.props.dispatch(updateProduct(this.props.products.id, fd, config));
        this.setState({
            product: this.props.product.productData
        })

        // await Axios.patch('http://localhost:3001/api/v1/product/' + this.props.products.id, fd, config);
        // this.props.history.push('/')
        // window.location.reload();
    }

    render() {
        // const {name, description, stock, price, category_id, image} = this.state;
        // const {id, name, description, stock, price, category_id, image} = this.props;
        // this.setState({
        //     name: this.props.products.name
        // })
        // const productsDetail = this.props.products !== null ? this.props.products : '';
        // const productDetail = Axios.get('http://localhost:3001/api/v1/product/' + this.props.products).then(res => {
        //     // console.log(res)
        //     this.setState({
        //         name: res.data.result.name,
        //         description: res.data.result.description,
        //         stock: res.data.result.stock,
        //         price: res.data.result.price,
        //         category_id: res.data.result.category_id,
        //         image: res.data.result.image
        //     })
        // })
        // console.log(this.state);
        // const productsDetail = this.props.products.map(detail => {
        //     return detail.name
        // });
        const select = this.state.category.map(categorys => {
            return <option key={categorys.id} value={categorys.id} >{categorys.name}</option>
        })
        return (
            <div className="modal" id="myEditModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Item</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="name" defaultValue={this.props.products.name} onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="description" defaultValue={this.props.products.description} onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Stock</label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control" name="stock" defaultValue={this.props.products.stock} onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Price</label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control" name="price" defaultValue={this.props.products.price} onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Category</label>
                                <div className="col-sm-10">
                                    <select type="text" className="form-control" name="category_id" defaultValue={this.props.products.category_id} onChange={this.handlerChange}>{select}</select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Image</label>
                                <input type="file" name="image" onChange={this.handlerFileUpload} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <input type="submit" name="add" value="Add" className="btn btn-primary" onClick={this.handlerSubmit} data-dismiss="modal" />
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            // <div>
            //         Name : <input type="text" name="name" value={name} onChange={this.handlerChange} />
            //         Description : <input type="text" name="description" value={description} onChange={this.handlerChange} />
            //         Stock : <input type="number" name="stock" value={stock} onChange={this.handlerChange} />
            //         Price : <input type="number" name="price" value={price} onChange={this.handlerChange} />
            //         Category : <select name="category_id" onChange={this.handlerChange} value={category_id}>{select}</select>
            //         Image : <input type="file" name="image" accept="image/png, .jpeg, .jpg, image/gif" onChange={this.handlerFileUpload} />
            //         <button type="button" value="Add" onClick={this.handlerSubmit}>Add</button>
            // </div>
        )
    }
}
const mapStateToProps = ({ product }) => {
    return {
        product,
    }
}

export default connect(mapStateToProps)(EditProduct)