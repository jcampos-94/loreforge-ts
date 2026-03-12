import { World } from '../src/core/World.js';

describe('World', () => {
  test('creates a faction with a leader', () => {
    const world = new World();

    world.addFaction('Horde', 'Thrall');

    const factions = world.getFactions();
    const characters = world.getCharacters();

    expect(factions.length).toBe(1);
    expect(factions[0]!.leaderName).toBe('Thrall');

    expect(characters.length).toBe(1);
    expect(characters[0]!.name).toBe('Thrall');
  });
});
