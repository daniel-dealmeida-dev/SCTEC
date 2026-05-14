import { stdin, stdout } from 'process';
import { createInterface } from 'node:readline/promises';
import { writeFile, readFile } from 'node:fs/promises'

async function buscaPerfil(perfil) {
    const urlBase = 'https://api.github.com/users/';

    try {
        const response = await fetch(`${urlBase}${perfil}`);

        if (!response.ok) {
            throw new Error(`Não foi possível encontrar o perfil ${perfil}`);
        }

        const body = await response.json();

        return body;
    }
    catch (error) {
        throw new Error(`Não foi possível ler a resposta da API para o perfil ${perfil}`);
    }
}

async function lerArquivo() {
    try {
        const usuarioText = await readFile('./database.json', {
            encoding: 'utf-8'
        });

        const usuarios = JSON.parse(usuarioText);

        return usuarios;
    }
    catch (error) {
        return [];
    }
}

async function salvarArquivo(data) {
    const usuarios = await lerArquivo();

    usuarios.push(data);

    await writeFile(
        './database.json',
        JSON.stringify(usuarios, null, 2),
        {
            encoding: 'utf-8'
        }
    );
}

async function main() {
    const consoleInterface = createInterface({
        input: stdin,
        output: stdout
    });

    const respostaOperacao = await consoleInterface.question(
        "Digite o usuario do github para buscar o perfil:\n"
    );

    const usuario = await buscaPerfil(respostaOperacao);

    await salvarArquivo(usuario);

    consoleInterface.close();
}
// o programa deve pedir um usuario
//caso o usuario nao exista, ou falhe a requisição de busca,  programa deve apresentar um erro adequado
// se o usuario for encontrado, deve ser mostrado usuario no terminal
//perguntar ao usuario se deseja salvar o perfil encontrado em um arquivo json, caso sim, salvar o perfil encontrado em um arquivo json, caso nao, encerrar o programa
// nao poder salvar usuarios repetidos
// e nao devera sobrescrever o usuario se ele ja existir
main().catch(console.error);