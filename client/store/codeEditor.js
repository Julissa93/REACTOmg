import socket from '../socket'

/**
 * ACTION TYPES
 */
const UPDATE_CODE = 'UPDATE_CODE'

/**
 * INITIAL STATE
 */
const defaultCode = ''

/**
 * ACTION CREATORS
 */
export const sentCode = code => {
  return {type: UPDATE_CODE, code}
}

export const sendCode = (code, room) => dispatch => {
  try {
    dispatch(sentCode(code))
    socket.emit('new-code-in-room', code, room)
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCode, action) {
  switch (action.type) {
    case UPDATE_CODE:
      return action.code
    default:
      return state
  }
}
