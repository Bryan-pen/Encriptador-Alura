// Mapa de encriptación
const encryptionMap = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};

// Mapa de desencriptación
const decryptionMap = Object.fromEntries(
    Object.entries(encryptionMap).map(([key, value]) => [value, key])
);

function encriptarTexto() {
    const input = document.getElementById("entradaEncriptar").value;
    
    // Validación de entrada
    if (/[^a-z\s]/.test(input)) {
        alert("Por favor, use solo letras minúsculas y sin acentos.");
        return;
    }
    
    let output = "";
    for (const char of input) {
        output += encryptionMap[char] || char;
    }
    document.getElementById("salidaEncriptar").value = output;
}

function desencriptarTexto() {
    const input = document.getElementById("entradaDesencriptar").value;
    let output = "";
    let i = 0;
    
    while (i < input.length) {
        let matched = false;
        // Probar cada entrada en el mapa de desencriptación
        for (const [encrypted, original] of Object.entries(decryptionMap)) {
            if (input.startsWith(encrypted, i)) {
                output += original;
                i += encrypted.length;
                matched = true;
                break;
            }
        }
        if (!matched) {
            output += input[i];
            i++;
        }
    }
    
    document.getElementById("salidaDesencriptar").value = output;
}

async function copiarAlPortapapeles(id) {
    try {
        const textarea = document.getElementById(id);
        await navigator.clipboard.writeText(textarea.value);
        alert("Texto copiado al portapapeles.");
    } catch (err) {
        console.error("Error al copiar al portapapeles: ", err);
    }
}

function pegarDelPortapapeles() {
    navigator.clipboard.readText().then(text => {
        document.getElementById("entradaDesencriptar").value = text;
    }).catch(err => {
        console.error("Error al pegar del portapapeles: ", err);
    });
}
