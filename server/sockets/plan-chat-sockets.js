const debug = process.env.DEBUG || true;

module.exports = (io) => {

  socketUserMap = {};
  socketPlanMap = {};
  chats = {};

  io.of('/chat').on('connection', socket => {
    if (debug) { console.log('socket connected: ', socket.id); }

    socket.on('id user', user => {
      socketUserMap[socket.id] = user;
      if (debug) { console.log('Connected users: ', socketUserMap); }
    });

    socket.on('enter plan-chat', plan => { // entering a specific plan based on planid
      if (debug) { console.log('user entered plan: ', plan); }
      socket.join(plan);
      socketPlanMap[socket.id] = plan;

      if (chats[plan]) {
        chats[plan].connected.push(socketUserMap[socket.id]);
      } else {
        chats[plan] = {connected: [socketUserMap[socket.id]], typing: []};
      }
      if (debug) { console.log('SocketPlans: ', socketPlanMap); }
      if (debug) { console.log('PlanChats: ', chats); }
    });

    socket.on('leave plan-chat', plan => {
      if (debug) { console.log('user left plan: ', plan); }
      cleanupSocket(socket);
      socket.leave(plan);
    });

    socket.on('new message', plan => {
      if (debug) { console.log('user submitted new message in plan: ', plan); }
      io.of('/chat').in(plan).emit('new message');
    });

    socket.on('started typing', plan => {
      if (debug) { console.log('user started typing in plan: ', plan); }
      chats[plan] && chats[plan].typing.push(socketUserMap[socket.id]);
      socket.to(plan).emit('users typing', chats[plan].typing);
    });

    socket.on('stopped typing', plan => {
      if (debug) { console.log('user stopped typing in plan: ', plan); }
      const chatTyping = chats[plan] && chats[plan].typing.findIndex(u => u && u.id === socketUserMap[socket.id].id);
      if (chatTyping > -1) { chats[plan].typing.splice(chatTyping, 1); }
      socket.to(plan).emit('users typing', chats[plan].typing);
    });

    socket.on('disconnect', () => {
      if (debug) { console.log('user disconnected...'); }
      cleanupSocket(socket);
    });
  });

  const cleanupSocket = (socket) => {
    const user = socketUserMap[socket.id];
    delete socketUserMap[socket.id];

    const plan = socketPlanMap[socket.id];
    delete socketPlanMap[socket.id];

    if (chats[plan] && chats[plan].typing && chats[plan].connected) {
      const chatConnection = chats[plan].connected.findIndex(u => u && u.id === user.id);
      if (chatConnection > -1) { chats[plan].connected.splice(chatConnection, 1); }

      const chatTyping = chats[plan].typing.findIndex(u => u && u.id === user.id);
      if (chatTyping > -1) { chats[plan].typing.splice(chatTyping, 1); }

      if (chats[plan].connected.length === 0) {
        delete chats[plan];
      }
    }
    return user;
  };

};
