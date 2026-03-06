import { DataLoader } from './core/DataLoader.js';
import { Faction } from './models/Faction.js';
import { Character } from './models/Character.js';

//Factions
const factions: Faction[] = [];

const magesGuild = new Faction('Mages Guild', 'Archmage Solren', 80);
const ironLegion = new Faction('Iron Legion', 'General Kael', 65);

factions.push(magesGuild);
factions.push(ironLegion);

//Characters
const characters: Character[] = [];

characters.push(new Character('Elyra', 'Mage', magesGuild));
characters.push(new Character('Darion', 'Knight', ironLegion));

async function main() {
  //Startup
  console.log('LoreForge — World Engine\n');
  await DataLoader.ensureLoaded();
  console.log('Engine ready.\n');

  //Print Factions
  console.log('Factions:');
  for (const faction of factions) {
    console.log(
      `Name: ${faction.name} | Leader: ${faction.leader} | Influence: ${faction.influence}`,
    );
  }
  console.log();
  //Print Characters
  console.log('Characters:');
  for (const character of characters) {
    console.log(
      `Name: ${character.name} | Role: ${character.role} | Faction: ${character.faction.name}`,
    );
  }
}

main();
