// MIN HEAP IMPLEMENTATION
class MinHeap {
  constructor() {
    this.heap = [];
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  insert(val) {
    this.heap.push(val);
    let lastIndex = this.heap.length - 1;
    this.heapifyUp(lastIndex);
  }

  heapifyUp(i) {
    while (i > 0) {
      let parentIndex = this.getParentIndex(i);
      if (this.heap[i] < this.heap[parentIndex]) {
        [this.heap[i], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[i],
        ];
        i = parentIndex;
      } else break;
    }
  }
  extract() {
    if (this.heap.length < 1) return null;
    let min = this.heap[0];
    let lastIndex = this.heap.length - 1;
    [this.heap[0], this.heap[lastIndex]] = [this.heap[lastIndex], this.heap[0]];

    this.heap.pop();

    this.heapifyDown(0);
    return min;
  }
  heapifyDown(i) {
    let n = this.heap.length;

    while (true) {
      let left = this.getLeftChildIndex(i);
      let right = this.getRightChildIndex(i);
      let smallest = i;

      //FOR MIN PRIORITY QUEUE
      //  heap[left][0] heap[smallest][0] or heap[left].priority heap[smallest].priority
      if (left < n && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
      if (right < n && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === i) break;

      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];

      i = smallest;
    }
  }

  // peek operation
  peek() {
    if (!this.heap.length) return null;
    return this.heap[0];
  }
}

let heap = new MinHeap();
//Comparison flipped for MaxHeap
//MinHeap: <
//MaxHeap: >

//! 2 MIN PRIORITY QUEUE IMPLEMENTATION
class MinPriorityQueue {
  constructor() {
    this.heap = new MinHeap();
  }

  // insert element with priority
  enqueue(value, priority) {
    this.heap.insert({ value, priority });
  }

  // remove element with minimum priority
  dequeue() {
    return this.heap.extract();
  }

  // get element with minimum priority (without removing)
  peek() {
    return this.heap.peek();
  }

  isEmpty() {
    return this.heap.heap.length === 0;
  }

  size() {
    return this.heap.heap.length;
  }
}
let pq = new MinPriorityQueue();
