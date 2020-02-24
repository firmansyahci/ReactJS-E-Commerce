const initialValue = {
    cartData: [],
    historyData:[],
    currentCheckout: [],
    errMsg: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
};

const cartReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'GET_CART_PENDING':
            return {
                ...state,
                isPending: true,
                isRejected: false,
                isFulfilled: false
            };
        case 'GET_CART_REJECTED':
            return {
                ...state,
                isPending: false,
                isRejected: true,
                errMsg: action.payload.data

            };
        case 'GET_CART_FULFILLED':
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                cartData: action.payload.data.result
            };
        case 'POST_CART_PENDING':
            return {
                ...state,
                isPending: true,
                isRejected: false,
                isFulfilled: false
            };
        case 'POST_CART_REJECTED':
            return {
                ...state,
                isPending: false,
                isRejected: true,
                errMsg: action.payload.data

            };
        case 'POST_CART_FULFILLED':
            state.cartData.push(action.payload.data.result)
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                cartData: state.cartData
            };
        case 'PATCH_CART_PENDING':
            return {
                ...state,
                isPending: true,
                isRejected: false,
                isFulfilled: false
            };
        case 'PATCH_CART_REJECTED':
            return {
                ...state,
                isPending: false,
                isRejected: true,
                errMsg: action.payload.data

            };
        case 'PATCH_CART_FULFILLED':
            const foundIndex = state.cartData.findIndex(x => x.id == action.payload.data.result.id)
            state.cartData[foundIndex] = action.payload.data.result
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                cartData: state.cartData
            };
        case 'DELETE_CART_PENDING':
            return {
                ...state,
                isPending: true,
                isRejected: false,
                isFulfilled: false
            };
        case 'DELETE_CART_REJECTED':
            return {
                ...state,
                isPending: false,
                isRejected: true,
                errMsg: action.payload.data

            };
        case 'DELETE_CART_FULFILLED':
            state.cartData.splice(0)
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                cartData: state.cartData
            };
        case 'DELETE_DETAIL_CART_PENDING':
            return {
                ...state,
                isPending: true,
                isRejected: false,
                isFulfilled: false
            };
        case 'DELETE_DETAIL_CART_REJECTED':
            return {
                ...state,
                isPending: false,
                isRejected: true,
                errMsg: action.payload.data

            };
        case 'DELETE_DETAIL_CART_FULFILLED':
            const foundIndexDetail = state.cartData.findIndex(x => x.id == action.payload.data.result);
            state.cartData.splice(foundIndexDetail, 1);
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                cartData: state.cartData
            };

        case 'CHECKOUT_CART_PENDING':
            return {
                ...state,
                isPending: true,
                isRejected: false,
                isFulfilled: false
            };
        case 'CHECKOUT_CART_REJECTED':
            return {
                ...state,
                isPending: false,
                isRejected: true,
                errMsg: action.payload.data

            };
        case 'CHECKOUT_CART_FULFILLED':
            //state.cartData.splice(0);
                state.historyData.push(action.payload.data.result)
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                cartData: state.cartData,
                historyData: state.historyData
            };
            case 'GET_ORDERS_PENDING':
                return {
                    ...state,
                    isPending: true,
                    isRejected: false,
                    isFulfilled: false
                };
            case 'GET_ORDERS_REJECTED':
                return {
                    ...state,
                    isPending: false,
                    isRejected: true,
                    errMsg: action.payload.data
    
                };
            case 'GET_ORDERS_FULFILLED':
                return {
                    ...state,
                    isPending: false,
                    isFulfilled: true,
                    historyData: action.payload.data.result
                };
        default:
            return state;
    }
}

export default cartReducer;