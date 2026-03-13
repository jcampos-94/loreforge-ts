/**
 * Data model representing a group or organization within the world.
 */
export class Faction {
  name: string;
  leaderName: string; // The primary character identifier for this group

  constructor(name: string, leaderName: string) {
    this.name = name;
    this.leaderName = leaderName;
  }
}
