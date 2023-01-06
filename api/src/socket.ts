import { Server } from 'socket.io';

export default (httpServer: any) => {
  const io = new Server(httpServer,
    {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
      },
    },
  );

  io.on('connection', socket => {
    socket.on('ROOM:CONNECT', (data) => {
      socket.join(data.roomId);
    });
    socket.on('ROOM:DISCONNECT', (data) => {
      socket.leave(data.roomId);
    });
    socket.on('ROOM:MESSAGE_SEND', (data) => {
      socket.to(data.roomId).emit('ROOM:MESSAGE_BACK', data);
    });
    socket.on('ROOM:MESSAGE_INPUT', (data) => {
      socket.to(data.roomId).emit('ROOM:MESSAGE_INPUT_BACK', data);
    })
  });
}