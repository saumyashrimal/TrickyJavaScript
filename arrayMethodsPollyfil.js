//map method
const arr = [11, 2, 3, 5, 7, 6, 9];

//map function returns a modified array back
//takes in a callback

let obj1 = {
  a: 1,
};

// const newArr = arr.map(function(val){
//     console.log(this);
//     return val*2 + this.a;
// },obj1)

// console.log("newArr",newArr);

Array.prototype.myMap = function (callback, context) {
  //create a new arr to perform modification and return
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(callback.apply(context, [this[i], i]));
  }
  return newArr;
};

const newArr = arr.myMap(function (val) {
  return val * 2 + this.a;
}, obj1);
console.log("custom map method =>", newArr);

//filter method

//takes a callback function

// const filteredArr = arr.filter((val) => val > 3);
// console.log("filteredArr" , filteredArr);

Array.prototype.myFilter = function (callback, context) {
  //create a new arr to perform modification and return
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback.apply(context, [this[i], i])) {
      newArr.push(this[i]);
    }
  }
  return newArr;
};

const newArr2 = arr.myFilter(function (val) {
  return val > 3;
}, obj1);
console.log("custom filter method =>", newArr2);

//reduce method
// takes a callback function and accumulator initial value
//returns an accumulated value

const sum = arr.reduce((acc, current) => {
  return (acc += current);
});

console.log("sum", sum);

//reduce method pollyfil

Array.prototype.myReduce = function (callback, initialVal) {
  for (let i = 0; i < this.length; i++) {
    if (initialVal) initialVal = callback(initialVal, this[i]);
    else initialVal = this[0];
  }
  return initialVal;
};

const sum1 = arr.myReduce((acc, current) => {
  return (acc += current);
});

console.log("custom reduce method", sum1);

//flat method
const nestedArr = [1, 2, 3, 4, [4, 3, 2, 1], [[2, 3], [5]]];
const flatArr = nestedArr.flat();
console.log("flatArr ==>", flatArr);

//pollyfill for deepflat method
Array.prototype.myDeepFlat = function (val) {
  let arr = this;
  let acc = [];
  const newVal = (function flatDeep(acc, arr,val) {
    const res = arr.reduce((acc, val) => {
      if (Array.isArray(val)) {
        flatDeep(acc, val);
      } else {
        acc.push(val);
      }
      return acc;
    }, acc);
    return res;
  })(acc, arr);
  return newVal;
};

const flatArr2 = nestedArr.myDeepFlat();
console.log("custom flat ==>", flatArr2);

