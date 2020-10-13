import socket from '../socket'
import axios from 'axios'

/**
 * ACTION TYPES
 */
const UPDATE_CODE = 'UPDATE_CODE'
const EXEC_CODE = 'EXEC_CODE'

/**
 * INITIAL STATE
 */
const initialState = {
  code: '',
  result: ''
}

/**
 * ACTION CREATORS
 */
export const sentCode = payload => {
  return {type: UPDATE_CODE, payload}
}

export const execCode = payload => {
  return {type: EXEC_CODE, payload}
}

export const sendCode = (code, room) => dispatch => {
  try {
    dispatch(sentCode(code))
    socket.emit('new-code-in-room', code, room)
  } catch (err) {
    console.error(err)
  }
}

export const executeCode = code => async dispatch => {
  try {
    const {data} = await axios.post('/api/submit-code', {code})
    //alert(`Result: `,  data)
    dispatch(execCode(data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CODE:
      return {...state, code: action.payload}
    case EXEC_CODE:
      return {...state, result: action.payload}
    default:
      return state
  }
}
