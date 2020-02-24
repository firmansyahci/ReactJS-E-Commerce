const initialValue = {
    productData: [],
    errMsg: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
};

const productReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_PENDING':
            return {
                ...state,
                isPending: true,
                isRejected: false,
                isFulfilled: false
            };
        case 'GET_PRODUCT_REJECTED':
            return {
                ...state,
                isPending: false,
                isRejected: true,
                errMsg: action.payload.data

            };
        case 'GET_PRODUCT_FULFILLED':
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                productData: action.payload.data.result
            };
        case 'POST_PRODUCT_PENDING':
            return {
                ...state,
                isPending: true,
                isRejected: false,
                isFulfilled: false
            };
        case 'POST_PRODUCT_REJECTED':
            return {
                ...state,
                isPending: false,
                isRejected: true,
                errMsg: action.payload.data

            };
        case 'POST_PRODUCT_FULFILLED':
            state.productData.push(action.payload.data.result)
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                productData: state.productData
            };
        case 'PATCH_PRODUCT_PENDING':
            return {
                ...state,
                isPending: true,
                isRejected: false,
                isFulfilled: false
            };
        case 'PATCH_PRODUCT_REJECTED':
            return {
                ...state,
                isPending: false,
                isRejected: true,
                errMsg: action.payload.data

            };
        case 'PATCH_PRODUCT_FULFILLED':
            const foundIndexPatch = state.productData.findIndex(x => x.id == action.payload.data.result.id);
            state.productData[foundIndexPatch] = action.payload.data.result;
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                productData: state.productData
            };
        case 'DELETE_PRODUCT_PENDING':
            return {
                ...state,
                isPending: true,
                isRejected: false,
                isFulfilled: false
            };
        case 'DELETE_PRODUCT_REJECTED':
            return {
                ...state,
                isPending: false,
                isRejected: true,
                errMsg: action.payload.data

            };
        case 'DELETE_PRODUCT_FULFILLED':
            const foundIndex = state.productData.findIndex(x => x.id == action.payload.data.result);
            state.productData.splice(foundIndex,1);
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                productData: state.productData
            };
        default:
            return state;
    }
}

export default productReducer;