export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer
}