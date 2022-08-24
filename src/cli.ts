import chalk from "chalk";
import Pokedex from "pokedex-promise-v2";
import { argv, exit } from "process";

const P = new Pokedex();

const fetchPokemonInfo = async (name: string) => {
  console.log(chalk.green(`Fetching information about ${name}...`));
  try {
    const pokemonSpecies = await P.getPokemonSpeciesByName(name.toLowerCase());
    return pokemonSpecies;
  } catch (error) { 
      console.log(chalk.bgRedBright("ERROR - Pokemon not found"))
  }
};

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
