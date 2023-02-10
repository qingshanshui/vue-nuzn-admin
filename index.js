var arr = [1, 3, 5, 6]
var nums = 5

function f(arr, nums) {
    var obj = {}

    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = {v: arr[i], i}
    }

    for (let objKey in obj) {
        if (objKey == nums) {
            return obj[objKey]
        }
    }


}


var pattern = "abba"
var str = "dog cat cat dog"
// var str = "dog cat cat fish"
function f1(pattern, str) {
    var obj1 = {}
    var obj2 = {}
    for (let i = 0; i < pattern.length; i++) {
        obj1[pattern[i]] = {v: pattern[i], i}
    }
    var arr = str.split(" ")
    for (let i = 0; i < arr.length; i++) {
        obj2[arr[i]] = {v: arr[i], i}
    }
    let a1 = []
    for (let obj1Key in obj1) {
            a1.push(obj1Key)
    }
    let a2 = []
    for (let obj1Key in obj2) {
        a2.push(obj1Key)
    }
    return a1.length == a2.length
}


