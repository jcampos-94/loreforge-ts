import { promises as fs } from 'fs';
import path from 'path';

import { Faction } from '../models/Faction.js';
import { Character } from '../models/Character.js';

/**
 * Manages the state, persistence, and business logic for all factions and characters.
 */
export class World {
  factions: Faction[];
  characters: Character[];

  constructor() {
    this.factions = [];
    this.characters = [];
  }

  /**
   * Creates a new faction and automatically assigns the first leader as a character.
   */
  addFaction(name: string, leaderName: string): void {
    const faction = new Faction(
      this.formatName(name),
      this.formatName(leaderName),
    );
    this.factions.push(faction);

    // Create and push the faction
    const leader = new Character(
      this.formatName(leaderName),
      'Leader',
      faction,
    );
    this.characters.push(leader);
  }

  /**
   * Removes a faction. Fails if more than just the leader remains.
   */
  deleteFaction(name: string): void {
    const faction = this.factions.find((f) => f.name === this.formatName(name));

    if (!faction) {
      console.log('Faction not found.');
      return;
    }

    const members = this.characters.filter(
      (c) => c.faction.name === this.formatName(name),
    );

    // Prevent deletion if the faction is still populated
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

      // Cleanup the last remaining member (the leader)
      this.characters = this.characters.filter((c) => c.name != leader.name);

      console.log(`Leader ${leader.name} was removed.`);
    }

    // Delete the faction
    this.factions = this.factions.filter(
      (f) => f.name !== this.formatName(name),
    );
    console.log(`Faction ${this.formatName(name)} deleted.`);
  }

  /**
   * Registers a new character with validation for faction existence and mentor compatibility.
   */
  addCharacter(
    name: string,
    role: string,
    factionName: string,
    mentorName?: string,
  ): void {
    const faction = this.factions.find(
      (f) => f.name === this.formatName(factionName),
    );

    if (!faction) {
      console.log('Faction not found.');
      return;
    }

    // Validation: Mentor must exist, be in the same faction, and not be the same person
    if (
      (mentorName ? this.formatName(mentorName) : undefined) &&
      (mentorName ? this.formatName(mentorName) : undefined) !== 'Unknown'
    ) {
      const mentor = this.characters.find(
        (c) =>
          c.name === (mentorName ? this.formatName(mentorName) : undefined),
      );

      if (!mentor) {
        console.log('Mentor not found.');
        return;
      }

      if (mentor.faction.name !== this.formatName(factionName)) {
        console.log('Mentor must belong to the same faction.');
        return;
      }

      if (mentorName === this.formatName(name)) {
        console.log('A character cannot mentor themselves.');
        return;
      }
    }

    // Create and push the character
    const character = new Character(
      this.formatName(name),
      this.formatName(role),
      faction,
      mentorName ? this.formatName(mentorName) : undefined,
    );
    this.characters.push(character);
  }

  /**
   * Removes a character. If they were a leader, promotes the next available member.
   * If they were a mentor, their students are reassigned to the mentor's own mentor.
   */
  deleteCharacter(name: string): void {
    const character = this.characters.find(
      (c) => c.name === this.formatName(name),
    );

    if (!character) {
      console.log('Character not found.');
      return;
    }

    const faction = character.faction;

    const isLeader = faction.leaderName === character.name;

    // Inherit mentorship: Students of the deleted character move to the character's mentor
    for (const student of this.characters) {
      if (student.mentorName === this.formatName(name)) {
        student.mentorName = character.mentorName;
      }
    }

    // Delete the character
    this.characters = this.characters.filter(
      (c) => c.name !== this.formatName(name),
    );

    const remainingMembers = this.characters.filter(
      (c) => c.faction.name === faction.name,
    );

    if (isLeader) {
      if (remainingMembers.length === 0) {
        // Cascade delete: Remove empty faction if leader was the last member
        console.log(`Leader ${this.formatName(name)} removed.`);
        console.log(
          `Faction ${faction.name} has no members and will be deleted.`,
        );
        this.factions = this.factions.filter((f) => f.name !== faction.name);
      } else {
        // Succession: Promote the first found member to Leader
        const newLeader = remainingMembers[0];

        if (!newLeader) {
          console.log('Unexpected error determining new leader.');
          return;
        }

        faction.leaderName = newLeader.name;
        newLeader.role = 'Leader';

        console.log(`Leader ${this.formatName(name)} removed.`);
        console.log(`New leader of ${faction.name}: ${newLeader.name}`);
      }
    } else {
      console.log(`Character ${this.formatName(name)} was deleted.`);
    }
  }

  // Show factions in the console
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

  // Show characters in the console
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

  /**
   * Retrieves all characters who list the given name as their mentor.
   */
  getStudents(mentorName: string): Character[] {
    return this.characters.filter((c) => c.mentorName === mentorName);
  }

  /**
   * Recursively prints the mentorship hierarchy starting from a specific character.
   */
  showMentorshipTree(name: string, level: number = 0): void {
    const character = this.characters.find(
      (c) => c.name === this.formatName(name),
    );

    if (!character) {
      console.log('Character not found.');
      return;
    }

    const indent = '  '.repeat(level);

    console.log(`${indent}${character.name}`);

    const students = this.getStudents(character.name);

    for (const student of students) {
      this.showMentorshipTree(student.name, level + 1);
    }
  }

  // Saving/Loading Data logic
  private worldFile = path.join('data', 'world.json');

  /**
   * Serializes current state and writes to the local JSON data store.
   */
  async saveWorld(): Promise<void> {
    const data = {
      characters: this.characters,
      factions: this.factions,
    };

    try {
      await fs.mkdir('data', { recursive: true });

      await fs.writeFile(
        this.worldFile,
        JSON.stringify(data, null, 2),
        'utf-8',
      );
    } catch (error) {
      console.log('Error saving world:', error);
    }
  }

  /**
   * Reads world data and rebuilds relationships between objects in memory.
   */
  async loadWorld(): Promise<void> {
    try {
      const raw = await fs.readFile(this.worldFile, 'utf-8');

      // Prevent crash if file is empty
      if (!raw.trim()) return;

      const data = JSON.parse(raw);

      this.factions = data.factions || [];

      // Rebuild object references: Link each character back to its corresponding Faction instance
      const factionMap = new Map(this.factions.map((f: any) => [f.name, f]));

      this.characters = (data.characters || []).map((c: any) => ({
        ...c,
        faction: factionMap.get(c.faction.name),
      }));
    } catch {
      console.log('Warning: world.json corrupted. Starting empty.');
      this.characters = [];
      this.factions = [];
    }
  }

  // For testing
  getFactions() {
    return this.factions;
  }

  getCharacters() {
    return this.characters;
  }

  // Formatting purposes

  /**
   * Helper to capitalize the first letter of every word (Title Case).
   */
  private formatName(name: string): string {
    return name
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
