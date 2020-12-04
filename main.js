import framework from './framework.js';

console.log('start', framework.registry())

framework.register('db', () => 'I am the database');
console.log('db registered', framework.registry())

await framework.registerController('kontroller');
console.log('controller registered', framework.registry())

framework.registry().controller()
