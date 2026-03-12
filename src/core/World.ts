import { Faction } from '../models/Faction.js';
import { Character } from '../models/Character.js';

export class World {
  factions: Faction[];
  characters: Character[];

  constructor() {
    this.factions = [];
    this.characters = [];
  }

  addFaction(name: string, leaderName: string): void {
    const faction = new Faction(name, leaderName);
    this.factions.push(faction);

    const leader = new Character(leaderName, 'Leader', faction);
    this.characters.push(leader);
  }

  deleteFaction(name: string): void {
    const faction = this.factions.find((f) => f.name === name);

    if (!faction) {
      console.log('Faction not found.');
      return;
    }

    const members = this.characters.filter((c) => c.faction.name === name);

    if (members.length > 1) {
      console.log('Warning: Cannot delete faction.');
      console.log('Faction still has at least two members.');
      return;
    } else {
      const leader = members[0];

      if (!leader) {
        console.log('Unexpected error determining leader.');
        return;
      }

      this.characters = this.characters.filter((c) => c.name != leader.name);

      console.log(`Leader ${leader.name} was removed.`);
    }

    this.factions = this.factions.filter((f) => f.name !== name);

    console.log(`Faction ${name} deleted.`);
  }

  addCharacter(
    name: string,
    role: string,
    factionName: string,
    mentorName?: string,
  ): void {
    const faction = this.factions.find((f) => f.name === factionName);

    if (!faction) {
      console.log('Faction not found.');
      return;
    }

    if (mentorName && mentorName !== 'Unknown') {
      const mentor = this.characters.find((c) => c.name === mentorName);

      if (!mentor) {
        console.log('Mentor not found.');
        return;
      }

      if (mentor.faction.name !== factionName) {
        console.log('Mentor must belong to the same faction.');
        return;
      }

      if (mentorName === name) {
        console.log('A character cannot mentor themselves.');
        return;
      }
    }

    const character = new Character(name, role, faction, mentorName);
    this.characters.push(character);
  }

  deleteCharacter(name: string): void {
    const character = this.characters.find((c) => c.name === name);

    if (!character) {
      console.log('Character not found.');
      return;
    }

    const faction = character.faction;

    const isLeader = faction.leaderName === character.name;

    for (const character of this.characters) {
      if (character.mentorName === name) {
        character.mentorName = 'Unknown';
      }
    }

    //remove character
    this.characters = this.characters.filter((c) => c.name !== name);

    const remainingMembers = this.characters.filter(
      (c) => c.faction.name === faction.name,
    );

    if (isLeader) {
      if (remainingMembers.length === 0) {
        console.log(`Leader ${name} removed.`);
        console.log(
          `Faction ${faction.name} has no members and will be deleted.`,
        );

        this.factions = this.factions.filter((f) => f.name !== faction.name);
      } else {
        const newLeader = remainingMembers[0];

        if (!newLeader) {
          console.log('Unexpected error determining new leader.');
          return;
        }

        faction.leaderName = newLeader.name;
        newLeader.role = 'Leader';

        console.log(`Leader ${name} removed.`);
        console.log(`New leader of ${faction.name}: ${newLeader.name}`);
      }
    }
  }

  showFactions(): void {
    if (this.factions.length === 0) {
      console.log('\nNo factions found.');
      return;
    }

    console.log('\nFactions:');

    for (const faction of this.factions) {
      console.log(`Name: ${faction.name} | Leader: ${faction.leaderName}`);
    }
  }

  showCharacters(): void {
    if (this.characters.length === 0) {
      console.log('\nNo characters found.');
      return;
    }

    console.log('\nCharacters:');

    for (const character of this.characters) {
      console.log(
        `Name: ${character.name} | Role: ${character.role} | Faction: ${character.faction.name}`,
      );
    }
  }
}
