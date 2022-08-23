import chalk from 'chalk';
import { argv, exit } from 'process';

const fetchPokemonInfo = async (name: string) => {
  console.log(chalk.green(`Fetching information about ${name}...`));
  return "Fake information.";
};

export const cli = async (args: string[]) => {
  console.log(chalk.blue("Welcome to poke-info!"));
  const pokemonName = args[2];
  if (!pokemonName) {
    console.log(chalk.red("Please provide a Pokemon name."));
    exit(1);
  }
  const pokemonInfo = fetchPokemonInfo(pokemonName);
  console.log(pokemonInfo);
};

cli(argv);
