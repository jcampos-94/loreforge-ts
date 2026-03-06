import { Faction } from './Faction.js';

export class Character {
  name: string;
  role: string;
  faction: Faction;

  constructor(name: string, role: string, faction: Faction) {
    this.name = name;
    this.role = role;
    this.faction = faction;
  }
}
