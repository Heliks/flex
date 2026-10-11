import { Size } from '../size';


describe('Size', () => {
  it('should resolve a percentage against a definite zero', () => {
    expect(Size.percent(1).resolve(0, 80)).toBe(0);
  });
});
