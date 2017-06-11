/* global describe, it, before, beforeEach */

import chai from 'chai';
import spies from 'chai-spies';
import DoublyLinkedList from '../../src/data_structures/doubly_linked_list';
import DoublyLinkedListNode from '../../src/data_structures/doubly_linked_list_node';

chai.expect();
chai.use(spies);

const expect = chai.expect;

let linkedList, firstNode, lastNode, spy, errorFn;
let node1, node2, node3, removedNode, result, cb;

describe('DoublyLinkedList', () => {
  describe('When initializing a doubly linked list', () => {
    describe('without any values', () => {
      it('should have a length of 0', () => {
        linkedList = new DoublyLinkedList();
        expect(linkedList.length).to.be.equal(0);
      });
    });

    describe('with an array of values', () => {
      it('should have the correct length', () => {
        linkedList = new DoublyLinkedList([1, 2, 3]);
        expect(linkedList.length).to.be.equal(3);
      });
    });

    describe('with an array of linked list nodes', () => {
      it('should have the correct length', () => {
        node1 = new DoublyLinkedListNode(1);
        node2 = new DoublyLinkedListNode(2);
        node3 = new DoublyLinkedListNode(3);
        linkedList = new DoublyLinkedList([node1, node2, node3]);
        expect(linkedList.length).to.be.equal(3);
      });
    });

    describe('with a non-array input', () => {
      it('should throw a TypeError for numbers', () => {
        errorFn = () => {linkedList = new DoublyLinkedList(5);};
        expect(errorFn).to.throw(TypeError);
      });

      it('should throw a TypeError for objects', () => {
        errorFn = () => {linkedList = new DoublyLinkedList({a: 5});};
        expect(errorFn).to.throw(TypeError);
      });
    });
  });

  describe('.first', () => {
    it('returns null when the list is empty', () => {
      linkedList = new DoublyLinkedList();
      firstNode = linkedList.first;

      expect(firstNode).to.be.equal(null);
    });

    it('returns the first node when the list has elements', () => {
      linkedList = new DoublyLinkedList([1, 2, 3]);
      firstNode = linkedList.first;

      expect(firstNode.value).to.be.eq(1);
    });
  });

  describe('.last', () => {
    it('returns null when the list is empty', () => {
      linkedList = new DoublyLinkedList();
      lastNode = linkedList.last;

      expect(lastNode).to.be.equal(null);
    });

    it('returns the last node when the list has elements', () => {
      linkedList = new DoublyLinkedList([1, 2, 3]);
      lastNode = linkedList.last;

      expect(lastNode.value).to.be.eq(3);
    });
  });

  describe('#add', () => {
    before(() => {
      linkedList = new DoublyLinkedList();
      spy = chai.spy.on(linkedList, 'append');
      node1 = linkedList.add(1);
    });

    it('should call #append with the given value', () => {
      expect(spy).to.have.been.called.once.with(1);
    });

    it('should return the new node', () => {
      expect(node1 instanceof DoublyLinkedListNode).to.be.true;
      expect(node1.value).to.be.equal(1);
    });
  });

  describe('#append', () => {
    before(() => {
      linkedList = new DoublyLinkedList();
      node1 = linkedList.append(1);
      node2 = linkedList.append(new DoublyLinkedListNode(2));
    });

    it('should properly append a new value or linked list node', () => {
      expect(linkedList.first.value).to.be.eq(1);
    });

    it('should properly append a second value or linked list node', () => {
      expect(linkedList.last.value).to.be.eq(2);
    });

    it('should properly increase the length attribute', () => {
      expect(linkedList.length).to.be.eq(2);
    });

    it('should return the new node', () => {
      expect(node1 instanceof DoublyLinkedListNode).to.be.true;
      expect(node1.value).to.be.equal(1);
      expect(node2 instanceof DoublyLinkedListNode).to.be.true;
      expect(node2.value).to.be.equal(2);
    });
  });

  describe('#delete', () => {
    before(() => {
      node2 = new DoublyLinkedListNode(2);
      linkedList = new DoublyLinkedList([1, node2, 3]);
      spy = chai.spy.on(linkedList, 'remove');
      removedNode = linkedList.delete(node2);
    });

    it('should call #remove with the given node', () => {
      expect(spy).to.have.been.called.once.with(node2);
    });

    it('should return the deleted node', () => {
      expect(removedNode instanceof DoublyLinkedListNode).to.be.true;
      expect(removedNode.value).to.be.equal(2);
    });
  });

  describe('#forEach', () => {
    describe('When the length is 0', () => {
      beforeEach(() => {
        linkedList = new DoublyLinkedList();
        result = [];
        cb = (node) => result.push(node.value);
      });

      it('does nothing when the reversed boolean is left as false ', () => {
        linkedList.forEach(cb);
        expect(result).to.be.empty;
      });

      it('does nothing when the reversed boolean is set to true', () => {
        linkedList.forEach(cb, true);
        expect(result).to.be.empty;
      });
    });

    describe('When the length is greater than 0', () => {
      beforeEach(() => {
        linkedList = new DoublyLinkedList([1, 2, 3]);
        result = [];
        cb = (node) => result.push(node.value);
      });

      it('executes the callback when the reversed boolean is left as false', () => {
        linkedList.forEach(cb);

        expect(result).to.include.ordered.members([1, 2, 3]);
        expect(result.length).to.be.equal(3);
      });

      it('executes the callback when the reversed boolean is set to true', () => {
        linkedList.forEach(cb, true);

        expect(result).to.include.ordered.members([3, 2, 1]);
        expect(result.length).to.be.equal(3);
      });

      it('executes the callback when the callback also takes an idx', () => {
        cb = (node, idx) => result.push(node.value * idx);
        linkedList.forEach(cb);

        expect(result).to.include.ordered.members([0, 2, 6]);
        expect(result.length).to.be.equal(3);
      });

      it('executes the callback when the callback also takes an idx and the reversed boolean is true', () => {
        cb = (node, idx) => result.push(node.value * idx);
        linkedList.forEach(cb, true);

        expect(result).to.include.ordered.members([0, 2, 2]);
        expect(result.length).to.be.equal(3);
      });
    });
  });

  describe('#map', () => {
    describe('When the length is 0', () => {
      beforeEach(() => {
        linkedList = new DoublyLinkedList();
        cb = (node) => node.value;
      });

      it('does nothing when the reversed boolean is left as false ', () => {
        result = linkedList.map(cb);
        expect(result).to.be.empty;
      });

      it('does nothing when the reversed boolean is set to true', () => {
        result = linkedList.map(cb, true);
        expect(result).to.be.empty;
      });
    });

    describe('When the length is greater than 0', () => {
      beforeEach(() => {
        linkedList = new DoublyLinkedList([1, 2, 3]);
        cb = (node) => node.value + 1;
      });

      it('executes the callback when the reversed boolean is left as false', () => {
        result = linkedList.map(cb);

        expect(result).to.include.ordered.members([2, 3, 4]);
        expect(result.length).to.be.equal(3);
      });

      it('executes the callback when the reversed boolean is set to true', () => {
        result = linkedList.map(cb, true);

        expect(result).to.include.ordered.members([4, 3, 2]);
        expect(result.length).to.be.equal(3);
      });

      it('executes the callback when the callback also takes an idx', () => {
        cb = (node, idx) => (node.value * idx);
        result = linkedList.map(cb);

        expect(result).to.include.ordered.members([0, 2, 6]);
        expect(result.length).to.be.equal(3);
      });

      it('executes the callback when the callback also takes an idx and the reversed boolean is true', () => {
        cb = (node, idx) => (node.value * idx);
        result = linkedList.map(cb, true);

        expect(result).to.include.ordered.members([0, 2, 2]);
        expect(result.length).to.be.equal(3);
      });
    });
  });

  describe('#pop', () => {
    it('should return null when the list length is 0', () => {
      linkedList = new DoublyLinkedList();
      expect(linkedList.pop()).to.be.null;
    });

    describe('When the list lenth is greater than 0', () => {
      before(() => {
        linkedList = new DoublyLinkedList([1, 2, 3]);
        node3 = linkedList.pop();
        node2 = linkedList.pop();
      });

      it('returns the correct node', () => {
        expect(node3.value).to.be.equal(3);
        expect(node2.value).to.be.equal(2);
      });

      it('sets the returned node\'s next and prev attributes to null', () => {
        expect(node3.prev).to.be.equal(null);
        expect(node3.next).to.be.equal(null);
        expect(node2.prev).to.be.equal(null);
        expect(node2.next).to.be.equal(null);
      });

      it('should properly decrease the length attribute', () => {
        expect(linkedList.length).to.be.eq(1);
      });
    });
  });

  describe('#prepend', () => {
    before(() => {
      linkedList = new DoublyLinkedList();
      node1 = linkedList.prepend(1);
      node2 = linkedList.prepend(new DoublyLinkedListNode(2));
    });

    it('should properly prepend a new value or linked list node', () => {
      expect(linkedList.first.value).to.be.eq(2);
    });

    it('should properly prepend a second value or linked list node', () => {
      expect(linkedList.last.value).to.be.eq(1);
    });

    it('should properly increase the length attribute', () => {
      expect(linkedList.length).to.be.eq(2);
    });

    it('should return the new node', () => {
      expect(node1 instanceof DoublyLinkedListNode).to.be.true;
      expect(node1.value).to.be.equal(1);
      expect(node2 instanceof DoublyLinkedListNode).to.be.true;
      expect(node2.value).to.be.equal(2);
    });
  });

  describe('#push', () => {
    before(() => {
      linkedList = new DoublyLinkedList();
      spy = chai.spy.on(linkedList, 'append');
      node1 = linkedList.push(1);
    });

    it('should call #append with the given value', () => {
      expect(spy).to.have.been.called.once.with(1);
    });

    it('should return the new node', () => {
      expect(node1 instanceof DoublyLinkedListNode).to.be.true;
      expect(node1.value).to.be.equal(1);
    });
  });

  describe('#shift', () => {
    it('should return null when the list length is 0', () => {
      linkedList = new DoublyLinkedList();
      expect(linkedList.shift()).to.be.equal(null);
    });

    describe('When the list lenth is greater than 0', () => {
      before(() => {
        linkedList = new DoublyLinkedList([1, 2, 3]);
        node1 = linkedList.shift();
        node2 = linkedList.shift();
      });

      it('returns the correct node', () => {
        expect(node1.value).to.be.equal(1);
        expect(node2.value).to.be.equal(2);
      });

      it('sets the returned node\'s next and prev attributes to null', () => {
        expect(node1.prev).to.be.equal(null);
        expect(node1.next).to.be.equal(null);
        expect(node2.prev).to.be.equal(null);
        expect(node2.next).to.be.equal(null);
      });

      it('should properly decrease the length attribute', () => {
        expect(linkedList.length).to.be.eq(1);
      });
    });
  });

  describe('#unshift', () => {
    before(() => {
      linkedList = new DoublyLinkedList();
      spy = chai.spy.on(linkedList, 'prepend');
      node1 = linkedList.unshift(1);
    });

    it('should call #prepend with the given value', () => {
      expect(spy).to.have.been.called.once.with(1);
    });

    it('should return the new node', () => {
      expect(node1 instanceof DoublyLinkedListNode).to.be.true;
      expect(node1.value).to.be.equal(1);
    });
  });
});
