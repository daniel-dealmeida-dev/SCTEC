import { stdin, stdout } from 'process'
import { createInterface } from 'node:readline/promises'

const consoleInterface = createInterface({
    input: stdin,
    output: stdout
});

function encontrarLetraMaisRepetida(texto) {  
    if (!texto || texto.length === 0) return '';

    const contagem = [];
    for (let i = 0; i < 26; i++) {
        contagem[i] = 0;
    }
    //palavra aleatoria e dizer a primeira letra unica
    let caractereMaisRepetido = '';
    let maxContagem = 0;

    for (let i = 0; i < texto.length; i++) {
        const codigoLetra = texto[i].toLowerCase().charCodeAt(0);

        if (codigoLetra >= 97 && codigoLetra <= 122) {
            const indice = codigoLetra - 97;
            contagem[indice]++;

            if (contagem[indice] > maxContagem) {
                maxContagem = contagem[indice];
                caractereMaisRepetido = texto[i].toLowerCase();
            }
        }
    }
 
    return caractereMaisRepetido;
}

const textoUsuario = await consoleInterface.question('Digite uma palavra ou frase qualquer:\n ')

const resultado = encontrarLetraMaisRepetida(textoUsuario)

if (resultado) {
    console.log(`\nA letra que mais se repete é: '${resultado}'`)
} else {
    console.log('\nNenhuma letra válida foi encontrada.')
}

consoleInterface.close()