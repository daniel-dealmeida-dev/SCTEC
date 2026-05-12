import { stdin, stdout } from 'process';
import { createInterface } from 'node:readline/promises';

import { somar } from './services/adicao.js';
import { subtrair } from './services/subtracao.js';
import { dividir } from './services/divicao.js';
import { multiplicar } from './services/multiplicacao.js';

async function main() {
    const consoleInterface = createInterface({
        input: stdin,
        output: stdout
    });

    const operacao = (
        await consoleInterface.question("Digite a operação:\n")
    );

    const operacoesValidas = ['+', '-', '*', '/'];

    if (!operacoesValidas.includes(operacao)) {
        console.log("Operação inválida. Utilize apenas +, -, * ou /");
        consoleInterface.close();
    }

    const a = Number(
        await consoleInterface.question("Digite o primeiro número:\n")
    );

    const b = Number(
        await consoleInterface.question("Digite o segundo número:\n")
    );
    
    let resposta;

    switch (operacao) {
        case '-':
            resposta = subtrair(a, b);
            break;

        case '+':
            resposta = somar(a, b);
            break;

        case '*':
            resposta = multiplicar(a, b);
            break;

        case '/':
            resposta = dividir(a, b);
            break;
    }

    console.log(`Esta é a resposta: ${resposta}`);

    consoleInterface.close();
}

main().catch(console.error);