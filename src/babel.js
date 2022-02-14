async function start() {
  return await Promise.resolve('async is working');
}

const unused = 1;

start().then(console.log);

class Util {
  static id = Date.now()
}

console.log(Util.id);
