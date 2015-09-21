import { transition } from '../src';

let node = document.createElement('div');
node.style.background = 'red';
node.style.width = '30px';
node.style.height = '30px';

document.body.appendChild(node);

let definition = {
  keyframes: {
    from: {
      opacity: 0,
      transform: 'scale(0)'
    },
    to: {
      opacity: 1,
      transform: 'scale(1)'
    }
  },
  ease: 'ease-in',
  duration: '5s'
};

transition(node, definition, () => console.log('done'));
