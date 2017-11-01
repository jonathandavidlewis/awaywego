export default () => {
  return function(users) {
    let names = users.map(u => u.name);
    if (names.length === 0) {
      return '';
    } else if (names.length === 1) {
      return names[0] + ' is typing';
    } else if (names.length < 4) {
      return [names.slice(0, -1).join(', '), names.slice(-1)[0]].join(names.length < 2 ? '' : ' and ') + ' are typing';
    } else {
      return names.slice(0, 3).join(', ') + ' and ' + (names.length - 3) + ' others are typing';
    }
  };
};
