import { World } from '../src/core/World.js';

describe('World Engine Logic', () => {
  /**
   * Verified: Faction initialization.
   * Checks that creating a faction automatically spawns its founding leader.
   */
  test('creates a faction with a leader', () => {
    const world = new World();

    world.addFaction('Horde', 'Thrall');

    const factions = world.getFactions();
    const characters = world.getCharacters();

    expect(factions.length).toBe(1);
    expect(factions[0]!.leaderName).toBe('Thrall');

    // Ensure the leader is also registered as a character entity
    expect(characters.length).toBe(1);
    expect(characters[0]!.name).toBe('Thrall');
  });

  /**
   * Verified: Mentorship Constraints.
   * Checks that the engine prevents invalid mentor assignments (self-mentoring or cross-faction).
   */
  test('prevents invalid mentor assignments', () => {
    const world = new World();
    world.addFaction('Alliance', 'Varian');
    world.addFaction('Horde', 'Thrall');

    // Scenario: Character cannot mentor themselves
    world.addCharacter('Anduin', 'Prince', 'Alliance', 'Anduin');
    let anduin = world.getCharacters().find((c) => c.name === 'Anduin');
    expect(anduin).toBeUndefined(); // Should fail validation

    // Scenario: Mentor must be in the same faction
    world.addCharacter('Baine', 'Warrior', 'Horde', 'Varian');
    let baine = world.getCharacters().find((c) => c.name === 'Baine');
    expect(baine).toBeUndefined(); // Should fail validation (Varian is Alliance)
  });

  /**
   * Verified: Mentorship Inheritance.
   * When a mentor is deleted, their students should be "promoted" to the mentor's mentor.
   */
  test('reassigns students when a mentor is deleted', () => {
    const world = new World();
    world.addFaction('Scourge', 'The Lich King');

    // Setup hierarchy: Lich King -> Kel'Thuzad -> Baron Rivendare
    world.addCharacter("Kel'Thuzad", 'Lich', 'Scourge', 'The Lich King');
    world.addCharacter(
      'Baron Rivendare',
      'Death Knight',
      'Scourge',
      "Kel'Thuzad",
    );

    // Delete the middle-man (Kel'Thuzad)
    world.deleteCharacter("Kel'Thuzad");

    const rivendare = world
      .getCharacters()
      .find((c) => c.name === 'Baron Rivendare');

    // Rivendare should now point to The Lich King (Kel'Thuzad's mentor)
    expect(rivendare?.mentorName).toBe('The Lich King');
  });

  /**
   * Verified: Leadership Succession.
   * If a leader is deleted, the next available member should take the mantle.
   */
  test('promotes a new leader when the current one is deleted', () => {
    const world = new World();
    world.addFaction('Alliance', 'Varian');
    world.addCharacter('Anduin', 'Prince', 'Alliance', 'Varian');

    // Remove the original leader
    world.deleteCharacter('Varian');

    const allianceFaction = world
      .getFactions()
      .find((f) => f.name === 'Alliance');
    const anduin = world.getCharacters().find((c) => c.name === 'Anduin');

    // Verification: Faction survives and Anduin is promoted
    expect(allianceFaction?.leaderName).toBe('Anduin');
    expect(anduin?.role).toBe('Leader');
  });

  /**
   * Verified: Faction Cleanup.
   * Factions with no remaining members should be purged from the world state.
   */
  test('deletes faction when the last member (leader) is removed', () => {
    const world = new World();
    // Cenarion Circle only has Malfurion
    world.addFaction('Cenarion Circle', 'Malfurion');

    world.deleteCharacter('Malfurion');

    expect(world.getFactions().length).toBe(0);
    expect(world.getCharacters().length).toBe(0);
  });
});
