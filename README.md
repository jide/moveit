## Move it

### Description
Javascript/CSS animation and transition utility. Useful for React performant animations.

### Features
- Supports CSS animations and transitions with the same API
- Animation definitions are in plain javascript. This means you can create functions that create animations.
- Cleans up everything on completion
- Automatically prefixed
- Supports only setting `from` or `to`

### Installation
```
npm i --save moveit
```

### Demo
`npm start dev` then visit http://127.0.0.1:3000

### Usage
```js
import { transition, animation } from 'moveit';

transition(node, definition, override?, callback?);
```
`definition` is an object with `keyframes` and standard CSS properties for
animation / transition. `keyframes` takes percentages (or `from` and `to`) as
keys and CSS maps as values.

Possible properties :
- `delay`
- `duration`
- `ease`

Animation only :
- `iterationCount`
- `direction`
- `fillMode`

### Example
```js
import { transition } from 'moveit';

const definition = {
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

### You can use transition or animation
API is the same, but with animation you can add intermediate keyframes.
```js
import { animation } from 'moveit';

const definition = {
  keyframes: {
    from: {
      opacity: '0'
    },
    '50%': {
      opacity: '.3'
    }
    to: {
      opacity: '1'
    }
  },
  ease: 'ease-in',
  duration: '1s'
};

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
