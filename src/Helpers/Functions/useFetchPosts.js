import { useReducer, useEffect } from "react"
import axios from 'axios'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
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
        default:
            return state
    }
}

export default function useFetchPosts(params, page, pageOption) {
    const [state, dispatch] = useReducer(reducer, { posts: [], loading: true })

    console.log(params)
    console.log(page)
    console.log(pageOption)

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        dispatch({type: ACTIONS.MAKE_REQUEST})
        axios.get(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            cancelToken: cancelToken.token,
            withCredentials: true,
            params: {page: page, category: params.tag, onlyFollowed: pageOption.followed, onlyFavourite: pageOption.favourite, ...params }
        }).then(res => {
            dispatch({type: ACTIONS.GET_DATA, payload: {posts: res.data.item1, pageCount: res.data.pageCount}})
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({type:ACTIONS.ERROR, payload : {error: e}})
        })

        return () => {
            cancelToken.cancel()
        }

    }, [params, page, pageOption])

    return state
}