import {createContext, useReducer} from "react"
import AuthReducer from "./AuthReducer"

const INITAL_STATE = {
    user: null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITAL_STATE);

    return (
        <AuthContext.Provider value={
            {
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}