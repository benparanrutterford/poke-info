import chalk from "chalk";
import Pokedex from "pokedex-promise-v2";
import { argv, exit } from "process";
import * as weaknesses from "../data/weaknesses.json" assert { type: "json" };

const P = new Pokedex();

const getPokemon = async (name: string) => {
  console.log(chalk.green(`Fetching information about ${name}...`));
  try {
    const pokemon = await P.getPokemonByName(name.toLowerCase()) as Pokedex.Pokemon;
    return pokemon;
  } catch (error) { 
    console.log(chalk.bgRedBright("ERROR - Pokemon not found"));
  }
};

const getPokemonTypes = (pokemon: Pokedex.Pokemon) =>
  pokemon.types.map((typeObject) => typeObject.type.name);
  
const getPokemonWeakness = (types: string[]) => {

};

export const cli = async (args: string[]) => {
  console.log(chalk.blue("Welcome to poke-info!"));
  
  const pokemonName = args[2];
  if (!pokemonName) {
    console.log(chalk.red("Please provide a Pokemon name."));
    exit(1);
  }
  
  const pokemonInfo = await getPokemon(pokemonName);
  if (!pokemonInfo) exit(1);
  
  const pokemonTypes = getPokemonTypes(pokemonInfo);
  console.log(`This Pokemon is of type ${pokemonTypes.join(" and ")}`);
  
  const pokemonWeakness = getPokemonWeakness(pokemonTypes);
  console.log(`This Pokemon's weaknesses are ${pokemonWeakness}`);
};

cli(argv);
