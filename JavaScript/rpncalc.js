/**
 * https://www.codewars.com/kata/reverse-polish-notation-calculator/train/javascript
 * 
 * PASSED!!!!
 */

function calc(expr) {
    // TODO: Your awesome code here
    var operators = /([/+\-*])/i
    var expressionVector = expr.split(" ") 
    
    if (expressionVector === [])
        return 0
    else if (expressionVector.length === 1)
        return Number(expressionVector[0])
    else if (!expressionVector.some(val => operators.test(val))) {
        return Number(expressionVector[expressionVector.length - 1])
    } else {
        console.log("Argumentos Iniciales: " + expressionVector)
        return operation(expressionVector)
    }
}

function operation(exprVector) {
    var operators = /([/+\-*])/i
    var op = exprVector.find(val => operators.test(val))
    console.log("Operación: " + op)
    var opIndex = exprVector.indexOf(op)
    var args = exprVector.splice(opIndex-2,3).slice(0,opIndex)
    console.log("Argumentos de la operación: " + args)
    console.log("Resto de argumentos: " + exprVector)

    switch (op) {
    case "+":
        console.log("Suma")
        exprVector.splice(opIndex-2,0,(Number(args[0]) + Number(args[1])))
        console.log("Nueva expresión: " + exprVector)
        return calc(exprVector.join(" "))
    case "-":
        console.log("Resta")
        exprVector.splice(opIndex-2,0,(Number(args[0]) - Number(args[1])))
        console.log("Nueva expresión: " + exprVector)
        return calc(exprVector.join(" "))
    case "*":
        console.log("Producto")
        exprVector.splice(opIndex-2,0,(Number(args[0]) * Number(args[1])))
        console.log("Nueva expresión: " + exprVector)
        return calc(exprVector.join(" "))
    case "/":
        console.log("Cociente")
        exprVector.splice(opIndex-2,0,(Number(args[0]) / Number(args[1])))
        console.log("Nueva expresión: " + exprVector)
        return calc(exprVector.join(" "))
    default:
        console.log("Default")
        return Number(args[0])
    }
}

var tests = ["", "1 2 3", "1 2 3.5", "1 3 +", "1 3 *", "1 3 -", "4 2 /", "5 1 2 + 4 * + 3 -"]
tests.forEach(val => console.log(calc(val)))