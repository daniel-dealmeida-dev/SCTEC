import { UsuarioGithub } from "../models/usuarioGithub.js";

// Criamos uma interface interna para mapear exatamente o formato que o fetch nos devolve
interface GithubApiResponse {
    id: number;
    login: string;
    name: string | null;
    [key: string]: unknown; // Permite que o objeto tenha outras propriedades da API que não vamos usar
}

export class UsuarioGithubValidator {
    static validate(value: unknown): UsuarioGithub {
        // 1. Garante que o valor recebido da API é um objeto e não é nulo
        if (!this.isObject(value)) {
            throw new Error("Erro de validação: O dado recebido da API não é um objeto válido.");
        }

        // 2. Verifica se as propriedades essenciais existem no objeto antes de ler
        if (!("login" in value) || !("id" in value) || !("name" in value)) {
            throw new Error("Erro de validação: O JSON da API do GitHub está incompleto.");
        }

        // 3. Força o TypeScript a entender o formato do objeto usando o Type Casting seguro
        const apiData = value as GithubApiResponse;
        
        // 4. Validação estrita dos tipos primitivos
        if (typeof apiData.id !== "number") {
            throw new Error("Erro de tipo: O 'id' retornado pelo GitHub não é um número."); 
        }

        if (typeof apiData.login !== "string") {
            throw new Error("Erro de tipo: O 'login' retornado pelo GitHub não é uma string."); 
        }

        if (apiData.name !== null && typeof apiData.name !== "string") {
            throw new Error("Erro de tipo: O 'name' retornado pelo GitHub não é uma string."); 
        }

       
        const usuarioRegex = /^(?!.*--)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
        
        if (!usuarioRegex.test(apiData.login)) {
            throw new Error("Erro de formato: O nome de usuário (login) não segue os padrões do GitHub.");
        }
        
  
        return new UsuarioGithub(String(apiData.id), apiData.login, apiData.name);
    }

    // Type Guard para verificar se o unknown é de fato um objeto manipulável
    private static isObject(value: unknown): value is Record<string, unknown> {
        return typeof value === "object" && value !== null;
    }
}