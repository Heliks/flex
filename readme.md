Implementation of the [flexbox](https://www.w3.org/TR/css-flexbox-1) algorithm in typescript. Most major features are
implemented. I do not plan to cover stuff like aspect ratios. 

Missing planed features: 

- [ ] min/max size constraints 
- [ ] position: absolute
- [ ] align-self

## How to use

The algorithm works based on a node graph. Call `compute()` on the root node 
that should be computed. The algorithm will recursively compute all children
of that node.

```ts 
import { compute, Node, Rect, Size } from '@heliks/flex';

const node0 = new Node({
  size: new Rect<Size>(
    Size.percent(0.5),
    Size.percent(0.5)
  )
});

const node1 = new Node({ 
  grow: 3,
  size: new Rect<Size>(
    Size.auto(),
    Size.percent(0.5)
  )
});

const node2 = new Node({ 
  grow: 2,
  size: new Rect<Size>(
    Size.auto(),
    Size.percent(0.5)
  )
});

// Add children to root.
node0
  .add(node1)
  .add(node2);

// Compute the root node using an available space of 100x100px.
compute(node0, new Rect(100, 100));

console.log(node0.size) // => 50x50px
console.log(node1.size) // => 30x25px
console.log(node2.size) // => 20x25px
```
