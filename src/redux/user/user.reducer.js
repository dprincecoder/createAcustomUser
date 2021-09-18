import userTypes from './user.types'

const INITIALSTATE = {
    currentUser: null,
}

const userReducer = (state = INITIALSTATE, action) => {
    switch (action.type) {
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
    
        default:
            return state;
    }
}

export default userReducer;