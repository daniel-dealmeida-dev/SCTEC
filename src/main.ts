import { stdin , stdout } from "process";
import { createInterface } from "node:readline/promises";
import { buscarPerfil } from "./services/githubService.js";
import { salvarArquivo } from "./services/arquivoService.js"; 

async function main(): Promise<void>{
    const interfaceConsole = createInterface({input: stdin, output: stdout});

    try {
        console.log("\n________________________\n ");
        console.log(  "BUSCA DE USUÁRIOS GITHUB   ");
        console.log("\n________________________\n ");

        // 1. Lê a string que o usuário digitou no terminal
        const respostaOperacao = await interfaceConsole.question("Digite o nome do usuário no GITHUB:\n");
        const loginDigitado = respostaOperacao.trim();

        if (loginDigitado === "") {
            console.log("Você precisa informar um nome de usuário válido.");
            return;
        }
        
        const usuario = await buscarPerfil(loginDigitado);   
        
        // 2. Pergunta se deseja salvar o usuário retornado pela API
        const respostaGravar = await interfaceConsole.question(`\nUsuário "${usuario.userlogin}" encontrado no Github. Deseja gravá-lo no arquivo? (Digite: S ou N):\n`);

        if (respostaGravar.trim().toUpperCase() !== "S" && respostaGravar.trim().toUpperCase() !== "N") {
            console.log("Você informou uma opção inválida. Operação será finalizada.");
            return;
        }       
        
        // 3. Salva os dados no arquivo JSON caso o usuário queira
        if (respostaGravar.trim().toUpperCase() === "S") {
            await salvarArquivo(usuario);
        } else {
            console.log("Operação cancelada. O perfil não foi salvo.");
        }
    
    } catch (error : any) {
        // Se o validador da sua classe rejeitar o JSON da API, o erro vai cair aqui bonitinho:
        console.log("\nFalha ao realizar o processo: " + error.message);
    } finally {
        interfaceConsole.close();
    }
}



main();