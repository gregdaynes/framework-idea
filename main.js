import framework from './framework.js';

console.log('start', framework)

framework.register('db', function db() {return 'I am the database'});
console.log('db registered', framework)

await framework.registerController('kontroller');
console.log('controller registered', framework)

framework.controller()
