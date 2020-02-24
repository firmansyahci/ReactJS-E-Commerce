import Axios from 'axios'

export const getProduct = () => {
    return {
        type: 'GET_PRODUCT',
        payload: Axios.get('http://localhost:3001/api/v1/product/')
    }
};

export const postProduct = (data, config) => {
    return {
        type: 'POST_PRODUCT',
        payload: Axios.post('http://localhost:3001/api/v1/product/', data, config)
    }
};

export const updateProduct = (product_id, data, config) => {
    return {
        type: 'PATCH_PRODUCT',
        payload: Axios.patch('http://localhost:3001/api/v1/product/' + product_id, data, config)
    }
};

export const deleteProduct = (product_id) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: Axios.delete('http://localhost:3001/api/v1/product/' + product_id)
    }
};