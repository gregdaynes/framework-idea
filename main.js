const framework = require('./framework')();


console.log('a', framework.registry())
framework.register('db', () => 'I am the database');
framework.registerController('kontroller');

console.log('x', framework.registry())


