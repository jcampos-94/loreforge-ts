import { Faction } from './Faction.js';

/**
 * Data model representing an individual entity within a faction.
 */
export class Character {
  name: string;
  role: string;
  faction: Faction; // Reference to the parent faction object
  mentorName: string; // The name of the character's mentor (used for tree building)

  constructor(
    name: string,
    role: string,
    faction: Faction,
    mentorName?: string,
  ) {
    this.name = name;
    this.role = role;
    this.faction = faction;

    // Default to 'Unknown' if no mentor is provided during creation
    this.mentorName = mentorName || 'Unknown';
  }
}
