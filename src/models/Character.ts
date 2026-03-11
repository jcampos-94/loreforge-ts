import { Faction } from './Faction.js';

export class Character {
  name: string;
  role: string;
  faction: Faction;
  mentorName: string;

  constructor(
    name: string,
    role: string,
    faction: Faction,
    mentorName?: string,
  ) {
    this.name = name;
    this.role = role;
    this.faction = faction;
    this.mentorName = mentorName || 'Unknown';
  }
}
