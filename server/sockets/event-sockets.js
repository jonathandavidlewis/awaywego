const debug = process.env.DEBUG || true;

module.exports = (io) => {

  socketUserMap = {}; // maps sockets to users
  socketGroupMap = {}; // maps sockets to groups/groups
  //                     groups/groups will be 1:1 with rooms
  io.of('/events').on('connection', socket => {
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

    socket.on('enter group-events', group => {
      if (debug) { console.log('user entered group: ', group); }
      const user = socketUserMap[socket.id];
      socket.join(group);
      socketGroupMap[socket.id] = group;
    });

    socket.on('new event in group', ({group, event}) => {
      if (debug) { console.log('new event in group: ', group, ', event: ', event); }
      socket.to(group).emit('new event', event);
    });

    socket.on('updated event in group', ({group, event}) => {
      if (debug) { console.log('updated event in group: ', group, ', event: ', event); }
      socket.to(group).emit('update event', event);
    });

    socket.on('scheduled event in group', ({group, event}) => {
      if (debug) { console.log('scheduled event in group: ', group, ', event: ', event); }
      socket.to(group).emit('scheduled event', event);
    });

    socket.on('unscheduled event in group', ({group, event}) => {
      if (debug) { console.log('unscheduled event in group: ', group, ', event: ', event); }
      socket.to(group).emit('unscheduled event', event);
    });

    socket.on('removed event in group', ({group, event}) => {
      if (debug) { console.log('removed event in group: ', group, ', event: ', event); }
      socket.to(group).emit('removed event', event);
    });

    socket.on('new comment in group', ({group, comment}) => {
      if (debug) { console.log('new comment: ', comment); }
      socket.to(group).emit('new comment', comment);
    });

    socket.on('updated comment in group', ({group, comment}) => {
      if (debug) { console.log('updated comment: ', comment); }
      socket.to(group).emit('updated comment', comment);
    });

    socket.on('removed comment in group', ({group, eventId, commentId}) => {
      if (debug) { console.log('removed comment: ', commentId); }
      socket.to(group).emit('removed comment', {eventId, commentId});
    });

    socket.on('disconnect', () => {
      if (debug) { console.log('user disconnected...'); }
      cleanupSocket(socket);
    });
  });

  const cleanupSocket = (socket) => {
    const user = socketUserMap[socket.id];
    delete socketUserMap[socket.id];

    const group = socketGroupMap[socket.id];
    delete socketGroupMap[socket.id];
  };

};
