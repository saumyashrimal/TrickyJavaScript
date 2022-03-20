//copy of object 
let target = {
    a:1,
    b:2,
    c:{d:1,e:2},
}

let source = {
    a:4,
    b:5,
    c:{f:6,g:7},
}


//using Object.assign

// Object.assign(target,source);

// console.log("after merging target = ",target)
// output  = {a:4,b:5,c:{f:6,g:7}}
//expected = {a:4,b:5,c:{d:1,e:2,f:6,g:7}}


//using spread operator
// target = {...target,...source};
// console.log("after merging target = ",target);
// output  = {a:4,b:5,c:{f:6,g:7}}
//expected = {a:4,b:5,c:{d:1,e:2,f:6,g:7}}

//deep merging of 2 objects

//function to check if value is an object
const isObject = (item) => {
    return (item && typeof item === "object" && !Array.isArray(item))
}

const deepMerge = (target,source) => {
    //to iterate over the keys in source
    for(let key in source){
        //check if current key is an object
        if(!isObject(source[key])){
            Object.assign(target,{[key]:source[key]})
        }
        else{
            if(!target[key]) Object.assign(target,{[key]:{}})
            //call deepMerge for current key objects
            deepMerge(target[key],source[key]);
        }
    }
    return target

}

 const mergedObj =  deepMerge(target,source);
 console.log("mergedObj = ", mergedObj) // output = {a:4,b:5,c:{d:1,e:2,f:6,g:7}}










