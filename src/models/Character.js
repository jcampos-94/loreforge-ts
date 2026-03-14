import { Faction } from './Faction.js';
/**
 * Data model representing an individual entity within a faction.
 */
export class Character {
    name;
    role;
    faction; // Reference to the parent faction object
    mentorName; // The name of the character's mentor (used for tree building)
    constructor(name, role, faction, mentorName) {
        this.name = name;
        this.role = role;
        this.faction = faction;
        // Default to 'Unknown' if no mentor is provided during creation
        this.mentorName = mentorName || 'Unknown';
    }
}
//# sourceMappingURL=Character.js.map