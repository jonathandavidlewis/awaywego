const debug = process.env.DEBUG || true;

module.exports = (io) => {
  io.on('connection', socket => {
    if (debug) { console.log('user connected: ', socket.id); }

    socket.on('enter plan-chat', plan => { // entering a specific plan based on planid
      if (debug) { console.log('user entered plan: ', plan); }
      socket.join(plan);
    });

    socket.on('leave plan-chat', plan => {
      if (debug) { console.log('user left plan: ', plan); }
      socket.leave(plan);
    });

    socket.on('new message', plan => {
      if (debug) { console.log('user submitted new message in plan: ', plan); }
      io.in(plan).emit('refresh');
    });

    socket.on('started typing', plan => {
      if (debug) { console.log('user started typing in plan: ', plan); }
      socket.to(plan).emit('started typing');
    });

    socket.on('stopped typing', plan => {
      if (debug) { console.log('user stopped typing in plan: ', plan); }
      socket.to(plan).emit('stopped typing');
    });

    socket.on('disconnect', () => {
      if (debug) { console.log('user disconnected...'); }
    });
  });
};
