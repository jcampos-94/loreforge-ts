import { Faction } from '../models/Faction.js';
import { Character } from '../models/Character.js';
export declare class World {
    factions: Faction[];
    characters: Character[];
    constructor();
    addFaction(name: string, leaderName: string): void;
    deleteFaction(name: string): void;
    addCharacter(name: string, role: string, factionName: string, mentorName?: string): void;
    deleteCharacter(name: string): void;
    showFactions(): void;
    showCharacters(): void;
}
//# sourceMappingURL=World.d.ts.map