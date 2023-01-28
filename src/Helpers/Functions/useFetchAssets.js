import { useReducer, useEffect } from "react"
import axios from 'axios'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    INITIAL: 'initial'
}

const BASE_URL = 'https://localhost:7251/api/'

const LANGUAGEOPTIONS = {
    POLISH: 'pl',
    ENGLISH: 'en',
    BOTH: 'pl-en'
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, initial: false, assets: [], pageCount: 0 }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, initial: false, assets: action.payload.assets, pageCount: action.payload.pageCount }
        case ACTIONS.ERROR:
            return { ...state, loading: false, initial: false, error: action.payload.error, assets: [] }
        case ACTIONS.INITIAL:
            return { ...state, loading: false, initial: true, assets: [] }
        default:
            return state
    }
}

export default function useFetchAssets(params, page, assetName, prefferedLanguage, keyValue) {
    const [state, dispatch] = useReducer(reducer, { assets: [], loading: true })
    //console.log(assetName)
    //console.log(prefferedLanguage);

    useEffect(() => {
      if (assetName === "-") {
        dispatch({ type: ACTIONS.INITIAL });
        return;
      }
      const cancelToken = axios.CancelToken.source();
      dispatch({ type: ACTIONS.MAKE_REQUEST });
      axios
        .get(BASE_URL + assetName.assetName, {
          headers: { "Content-Type": "application/json" },
          cancelToken: cancelToken.token,
          withCredentials: true,
          params: {
            page: page,
            prefferedLanguage:
              LANGUAGEOPTIONS[prefferedLanguage.prefferedLanguage],
            keyValueName: keyValue,
            ...params,
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: ACTIONS.GET_DATA,
            payload: {
              assets: res.data.item1,
              pageCount: res.data.pageCount,
            },
          });
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
        });

      return () => {
        cancelToken.cancel();
      };
    }, [params, page, assetName, prefferedLanguage, keyValue]);

    return state
}