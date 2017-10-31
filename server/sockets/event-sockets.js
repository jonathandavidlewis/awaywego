const debug = process.env.DEBUG || true;

module.exports = (io) => {

  socketUserMap = {}; // maps sockets to users
  socketPlanMap = {}; // maps sockets to plans/groups
  //                     plans/groups will be 1:1 with rooms
  io.of('/events').on('connection', socket => {
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

    socket.on('enter plan-events', plan => {
      if (debug) { console.log('user entered plan: ', plan); }
      const user = socketUserMap[socket.id];
      socket.join(plan);
      socketPlanMap[socket.id] = plan;
    });

    socket.on('new event in plan', ({plan, event}) => {
      if (debug) { console.log('new event in plan: ', plan, ', event: ', event); }
      socket.to(plan).emit('new event', event);
    });

    socket.on('updated event in plan', ({plan, event}) => {
      if (debug) { console.log('updated event in plan: ', plan, ', event: ', event); }
      socket.to(plan).emit('update event', event);
    });

    socket.on('scheduled event in plan', ({plan, event}) => {
      if (debug) { console.log('scheduled event in plan: ', plan, ', event: ', event); }
      socket.io(plan).emit('scheduled event', event);
    });

    socket.on('unscheduled event in plan', ({plan, event}) => {
      if (debug) { console.log('unscheduled event in plan: ', plan, ', event: ', event); }
      socket.io(plan).emit('unscheduled event', event);
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
  };

};
