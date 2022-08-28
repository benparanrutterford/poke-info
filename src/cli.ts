import chalk from "chalk";
import Pokedex from "pokedex-promise-v2";
import { argv, exit } from "process";
import { weaknesses } from "../data/weaknesses.js";

// TODO: - Change weaknesses to JSON and read using readFileSync.

type pokemonType = 
  "normal" |
  "fire" |
  "water" |
  "electric" |
  "grass" |
  "ice" |
  "fighting" |
  "poison" |
  "ground" |
  "flying" |
  "psychic" |
  "bug" |
  "rock" |
  "ghost" |
  "dragon" |
  "dark" |
  "steel"
;

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
  const weaknessObjects = types.map((type) => weaknesses[type as pokemonType]);
  
  return weaknessObjects.reduce((previous, current) => {
    const accumulatedWeakness: any = {};
    Object.keys(previous).forEach((key) => {
      accumulatedWeakness[key] = previous[key as pokemonType] * current[key as pokemonType];
    });
    return accumulatedWeakness;
  });
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
  console.log(chalk.blueBright(`This Pokemon is of type ${pokemonTypes.join(" and ")}`));
  
  const pokemonWeakness = getPokemonWeakness(pokemonTypes);
  console.log(`This Pokemon's weaknesses are ${JSON.stringify(pokemonWeakness, null, 2)}`);
};

cli(argv);
