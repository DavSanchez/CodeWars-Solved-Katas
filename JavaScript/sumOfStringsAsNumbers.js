// https://www.codewars.com/kata/5324945e2ece5e1f32000370/solutions/javascript

function sumStrings(a, b) {

    if (Number.isSafeInteger(Number(a)) && Number.isSafeInteger(Number(b))) {
    
        return String(Number(a) + Number(b))
    
    } else {
        var aArrayRev = a.split("").map(val => Number(val)).reverse()
        var bArrayRev = b.split("").map(val => Number(val)).reverse()
        var carry = 0
        var res = []
  
        if (aArrayRev.length > bArrayRev.length) {
            var largeArray = aArrayRev
            var shortArray = bArrayRev
        } else {
            largeArray = bArrayRev
            shortArray = aArrayRev
        }
      
        largeArray.forEach((val, ind) => {
            if (!shortArray[ind]) {
                res[ind] = (val + carry) % 10
                carry = (val + carry >= 10) ? 1 : 0
            } else {
                res[ind] = (val + shortArray[ind] + carry) % 10
                carry = (val + shortArray[ind] + carry >= 10) ? 1 : 0
            }
        
        })
        if (carry) { res[largeArray.length] = carry }
      
        return res.reverse().join("").replace(/^0+(?!\.|$)/, "")
  
    }
}

// TESTS
sumStrings("8797", "45")
sumStrings("712569312664357328695151392", "8100824045303269669937")
sumStrings("00103", "08567")

// Most clever solution
/*
function sumStrings(a, b) {
    var res = "", c = 0
    a = a.split("")
    b = b.split("")
    while (a.length || b.length || c) {
        c += ~~a.pop() + ~~b.pop()    // DOBLE NOT, type coercion doble para eliminar ceros indeseados y pasar a integer (LOS UNDEFINED PASAN A 0)!!!
        c = c > 9   // SI TRUE ENVALÚA A 1 EN LA PROXIMA ITERACIÓN DEL WHILE (type coercion), SI NO 0
    }
    return res.replace(/^0+/, "")
} */