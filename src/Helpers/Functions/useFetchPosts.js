import { useReducer, useEffect } from "react"
import axios from 'axios'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}

const BASE_URL = 'https://localhost:7251/api/Posts'

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, posts: [], pageCount: 0 }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, posts: action.payload.posts, pageCount: action.payload.pageCount }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, posts: [] }
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage}
        default:
            return state
    }
}

export default function useFetchPosts(params, page) {
    const [state, dispatch] = useReducer(reducer, { posts: [], loading: true })

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({type: ACTIONS.MAKE_REQUEST})
        axios.get(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            cancelToken: cancelToken1.token,
            params: {page: page, ...params }
        }).then(res => {
            console.log(res.data)
            dispatch({type: ACTIONS.GET_DATA, payload: {posts: res.data.item1, pageCount: res.data.item2}})
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({type:ACTIONS.ERROR, payload : {error: e}})
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            cancelToken: cancelToken2.token,
            params: {page: page + 1, ...params }
        }).then(res => {
            console.log(res.data)
            dispatch({type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: {hasNextPage: res.data.length !== 0}})
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({type:ACTIONS.ERROR, payload : {error: e}})
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }

    }, [params, page])

    return state
}