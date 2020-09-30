import io from 'socket.io-client'
import store from './store/index'
import {sentCode} from './store/codeEditor'
import {sentWhiteboardData} from './store/whiteBoard'

const socket = io(window.location.origin)
socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('receive-code', code => {
  store.dispatch(sentCode(code))
})

socket.on('receive-WBData', payload => {
  store.dispatch(sentWhiteboardData(payload))
})

socket.on('connect-to-room', room => {
  socket.emit('send-state-to-guest', store.getState(), room)
})

socket.on('leaveRoom', payload => {
  console.log('payload', payload)
})

socket.on('guest-state-update', payload => {
  store.dispatch(sentWhiteboardData(payload.whiteBoard))
  store.dispatch(sentCode(payload.codeEditor))
})

export default socket
