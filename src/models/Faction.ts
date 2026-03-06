export class Faction {
  name: string;
  leader: string;
  influence: number;

  constructor(name: string, leader: string, influence: number) {
    this.name = name;
    this.leader = leader;
    this.influence = influence;
  }
}
