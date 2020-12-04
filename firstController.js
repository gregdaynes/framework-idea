import registry from './framework.js';

export default function firstController() {
  console.log('->>>> controller called')

  console.log('I have access to db', registry.db())
}
