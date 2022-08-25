import chalk from "chalk";
import Pokedex from "pokedex-promise-v2";
import { argv, exit } from "process";
import * as weaknesses from "../data/weaknesses.json" assert { type: "json" };

const P = new Pokedex();

const fetchPokemonInfo = async (name: string) => {
  console.log(chalk.green(`Fetching information about ${name}...`));
  try {
    const pokemon = await P.getPokemonByName(name.toLowerCase()) as Pokedex.Pokemon;
    const pokemonTypes = pokemon.types.map((typeObject) => typeObject.type.name);
    return pokemonTypes;
  } catch (error) { 
    console.log(chalk.bgRedBright("ERROR - Pokemon not found"));
  }
};

const fetchPokemonWeakness = () => {
  }

export const cli = async (args: string[]) => {
  console.log(chalk.blue("Welcome to poke-info!"));
  const pokemonName = args[2];
  if (!pokemonName) {
    console.log(chalk.red("Please provide a Pokemon name."));
    exit(1);
  }
  const pokemonInfo = await fetchPokemonInfo(pokemonName);
  if (!pokemonInfo) {
    exit(1)
  }
  console.log(pokemonInfo);
};

cli(argv);
