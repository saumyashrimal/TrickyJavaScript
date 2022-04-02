//call polyfill

const obj1 = {
    a:1,
    b:2
}

const obj2= {
    a:4,
    b:6
}

// const testFunc = function(){
//     console.log(this.a+this.b);
// }

let obj3 = Object.create(obj2,{a:{value:3}});
console.log(Object.getOwnPropertyDescriptor(obj3,"a"));

