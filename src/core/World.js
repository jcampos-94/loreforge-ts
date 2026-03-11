import { Faction } from '../models/Faction.js';
import { Character } from '../models/Character.js';
export class World {
    factions;
    characters;
    constructor() {
        this.factions = [];
        this.characters = [];
    }
    addFaction(name, leaderName, influence) {
        const faction = new Faction(name, leaderName, influence);
        this.factions.push(faction);
        const leader = new Character(leaderName, 'Leader', faction);
        this.characters.push(leader);
    }
    deleteFaction(name) {
        const faction = this.factions.find((f) => f.name === name);
        if (!faction) {
            console.log('Faction not found.');
            return;
        }
        const members = this.characters.filter((c) => c.faction.name === name);
        if (members.length > 1) {
            console.log('Warning: Cannot delete faction.');
            console.log('Faction still has members.');
            return;
        }
        this.factions = this.factions.filter((f) => f.name !== name);
        console.log(`Faction ${name} deleted.`);
    }
    addCharacter(name, role, factionName, mentorName) {
        const faction = this.factions.find((f) => f.name === factionName);
        if (!faction) {
            console.log('Faction not found.');
            return;
        }
        const character = new Character(name, role, faction, mentorName);
        this.characters.push(character);
    }
    deleteCharacter(name) {
        const character = this.characters.find((c) => c.name === name);
        if (!character) {
            console.log('Character not found.');
            return;
        }
        const faction = character.faction;
        const isLeader = faction.leaderName === character.name;
        //remove character
        this.characters = this.characters.filter((c) => c.name !== name);
        const remainingMembers = this.characters.filter((c) => c.faction.name === faction.name);
        if (isLeader) {
            if (remainingMembers.length === 0) {
                console.log(`Leader ${name} removed.`);
                console.log(`Faction ${faction.name} has no members and will be deleted.`);
                this.factions = this.factions.filter((f) => f.name !== faction.name);
            }
            else {
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
    showFactions() {
        console.log('\nFactions:');
        for (const faction of this.factions) {
            console.log(`Name: ${faction.name} | Leader: ${faction.leaderName} | Influence: ${faction.influence}`);
        }
    }
    showCharacters() {
        console.log('\nCharacters:');
        for (const character of this.characters) {
            console.log(`Name: ${character.name} | Role: ${character.role} | Faction: ${character.faction.name}`);
        }
    }
}
//# sourceMappingURL=World.js.map