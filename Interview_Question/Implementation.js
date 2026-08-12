// concurrency handler ----
async function concorrencyLimitter(tasks, limit) {
  let results = [];
  let running = [];

  for (let i = 0; i < tasks.length; i++) {
    let p = tasks[i]().then(res => {
      results[i] = res;
      running = running.filter(x => x !== p);
    });

    running.push(p);

    if (running.length >= limit) {
      await Promise.race(running);
    }
  }

  await Promise.all(running);

  return results;
}

const task = (val, time) => () =>
  new Promise(res => setTimeout(() => res(val), time));

concorrencyLimitter(
  [
    task(1, 1000),
    task(2, 500),
    task(3, 300),
    task(4, 400),
  ],
  2
).then(console.log);

// 

// ------- deep clone ----
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  const cloned = {};
  for (let key in obj) {
    cloned[key] = deepClone(obj[key]);
  }

  return cloned;
}
let obj = {data : [1,2,3,4,5]};
deepClone(obj);

// custom map- -----------

function customMap(arr, cb) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let curr = cb(arr[i]);
    result.push(curr);
  }

  return result;
}

customMap([1,2,3], x => x * 2);

// custom filter -------------

function customFilter(arr, cb) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let curr = cb(arr[i]);

    if (curr) {
      result.push(arr[i]);
    }
  }

  return result;
}

customFilter([1,2,3,4], x => x % 2 === 0);

// custom reduce -------------

function customReduce(arr, cb, initial) {
  let acc = initial;

  for (let i = 0; i < arr.length; i++) {
    let curr = cb(acc, val);
    acc = curr;
  }

  return acc;
}

customReduce([1,2,3,4], (sum, val) => sum + val, 0);

// custom Promises ------------------------
// promise.all (takes multiple promises and returns one single promise i.e success or failed)

let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);

Promise.all([p1, p2])
  .then(res => console.log(res)) // [1,2]
  .catch(err => console.log(err));

let p3 = Promise.reject("failed");

Promise.all([p1, p2, p3])
  .then(res => console.log(res))
  .catch(err => console.log(err)); // "failed"

// promis race : First promise to finish wins (resolve OR reject)

let p1 = new Promise((res, rej) => {
  setTimeout(() => res("p1 done"), 1000);
});

let p2 = new Promise((res, rej) => {
  setTimeout(() => res("p2 done"), 500);
});

let p3 = Promise.reject("failed fast");

let result = Promise.race([p1, p2, p3])
  .then(res => console.log(res))
  .catch(err => console.log(err));

console.log(result); // Promise

// Promise.allSettled : Waits for ALL promises (never fails)

let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.reject("failed");

let result = Promise.allSettled([p1, p2, p3])
  .then(res => console.log(res))
  .catch(err => console.log(err)); // won't run

console.log(result); // Promise

//? ------------------ NODE /EXPRESS ------------------------
// Q1 Write an Express middleware that logs:
const express = require("express");

let app = new express();
function qs(req,res,next){
    let date  = new Date();
    console.log(new Date().toLocaleString());
    next();
}
app.use(qs);
app.get("/users");

// Q2 Create an Express middleware that allows access only if header exists.:
let app = new express();
function auth(req,res,next){

    const authHeader = req.headers.authorization;

    let token = authHeader.split(" ")[1];
    let decode = jwt.verify(token,JWT_secret);
    let id = decode._id;
    if(!id) return res.status(401).json({message:"Unauthorized"});
    next();
}

app.use(auth);
app.get("/users");


// Q3 Read a file using streams.
const fs = require("fs");
const stream = fs.createReadStream("./file.txt");
stream.on("data",(chunk)=>{
    console.log(chunk.toString());
});

// Q4 Find users whose age is between:25 and 30
db.user.find({age:{
    $gte:25,
    $lte:30
}})

// Q5 Update:city to Delhi for every user older than 30.
db.user.updateMany(
    {age:{$gt:30}},
    {$set:{city:"Delhi"}}
)

// Q6 Find the oldest user.
db.user.find({}).sort({age:-1}).limit(1);

// Q7 Count how many users belong to each city.
db.user.aggregate([
    {
        $group:{
            _id:"$city",
            count:{$sum:1 }
        }
    }
])
// ASSUME Employee
// | id | name | salary | dept |
// | -- | ---- | ------ | ---- |

// Q8 Find employees whose salary is greater than the department average.
SELECT *
FROM Employee e1
WHERE salary >
(
    SELECT AVG(salary)
    FROM Employee e2
    WHERE e1.dept = e2.dept
);
// Q15 Find duplicate emails.
SELECT email
FROM Employee
GROUP BY email
HAVING COUNT(*) > 1;

// Q16 Delete duplicate EMAIL rows but keep one.
DELETE e1
FROM Employee e1
JOIN Employee e2
ON e1.email = e2.email AND e1.id > e2.id;
