import readline from 'node:readline'
const readLinePromises = require("node:readline/promises");
import {stdin, stdout} from "process";



const response = await fetch('https://api.github.com/users/${nome}')
const json = await response.json();


async function main() {
    const r1 = readline.createInterface (stdin, stdout);
}