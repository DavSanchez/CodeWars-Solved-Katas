//Extend the String object with toBase64() and fromBase64() functions
String.prototype.toBase64 = function() {
    // Alfabeto Base 64
    var base64chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    // Almacenamos el String en una variable
    var str = this
    console.log(str)
    var c = this.length % 3 // el string es multiplo de 3?
    var p = ""
    var r = ""

    if (c > 0) {
    // Si el string NO es múltiplo de 3...
        for (; c < 3; c++) {
            // Añadimos ceros para que sea múltiplo de 3
            p += "="
            str = str + "\0"
        }
    }
    console.log(str)
    // Ahora recorremos el String en grupos de tres en tres
    for (c = 0; c < str.length; c += 3) {
    // Agrupamos los 3 caracteres ASCII en grupos de 24 bits (cada uno 8 bits)
        var wordGroup =
      (str.charCodeAt(c) << 16) +
      (str.charCodeAt(c + 1) << 8) +
      str.charCodeAt(c + 2)
        console.log(wordGroup)
        // Y los separamos en 4 grupos de 6 bits (00111111 es una mascara!!)
        var mask = parseInt("00111111", 2)
        wordGroup = [
            (wordGroup >>> 18) & mask,
            (wordGroup >>> 12) & mask,
            (wordGroup >>> 6) & mask,
            wordGroup & mask
        ]
        console.log(wordGroup)
        // Estos 4 elementos del array se usan de índices para sus caracteres del alfabeto
        r +=
      base64chars[wordGroup[0]] +
      base64chars[wordGroup[1]] +
      base64chars[wordGroup[2]] +
      base64chars[wordGroup[3]]
        console.log(r)
    }

    // Devolvemos el string final convertido, después de quitarle los ceros y añadir el padding que creamos al principio.
    return r.substring(0, r.length - p.length) + p
}

String.prototype.fromBase64 = function() {
    // Alfabeto de base 64
    var base64chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    // Objeto con clave (caracter) y valor (índice correspondiente)
    var base64inv = {}
    for (var i = 0; i < base64chars.length; i++) {
        base64inv[base64chars[i]] = i
    }

    // Almacenamos el String en una variable
    var str = this
    console.log(str)
    // Sustituimos padding que pueda existir... (estos son dos IFs anidados!!)
    // Se sustituyen por A porque es valor 0
    var p =
    str.charAt(str.length - 1) == "="
        ? str.charAt(str.length - 2) == "=" ? "AA" : "A"
        : ""
    var r = ""
    // Y lo intercambiamos por el string original
    str = str.substr(0, str.length - p.length) + p
    console.log(str)

    for (var c = 0; c < str.length; c += 4) {
    // Cada grupo de 4 caracteres será un string binario de 24 bits que
    // se pasa a 3 caracteres ASCII.

    // String binario (24 bits):
        var wordGroup =
      (base64inv[str.charAt(c)] << 18) +
      (base64inv[str.charAt(c + 1)] << 12) +
      (base64inv[str.charAt(c + 2)] << 6) +
      base64inv[str.charAt(c + 3)]
        console.log(wordGroup)

        // Conversión de las 3 palabras de 8 bits en caracteres ASCII.
        // Mascara para eliminar el resto de valores binarios.
        var mask = parseInt("11111111", 2)
        r += String.fromCharCode(
            (wordGroup >>> 16) & mask,
            (wordGroup >>> 8) & mask,
            wordGroup & mask
        )
        console.log(r)
    }
    // Retornamos el valor SIN EL PADDING AÑADIDO!!
    return r.substring(0, r.length - p.length)
}
