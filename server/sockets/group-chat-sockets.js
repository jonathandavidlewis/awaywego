const debug = process.env.DEBUG || true;

module.exports = (io) => {

  socketUserMap = {};
  socketGroupMap = {};
  chats = {};

  io.of('/chat').on('connection', socket => {
    if (debug) { console.log('socket connected: ', socket.id); }

    // initial connection setup call and response
    if (!socketUserMap[socket]) {
      socket.emit('id yourself');
    }

    if (!socketGroupMap[socket]) {
      socket.emit('pick room');
    }

    socket.on('id user', user => {
      socketUserMap[socket.id] = user;
      if (debug) { console.log('Connected users: ', socketUserMap); }
    });

    socket.on('enter group-chat', group => { // entering a specific group based on groupid
      if (debug) { console.log('user entered group: ', group); }
      const user = socketUserMap[socket.id];
      socket.join(group);
      socketGroupMap[socket.id] = group;
      addUserToGroup(socket, group, user);
      if (debug) { console.log('SocketGroups: ', socketGroupMap); }
      if (debug) { console.log('GroupChats: ', chats); }
    });

    socket.on('new message', group => {
      if (debug) { console.log('user submitted new message in group: ', group); }
      io.of('/chat').in(group).emit('new message');
    });

    socket.on('started typing', group => {
      if (debug) { console.log('user: ', socketUserMap[socket.id], ' started typing in group: ', group); }
      const user = socketUserMap[socket.id];
      if (chats[group]) {
        const chatTyping = findUserIndex(chats[group].typing, user);
        if (chatTyping === -1) {
          chats[group].typing.push(socketUserMap[socket.id]);
          socket.to(group).emit('users typing', chats[group].typing);
        }
      }
    });

    socket.on('stopped typing', group => {
      if (debug) { console.log('user stopped typing in group: ', group); }
      const user = socketUserMap[socket.id];
      if (chats[group] && chats[group].typing) {
        const chatTyping = findUserIndex(chats[group].typing, user);
        if (chatTyping > -1) { chats[group].typing.splice(chatTyping, 1); }
        socket.to(group).emit('users typing', chats[group].typing);
      }
    });

    socket.on('disconnect', () => {
      if (debug) { console.log('user disconnected...'); }
      cleanupSocket(socket);
    });
  });

  const findUserIndex = (arr, user) => {
    return arr.findIndex(u => u && u.id === user.id);
  };

  const addUserToGroup = (socket, group, user) => {
    if (chats[group]) {
      const chatConnection = findUserIndex(chats[group].connected, user);
      if (chatConnection === -1) { // only add if not already there
        chats[group].connected.push(socketUserMap[socket.id]);
      }
    } else {
      chats[group] = {connected: [socketUserMap[socket.id]], typing: []};
    }
  };

  const cleanupSocket = (socket) => {
    const user = socketUserMap[socket.id];
    delete socketUserMap[socket.id];

    const group = socketGroupMap[socket.id];
    delete socketGroupMap[socket.id];

    if (chats[group]) {
      const chatConnection = findUserIndex(chats[group].connected, user);
      if (chatConnection > -1) { chats[group].connected.splice(chatConnection, 1); }

      const chatTyping = findUserIndex(chats[group].typing, user);
      if (chatTyping > -1) { chats[group].typing.splice(chatTyping, 1); }

      if (chats[group].connected.length === 0) { delete chats[group]; }
    }
    return user;
  };

};
