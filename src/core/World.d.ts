import { Faction } from '../models/Faction.js';
import { Character } from '../models/Character.js';
/**
 * Manages the state, persistence, and business logic for all factions and characters.
 */
export declare class World {
    factions: Faction[];
    characters: Character[];
    constructor();
    /**
     * Creates a new faction and automatically assigns the first leader as a character.
     */
    addFaction(name: string, leaderName: string): void;
    /**
     * Removes a faction. Fails if more than just the leader remains.
     */
    deleteFaction(name: string): void;
    /**
     * Registers a new character with validation for faction existence and mentor compatibility.
     */
    addCharacter(name: string, role: string, factionName: string, mentorName?: string): void;
    /**
     * Removes a character. If they were a leader, promotes the next available member.
     * If they were a mentor, their students are reassigned to the mentor's own mentor.
     */
    deleteCharacter(name: string): void;
    showFactions(): void;
    showCharacters(): void;
    /**
     * Retrieves all characters who list the given name as their mentor.
     */
    getStudents(mentorName: string): Character[];
    /**
     * Recursively prints the mentorship hierarchy starting from a specific character.
     */
    showMentorshipTree(name: string, level?: number): void;
    private worldFile;
    /**
     * Serializes current state and writes to the local JSON data store.
     */
    saveWorld(): Promise<void>;
    /**
     * Reads world data and rebuilds relationships between objects in memory.
     */
    loadWorld(): Promise<void>;
    getFactions(): Faction[];
    getCharacters(): Character[];
    /**
     * Helper to capitalize the first letter of every word (Title Case).
     */
    private formatName;
}
//# sourceMappingURL=World.d.ts.map