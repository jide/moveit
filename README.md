## Move it

### Description
Javascript/CSS animation and transition utility. Useful for React performant animations.

### Demo
`npm start dev` then visit http://127.0.0.1:3000

### Usage
```js
import { transition, animation } from '../src';

transition(node, definition, override?, callback?);
```

### Example
```js
import { transition } from '../src';

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

transition(node, definition);
```

### You can use transition or animation, same API
```js
import { animation } from '../src';

//...

animation(node, definition);
```

### Callback on end
```js
transition(node, definition, () => console.log(done));
```

### Override definition
```js
const override = {
  ease: 'ease-out'
};

transition(node, definition, override);
```

### With React
```js
const openMenu = props => {
  return {
    keyframes: {
      to: {
        transform: `translate3d(${props.left}px, 0, 0)`
      }
    },
    ease: 'ease-out-cubic',
    duration: '1s'
  };
};

class Menu extends Component {
  handleClick() {
    transition(React.findDOMNode(this.refs.animated), openMenu({ left: this.props.menuWidth - window.innerWidth }));
  }

  render() {
      return (
          <div ref='animated'>
            <button onClick={ ::this.handleClick }></button>
          </div>
      );
  }
}
```
