import { useReducer, useEffect } from "react"
import axios from 'axios'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}

const BASE_URL = 'https://nicediceapi.azurewebsites.net/api/Users'
//const BASE_URL = 'https://localhost:7251/api/Users'

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, users: [] }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, users: action.payload.users}
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, users: [] }
        default:
            return state
    }
}

export default function useFetchUsers(params, attitude) {
    const [state, dispatch] = useReducer(reducer, { users: [], loading: true })

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        dispatch({type: ACTIONS.MAKE_REQUEST})
        axios.get(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            cancelToken: cancelToken.token,
            withCredentials: true,
            params: {
                Attitude: attitude === "" ? null : attitude,
                ...params
            }
        }).then(res => {
            dispatch({
                type: ACTIONS.GET_DATA,
                payload: {
                    users: res.data
                }})
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({type:ACTIONS.ERROR, payload : {error: e}})
        })

        return () => {
            cancelToken.cancel()
        }

    }, [params, attitude])

    return state
}