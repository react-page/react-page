const createDevServer = require('../../scripts/createDevServer')

const SOCKET_IO_PORT = 9999

const io = require('socket.io')(SOCKET_IO_PORT)

io.on('connection', (socket) => {
  socket.on('change', (data) => {
    socket.broadcast.emit('update', data)
  })
})

const proxy = (protocol, host) => ({
  '/socket.io': {
    target: `${protocol}://${host}:${SOCKET_IO_PORT}`
  }
})

createDevServer('live-edit', proxy)
