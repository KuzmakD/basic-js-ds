//const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    function addIn(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (data < node.data) node.left = addIn(node.left, data);
      else node.right = addIn(node.right, data);
      return node;
    }

    this._root = addIn(this._root, data);
  }

  has(data) {
    function searchIn(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return node.data <= data ? searchIn(node.right, data) : searchIn(node.left, data);
    }

    return searchIn(this._root, data);
  }

  find(data) {
    function findIn(node, data) {
      if (!node) return null;
      if (node.data === data) return node;
      return node.data <= data ? findIn(node.right, data) : findIn(node.left, data);
    }
    return findIn(this._root, data);
  }

  remove(data) {
    function removeNode(node, data) {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      }
      if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    }
    this._root = removeNode(this._root, data);
  }

  min() {
    if (!this._root) return;
    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this._root) return;
    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
