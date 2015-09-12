import { transition } from '../src';

let node = document.createElement('div');
node.style.background = 'red';
node.style.width = '30px';
node.style.height = '30px';

document.body.appendChild(node);

let definition = {
  keyframes: {
    from: {
      opacity: '0'
    },
    to: {
      opacity: '1'
    }
  },
  ease: 'ease-in',
  duration: '1s'
};

transition(node, definition, () => console.log('done'));
