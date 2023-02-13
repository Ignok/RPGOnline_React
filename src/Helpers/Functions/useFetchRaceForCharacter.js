import { useReducer, useEffect } from "react"
import axios from 'axios'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    INITIAL: 'initial'
}

//const BASE_URL = 'https://nicediceapi.azurewebsites.net/api/Race/character/'
const BASE_URL = 'https://localhost:7251/api/Race/character/'


function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, initial: false, races: [] }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, initial: false, races: action.payload.races}
        case ACTIONS.ERROR:
            return { ...state, loading: false, initial: false, error: action.payload.error, races: [] }
        case ACTIONS.INITIAL:
            return { ...state, loading: false, initial: true, races: [] }
        default:
            return state
    }
}

export default function useFetchRaces(keyValue, uId) {
    const [state, dispatch] = useReducer(reducer, { races: [], loading: true })

    useEffect( () => {
      if (keyValue === "-") {
        dispatch({ type: ACTIONS.INITIAL });
        return;
      }
      const cancelToken = axios.CancelToken.source();
      dispatch({ type: ACTIONS.MAKE_REQUEST });
      axios
        .get(BASE_URL + uId, {
          headers: { "Content-Type": "application/json" },
          cancelToken: cancelToken.token,
          withCredentials: true,
          params: {
            keyValueName: keyValue
          },
        })
        .then((res) => {
          dispatch({
            type: ACTIONS.GET_DATA,
            payload: {
              races: res.data
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
    }, [keyValue, uId]);

    return state
}