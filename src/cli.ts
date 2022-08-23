import chalk from 'chalk';
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();
import { argv, exit } from 'process';

const fetchPokemonInfo = async (name: string) => {
  console.log(chalk.green(`Fetching information about ${name}...`));
  const pokemonSpecies = await P.getPokemonSpeciesByName(name);
  return pokemonSpecies;
};

export const cli = async (args: string[]) => {
  console.log(chalk.blue("Welcome to poke-info!"));
  const pokemonName = args[2];
  if (!pokemonName) {
    console.log(chalk.red("Please provide a Pokemon name."));
    exit(1);
  }
  const pokemonInfo = await fetchPokemonInfo(pokemonName);
  console.log(pokemonInfo);
};

cli(argv);
