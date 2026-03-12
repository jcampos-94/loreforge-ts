import fs from 'fs';
import path from 'path';
import { Faction } from '../models/Faction.js';
import { Character } from '../models/Character.js';
export class World {
    factions;
    characters;
    constructor() {
        this.factions = [];
        this.characters = [];
    }
    addFaction(name, leaderName) {
        const faction = new Faction(name, leaderName);
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
            console.log('Faction still has at least two members.');
            return;
        }
        else {
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
    addCharacter(name, role, factionName, mentorName) {
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
    deleteCharacter(name) {
        const character = this.characters.find((c) => c.name === name);
        if (!character) {
            console.log('Character not found.');
            return;
        }
        const faction = character.faction;
        const isLeader = faction.leaderName === character.name;
        for (const student of this.characters) {
            if (student.mentorName === name) {
                student.mentorName = character.mentorName;
            }
        }
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
        else {
            console.log(`Character ${name} was deleted.`);
        }
    }
    showFactions() {
        if (this.factions.length === 0) {
            console.log('\nNo factions found.');
            return;
        }
        console.log('\nFactions:');
        for (const faction of this.factions) {
            console.log(`Name: ${faction.name} | Leader: ${faction.leaderName}`);
        }
    }
    showCharacters() {
        if (this.characters.length === 0) {
            console.log('\nNo characters found.');
            return;
        }
        console.log('\nCharacters:');
        for (const character of this.characters) {
            console.log(`Name: ${character.name} | Role: ${character.role} | Faction: ${character.faction.name}`);
        }
    }
    getStudents(mentorName) {
        return this.characters.filter((c) => c.mentorName === mentorName);
    }
    showMentorshipTree(name, level = 0) {
        const character = this.characters.find((c) => c.name === name);
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
    // Saving/Loading Data
    worldFile = path.join('data', 'world.json');
    saveWorld() {
        const data = {
            characters: this.characters,
            factions: this.factions,
        };
        // Ensure data folder exists
        if (!fs.existsSync('data')) {
            fs.mkdirSync('data');
        }
        fs.writeFileSync(this.worldFile, JSON.stringify(data, null, 2), 'utf-8');
    }
    loadWorld() {
        try {
            if (!fs.existsSync(this.worldFile)) {
                return;
            }
            const raw = fs.readFileSync(this.worldFile, 'utf-8');
            // Prevent crash if file is empty
            if (!raw.trim())
                return;
            const data = JSON.parse(raw);
            this.factions = data.factions || [];
            const factionMap = new Map(this.factions.map((f) => [f.name, f]));
            this.characters = (data.characters || []).map((c) => ({
                ...c,
                faction: factionMap.get(c.faction.name),
            }));
        }
        catch {
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
}
//# sourceMappingURL=World.js.map