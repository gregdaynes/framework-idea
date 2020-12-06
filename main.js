import framework from './framework.js';

console.log('start', framework)

framework.register('db', function db() {return 'I am the database'});
console.log('db registered', framework)
framework.register('router', {});

await framework.register('controller', 'defaultController');
console.log('controller registered', framework)

await framework.register('controller', 'firstController');
console.log('controller registered', framework)

await framework.register('controller', 'kontroller', {name: 'aliasedController'});
console.log(framework);

export default framework;
