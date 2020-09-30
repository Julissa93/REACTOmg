module.exports = io => {
  io.on('connection', socket => {
    socket.on('room', room => {
      socket.join(room)
      socket.to(room).emit('connect-to-room', room)
    })

    socket.on('send-state-to-guest', (data, room) => {
      io.sockets.to(room).emit('guest-state-update', data)
    })

    socket.on('new-code-in-room', (updatedCode, room) => {
      io.sockets.in(room).emit('receive-code', updatedCode)
    })

    socket.on('new-WBData-in-room', (updatedWBData, room) => {
      io.sockets.in(room).emit('receive-WBData', updatedWBData)
    })

    socket.on('leave-room', room => {
      io.sockets.in(room).emit('leaveRoom', `LEAVE ROOM: ${room}`)
      socket.leave(room)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
