const debug = process.env.DEBUG || true;

module.exports = (io) => {

  socketUserMap = {};
  socketPlanMap = {};
  chats = {};

  io.of('/chat').on('connection', socket => {
    if (debug) { console.log('socket connected: ', socket.id); }

    // initial connection setup call and response
    if (!socketUserMap[socket]) {
      socket.emit('id yourself');
    }

    if (!socketPlanMap[socket]) {
      socket.emit('pick room');
    }

    socket.on('id user', user => {
      socketUserMap[socket.id] = user;
      if (debug) { console.log('Connected users: ', socketUserMap); }
    });

    socket.on('enter plan-chat', plan => { // entering a specific plan based on planid
      if (debug) { console.log('user entered plan: ', plan); }
      const user = socketUserMap[socket.id];
      socket.join(plan);
      socketPlanMap[socket.id] = plan;
      addUserToPlan(socket, plan, user);
      if (debug) { console.log('SocketPlans: ', socketPlanMap); }
      if (debug) { console.log('PlanChats: ', chats); }
    });

    socket.on('new message', plan => {
      if (debug) { console.log('user submitted new message in plan: ', plan); }
      io.of('/chat').in(plan).emit('new message');
    });

    socket.on('started typing', plan => {
      if (debug) { console.log('user: ', socketUserMap[socket.id], ' started typing in plan: ', plan); }
      const user = socketUserMap[socket.id];
      if (chats[plan]) {
        const chatTyping = findUserIndex(chats[plan].typing, user);
        if (chatTyping === -1) {
          chats[plan].typing.push(socketUserMap[socket.id]);
          socket.to(plan).emit('users typing', chats[plan].typing);
        }
      }
    });

    socket.on('stopped typing', plan => {
      if (debug) { console.log('user stopped typing in plan: ', plan); }
      const user = socketUserMap[socket.id];
      if (chats[plan] && chats[plan].typing) {
        const chatTyping = findUserIndex(chats[plan].typing, user);
        if (chatTyping > -1) { chats[plan].typing.splice(chatTyping, 1); }
        socket.to(plan).emit('users typing', chats[plan].typing);
      }
    });

    socket.on('disconnect', () => {
      if (debug) { console.log('user disconnected...'); }
      const user = socketUserMap[socket.id];
      cleanupSocket(socket, user);
    });
  });

  const findUserIndex = (arr, user) => {
    return arr.findIndex(u => u && u.id === user.id);
  };

  const addUserToPlan = (socket, plan, user) => {
    if (chats[plan]) {
      const chatConnection = findUserIndex(chats[plan].connected, user);
      if (chatConnection === -1) { // only add if not already there
        chats[plan].connected.push(socketUserMap[socket.id]);
      }
    } else {
      chats[plan] = {connected: [socketUserMap[socket.id]], typing: []};
    }
  };

  const cleanupSocket = (socket) => {
    const user = socketUserMap[socket.id];
    delete socketUserMap[socket.id];

    const plan = socketPlanMap[socket.id];
    delete socketPlanMap[socket.id];

    if (chats[plan]) {
      const chatConnection = findUserIndex(chats[plan].connected, user);
      if (chatConnection > -1) { chats[plan].connected.splice(chatConnection, 1); }

      const chatTyping = findUserIndex(chats[plan].typing, user);
      if (chatTyping > -1) { chats[plan].typing.splice(chatTyping, 1); }

      if (chats[plan].connected.length === 0) { delete chats[plan]; }
    }
    return user;
  };

};
