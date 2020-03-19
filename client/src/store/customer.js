// Redux for customer feature of the state tree
// Tracks current customer results to easily
// populate across the app

const initialState = {
    id: null
};


// Action type constants
const CUSTOMER_UPDATE = "customer/update";


// Action creators

export const customerUpdate = (customer) => {
    console.log(customer)
    return {
        type: CUSTOMER_UPDATE,
        payload: {
            customer: customer
        }
    };
};


// Reducer
export default function customer(state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_UPDATE:
            console.log(action.payload.customer)
            return ({
                ...state,
                ...action.payload.customer
            })
        default:
            return state;
    }
};