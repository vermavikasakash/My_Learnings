// 1. Two Pointers ⭐⭐⭐⭐⭐
// eg Two Sum II, Container With Most Water
let left = 0;
let right = nums.length-1;

while(left<right){

    if(condition){

        left++;

    }else{

        right--;

    }
}

// 2. Sliding Window ⭐⭐⭐⭐⭐
// Examples : Longest Substring ,Minimum Windo ,Fruit Into Basket
let left = 0;

for (let r = 0; r < n; r++) {
    // add nums[r]

    while (window is invalid) {
        // remove nums[l]
        l++;
    }

    // update answer
}

// 3. Prefix Sum ⭐⭐⭐⭐⭐
let prefix = new Array(n+1).fill(0);

for(let i=0;i<n;i++){
    prefix[i+1]=prefix[i]+nums[i];
}

// sum(l,r)

let sum = prefix[r+1]-prefix[l];

// Prefix Sum + HashMap
let map = new Map(); map.set(0, 1);

let prefix = 0;
let ans = 0;

for (let num of nums) {

    prefix += num;

    // Change this condition depending on the problem
    if (map.has(prefix - target)) ans += map.get(prefix - target);

    map.set(prefix, (map.get(prefix) || 0) + 1);
}

return ans;

// 4. Binary Search Template ⭐⭐⭐⭐⭐
function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {

        const mid = left + right >> 1;

        if (nums[mid] === target)
            return mid;

        if (nums[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }

    return -1;
}

// 5. Binary Search on Answer ⭐⭐⭐⭐⭐
// Examples: Koko Eating Bananas, Maximum Safeness Factor, Capacity To Ship Packages
let left = minPossible;
let right = maxPossible;
let ans = -1;

while (left <= right) {

    const mid = left + Math.floor((right - left) / 2);

    if (isPossible(mid)) {
        ans = mid;
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

return ans;

// 6. Monotonic Stack ⭐⭐⭐⭐
// eg Daily Temperatures, Next Greater Element
let stack=[];

for(let i=0;i<n;i++){

    while( stack.length && nums[stack[stack.length-1]] < nums[i] ){
        stack.pop();
    }

    stack.push(i);

}
// 7. Merge Intervals ⭐⭐⭐⭐⭐
intervals.sort((a,b)=>a[0]-b[0]);

let ans=[];

for(const interval of intervals){

    if( ans.length===0 || ans[ans.length-1][1] < interval[0]){
         ans.push(interval);
    }else{
        ans[ans.length-1][1] = Math.max( ans[ans.length-1][1], interval[1] );
    }
}

// 8. Backtracking ⭐⭐⭐⭐⭐

 let ans = [], n = nums.length

    function bt(path, start) {
        ans.push([...path]);
        for (let i = start; i < n; i++) {
            path.push(nums[i]);
            bt(path, i + 1);
            path.pop();
        }
    }
    bt([], 0);
    return ans;

/* imp concept    
Subset - solve([],0) i= start,  solve(i+1);
Combination - solve([],0) i= start,  solve(i+1);
Combination → solve([],0) i= start,  solve(i); // reuse allowed
Premutation - Visited array concept : i=0,  solve([]);

Are duplicates present?
                      YES → sort + skip        */

// 9. DP on subsequence / choice⭐⭐⭐⭐⭐

function solve(i) {
    if (i >= n) return 0;

    if (memo[i] !== undefined) return memo[i];

    let take = nums[i] + solve(i + 2);
    let skip = solve(i + 1);

    return memo[i] = Math.max(take, skip);
}

// -- TREE BFS / DFS ---

// 1.Tree DFS ⭐⭐⭐⭐⭐
function dfs(root){

    if(root==null) return;

    dfs(root.left);

    dfs(root.right);

}

// Tree BFS ⭐⭐⭐⭐⭐

var bfs = function(root) {
    if (!root) return [];

    let queue = [root];
    let result = [];

    while (queue.length) {
        let node = queue.shift();
        result.push(node.val);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return result;
};

// -- GRAPHS ---
// 1. BFS Template ⭐⭐⭐⭐⭐
// Used in Number of Islands, Rotten Oranges, Word Search (modified)

const dir = [[1,0],[-1,0],[0,1],[0,-1]];

let queue = [[i,j]];
let front = 0;

visited[i][j] = true;

while(front < queue.length){
    const [x,y] = queue[front++];

    for(const [dx,dy] of dir){

        const nx = x + dx;
        const ny = y + dy;

        if( nx>=0 && nx<m && ny>=0 && ny<n && !visited[nx][ny] ){
            visited[nx][ny]=true;
            queue.push([nx,ny]);
        }
    }
}

// 2. DFS Template ⭐⭐⭐⭐⭐
function dfs(i,j){

    if( i<0 || i>=m || j<0 || j>=n ) return;

    if(visited[i][j]) return;

    visited[i][j]=true;

    for(const [dx,dy] of dir){

        dfs(i+dx,j+dy);

    }
}

// 3. Topological Sort ⭐⭐⭐⭐
let indegree = new Array(n).fill(0);

let graph = Array.from({length:n},()=>[]);

for(const [u,v] of edges){
    graph[u].push(v);
    indegree[v]++;
}

let queue=[];

for(let i=0;i<n;i++){
    if(indegree[i]===0) queue.push(i);
}

let front=0;

while(front<queue.length){
    let node=queue[front++];

    for(const next of graph[node]){
        indegree[next]--;
        if(indegree[next]===0) queue.push(next);

    }
}

// 4. Dijakstra (4), mst(prim,krushal) ⭐⭐⭐⭐
// Union find ⭐⭐⭐⭐
class Union {
    constructor(n) {
        this.rank = new Array(n).fill(0);
        this.parent = new Array(n);

        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    unionSet(x, y) {
        let px = this.find(x);
        let py = this.find(y);

        if (px === py) return;

        if (this.rank[px] < this.rank[py]) {
            this.parent[px] = py;
        } else if (this.rank[px] > this.rank[py]) {
            this.parent[py] = px;
        } else {
            this.parent[py] = px;
            this.rank[px]++;
        }
    }
}

// BIT MANIPULATION

// check power of 2
n & (n - 1)

// count set bits
while(n){
    n &= (n-1);
}

// TRIE 
class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {}

    search(word) {}

    startsWith(prefix) {}
}


// segment tree LC 3161 (for reference)
class SegmentTree {
    constructor(nums) {
        this.tree = new Array(4 * nums.length);
        this.build(nums, 0, 0, nums.length - 1);
    }

    build(nums, node, left, right) {}

    query(node, left, right, ql, qr) {}

    update(node, left, right, index, value) {}
}
