import Axios from 'axios'

export const getCart = (config) => {
    return {
        type: 'GET_CART',
        payload: Axios.get('http://localhost:3001/api/v1/cart/', config)
    }
};

export const postCart = (data, config) => {
    return {
        type: 'POST_CART',
        payload: Axios.post('http://localhost:3001/api/v1/cart/', data, config)
    }
};

export const patchCart = (id, data, config) => {
    return {
        type: 'PATCH_CART',
        payload: Axios.patch('http://localhost:3001/api/v1/cart/' + id, data, config)
    }
};

export const deleteCart = (config) => {
    return {
        type: 'DELETE_CART',
        payload: Axios.delete('http://localhost:3001/api/v1/cart/cancel', config)
    }
};

export const deleteDetailCart = (id, config) => {
    return {
        type: 'DELETE_DETAIL_CART',
        payload: Axios.delete('http://localhost:3001/api/v1/cart/' + id, config)
    }
};

export const checkoutCart = (data, config) => {
    return {
        type: 'CHECKOUT_CART',
        payload: Axios.post('http://localhost:3001/api/v1/cart/checkout', data, config)
    }
};

export const getOrders = (config) => {
    return {
        type: 'GET_ORDERS',
        payload: Axios.get('http://localhost:3001/api/v1/orders/', config)
    }
}