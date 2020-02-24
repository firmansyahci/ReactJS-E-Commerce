import React, { Component } from 'react'
import Axios from 'axios'
import { postProduct } from '../redux/actions/product'
import { connect } from 'react-redux'

export class UploadProduct extends Component {
    state = {
        name: '',
        description: '',
        stock: '',
        price: '',
        category_id: '',
        image: 'null',
        category: []
    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlerFileUpload = (event) => {
        this.setState({ image: event.target.files[0] });
    }

    componentDidMount = async () => {
        const cat = await Axios.get('http://localhost:3001/api/v1/category/')
        this.setState({
            category: cat.data.result
        })
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

        this.props.dispatch(postProduct(fd, config));
        // window.location.reload();
    }

    render() {
        const select = this.state.category.map(categorys => {
            return <option key={categorys.id} value={categorys.id} >{categorys.name}</option>
        })
        return (
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Item</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="name" onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="description" onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Stock</label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control" name="stock" onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Price</label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control" name="price" onChange={this.handlerChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Category</label>
                                <div className="col-sm-10">
                                    <select type="text" className="form-control" name="category_id" onChange={this.handlerChange}>{select}</select>
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
        )
    }
}

const mapStateToProps = ({ product }) => {
    return {
        product
    }
}

export default connect(mapStateToProps)(UploadProduct)
