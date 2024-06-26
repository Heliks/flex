import { Constants } from './constants';
import { Rect } from './rect';
import { computeStyleSheet, Style } from './style';


let id = 0;

/**
 *
 */
export class Node<S extends Style = Style> {

  public id = 0;

  /** Other {@link Node nodes} that are direct children of this one. */
  public readonly children: Node[] = [];

  /** Constants used for internal layout computation. Do not edit manually. */
  public readonly constants = new Constants();

  /** Contains the parent node, if any. */
  public parent?: Node;

  /** Definite computed size. */
  public readonly size = new Rect(0, 0);

  /** Definite computed position. */
  public readonly pos = {
    x: 0,
    y: 0
  };

  /** Contains the nodes {@link Style stylesheet}. */
  public style: S;

  /**
   * @param style Styles that should be applied to the node. Missing style properties
   *  will be filled with computed default values.
   */
  constructor(style: Partial<S> = {}) {
    this.id = ++id;
    this.style = computeStyleSheet<S>(style);
  }

  public has(node: Node): boolean {
    return this.children.includes(node);
  }

  /** Returns the index of the given `child`. */
  public index(child: Node): number {
    return this.children.indexOf(child);
  }

  /** Inserts the given `node` as a child. */
  public append(node: Node): this {
    if (! this.has(node)) {
      this.children.push(node);
      node.parent = this;
    }

    return this;
  }

  /** Inserts a `node` at the given `index`. */
  public appendAt(node: Node, index: number): this {
    if (this.has(node)) {
      this.remove(node);
    }

    this.children.splice(index, 0, node);
    node.parent = this;

    return this;
  }

  /** Inserts a `node` after a `child` node. */
  public appendAfter(child: Node, node: Node): this {
    const index = this.index(child);

    if (~index) {
      this.appendAt(node, index + 1);
    }

    return this;
  }

  /** Inserts a `node` before a `child` node. */
  public appendBefore(child: Node, node: Node): this {
    const index = this.index(child);

    if (~index) {
      this.appendAt(node, index);
    }

    return this;
  }

  public remove(node: Node): this {
    const index = this.children.indexOf(node);

    if (~index) {
      this.children.splice(index, 1);
      node.parent = undefined;
    }

    return this;
  }

}
