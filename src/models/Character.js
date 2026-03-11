import { Faction } from './Faction.js';
export class Character {
    name;
    role;
    faction;
    mentorName;
    constructor(name, role, faction, mentorName) {
        this.name = name;
        this.role = role;
        this.faction = faction;
        this.mentorName = mentorName || 'Unknown';
    }
}
//# sourceMappingURL=Character.js.map