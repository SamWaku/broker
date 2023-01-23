const arr = [];
arr.push(1)
arr.push(2)
arr.push(3)
arr.push(4)
arr.push(5)
i=0
// for(let i=0; i<arr.length; i++){
//     // console.log(i)
//     console.log(arr.shift())  
// }
while(arr.length != 0){
    console.log(arr.shift())
    i--;  
}
console.log('array size is: ',arr.length)