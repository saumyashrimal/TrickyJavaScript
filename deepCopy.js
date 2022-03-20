//copy of object 
const obj = {
    a:1,
    b:2,
    c:{d:1,e:2},
    f:function(){
        console.log("hello world!");
    }
}

// const copyObj = JSON.parse(JSON.stringify(obj));

// copyObj.a = 5;
// copyObj.c.d = 24;

// // using json.stringify
// console.log("original obj",obj)
// console.log("copy obj",copyObj);


//using Object.assign

// const copyObj = Object.assign({},obj);
// copyObj.a = 5;
// copyObj.c.d = 24;

// console.log("original obj",obj)
// console.log("copy obj",copyObj);

//using spread operator

// const copyObj = {...obj};
// copyObj.a = 5;
// copyObj.c.d = 24;

// console.log("original obj",obj)
// console.log("copy obj",copyObj);

//deep copying of obj

//function to check if value is an object
const isObject = (item) => {
    return (item && typeof item === "object" && !Array.isArray(item))
}

const deepCopy = (target,obj) => {
    //iterate over the keys of object
    for(let key in obj){
        if(!isObject(obj[key])){ 
            Object.assign(target,{[key]: obj[key]});
        }
        else {
            Object.assign(target,{[key]:{}})
            deepCopy(target[key],obj[key])
        }
    }

    return target;

}

const copyObj = deepCopy({},obj);
copyObj.a = 5;
copyObj.c.d = 24;
copyObj.f = function(){
    console.log("hello from clone world");
}

console.log("original obj",obj)
obj.f();
console.log("copy obj",copyObj);
copyObj.f()











