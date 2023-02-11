import { useReducer, useEffect } from "react"
import axios from 'axios'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    INITIAL: 'initial'
}

const BASE_URL = 'https://nicediceapi.azurewebsites.net/api/Profession/character/'



function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, initial: false, professions: [] }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, initial: false, professions: action.payload.professions}
        case ACTIONS.ERROR:
            return { ...state, loading: false, initial: false, error: action.payload.error, professions: [] }
        case ACTIONS.INITIAL:
            return { ...state, loading: false, initial: true, professions: [] }
        default:
            return state
    }
}

export default function useFetchProfessions(keyValue, uId) {
    const [state, dispatch] = useReducer(reducer, { professions: [], loading: true })

    useEffect(() => {
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
              professions: res.data
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
    }, [keyValue]);

    return state
}