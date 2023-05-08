console.log("My reduce________");
Array.prototype.myReduce = function(callback, initialValue){
    let acc =  initialValue;
    for(let i = 0;i < this.length;i++){
        acc = callback(acc,this[i]);
    }
    return acc;
}

var arr = [10, 20, 30, 50, 55];

console.log(
    arr.myReduce((accumulator, current)=>
        accumulator * current
    ,1)
)
console.log(
    arr.reduce((accumulator,current)=>
        accumulator * current
    ,1))


console.log("My pop________");
var popArray = [10, 20, 30, 50, 55];
Array.prototype.myPop = function() {
    var popitem;
    popitem = this[this.length - 1];
    this.length = this.length - 1;
    return popitem;
}

console.log(popArray.myPop());
console.log(popArray.pop());
console.log(popArray);

console.log("My slice________");

Array.prototype.mySlice = function(start, end) {
    let res = [];
    for (let i = start; i < end; i++) {
        res.push(this[i]);
    }
    return res;
}

console.log(arr.slice(1,4));
console.log(arr.mySlice(1, 4));

console.log("My concat________");
var concatArr = [10, 20, 30, 50, 55];
Array.prototype.myConcat = function(value) {
    this.push(value);
    return this;
}

console.log(concatArr.concat(70));
console.log(concatArr.myConcat(70));

console.log("My every________");
const isBelowThreshold = (currentValue) => currentValue < 70;
Array.prototype.myEvery = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i])) {
            return false;
        }
    }
    return true;
}

console.log(arr.every(isBelowThreshold));
console.log(arr.myEvery(isBelowThreshold));

console.log("My filter________");
const isOverThreshold = (currentValue) => currentValue > 40;
Array.prototype.myFilter = function (callback) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            res.push(this[i]);
        }
    }
    return res;
}
console.log(arr.filter(isOverThreshold));
console.log(arr.myFilter(isOverThreshold));