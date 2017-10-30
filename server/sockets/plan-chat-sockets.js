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
      chats[plan].typing.push(socketUserMap[socket.id]);
      socket.to(plan).emit('started typing');
    });

    socket.on('stopped typing', plan => {
      if (debug) { console.log('user stopped typing in plan: ', plan); }
      socket.to(plan).emit('stopped typing');
    });

    socket.on('disconnect', () => {
      if (debug) { console.log('user disconnected...'); }
      cleanupSocket(socket);
      let dcUser = socketUserMap[socket.id];
    });
  });

  const cleanupSocket = (socket) => {
    console.log('cleaningup socket: ', socket.id);
    let user = socketUserMap[socket.id];
    console.log('Cleaning up user: ', user);
    delete socketUserMap[socket.id];

    let plan = socketPlanMap[socket.id];
    delete socketPlanMap[socket.id];

    if (chats[plan] && chats[plan].typing && chats[plan].connected) {
      let chatConnection = chats[plan].connected.findIndex(u => u.id === user.id);
      if (chatConnection > -1) { chats[plan].connected.splice(chatConnection, 1); }

      let chatTyping = chats[plan].typing.findIndex(u => u.Id === user.id);
      if (chatTyping > -1) { chats[plan].typing.splice(chatTyping, 1); }

      if (chats[plan].connected.length === 0) {
        console.log('All disconnected from plan: ', plan, ' deleting plan chat storage');
        delete chats[plan];
      }
    }
    console.log('Sockets cleaned. SocketUsers: ', socketUserMap);
    console.log('SocketPlans: ', socketPlanMap);
    console.log('PlanChats: ', chats);
    return user;
  };

};
