type Pokemon = {
  id: number;
  nome: string;
  tipo: string;
}


const pokemons: Pokemon[] = [
  { id: 4, nome: "Charmander", tipo: "Fogo" },
  { id: 1, nome: "Bulbasaur", tipo: "Planta" },
  { id: 6, nome: "Charizard", tipo: "Fogo" },
  { id: 7, nome: "Squirtle", tipo: "Água" }
];


function apenasFogo(pokemons: Pokemon[]) {
  return pokemons.filter(pokemon => pokemon.tipo.toLowerCase() === "fogo");
}


console.log(apenasFogo(pokemons));