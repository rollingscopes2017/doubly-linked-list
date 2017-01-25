const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let newNode = new Node(data, this._tail);
        if (this._tail) {
            this._tail.next = newNode;
        }
        this._tail = newNode;
        if (!this._head) {
            this._head = newNode;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        let iterator = this._head;
        while(iterator && index > 0) {
            index--;
            iterator = iterator.next;
        }
        return iterator ? iterator.data : null;
    }

    insertAt(index, data) {
        if (index === this.length) {
            return this.append(data);
        }
        let newNode = new Node(data);
        let iterator = this._head;
        while(iterator && index > 0) {
            index--;
            iterator = iterator.next;
        }
        if (!iterator) {
            return this;
        }
        newNode.prev = iterator.prev;
        newNode.next = iterator;
        if (iterator.prev) {
            iterator.prev.next = newNode;
        } else {
            this._head = newNode;
        }
        iterator.prev = newNode;
        this.length++;
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (index >= this.length) {
            return this;
        }
        let iterator = this._head;
        while(iterator && index > 0) {
            index--;
            iterator = iterator.next;
        }
        if(iterator.prev) {
            iterator.prev.next = iterator.next;
        } else {
            this._head = iterator.next;
        }
        if (iterator.next) {
            iterator.next.prev = iterator.prev;
        } else {
            this._tail = iterator.prev;
        }
        return this;
    }

    reverse() {
        let iterator = this._head;
        let tmp = null;
        while(iterator) {
            tmp = iterator.prev;
            iterator.prev = iterator.next;
            iterator.next = tmp;
            iterator = iterator.prev;
        }
        tmp = this._head;
        this._head = this._tail;
        this._tail = tmp;
        return this;
    }

    indexOf(data) {
        let iterator = this._head;
        let index = 0;
        while(iterator && iterator.data !== data) {
            iterator = iterator.next;
            index++;
        }
        return iterator ? index : -1;
    }
}

module.exports = LinkedList;
