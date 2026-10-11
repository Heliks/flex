import { compute } from '../algo';
import { Node } from '../node';
import { Rect } from '../rect';
import { Size } from '../size';
import { FlexDirection } from '../style';


describe('percentage sizing', () => {
  it('should measure content when a percentage width has an indefinite parent', () => {
    const node0 = new Node();
    const node1 = new Node({
      size: new Rect<Size>(
        Size.percent(1),
        Size.auto()
      )
    });

    const node3 = new Node({
      size: new Rect<Size>(
        Size.px(40),
        Size.px(30)
      )
    });

    node0.append(node1.append(node3));

    compute(node0, new Rect(100, 100));

    expect(node0.size.width).toBe(40);
  });

  it('should measure content when a percentage height has an indefinite parent', () => {
    const node0 = new Node({ direction: FlexDirection.Column });
    const node1 = new Node({
      size: new Rect<Size>(
        Size.auto(),
        Size.percent(1)
      )
    });

    const node3 = new Node({
      size: new Rect<Size>(
        Size.px(40),
        Size.px(30))
    });

    node0.append(node1.append(node3));

    compute(node0, new Rect(100, 100));

    expect(node0.size.height).toBe(30);
  });
});
