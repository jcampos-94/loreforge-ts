import { World } from './core/World.js';
console.log('LoreForge — World Engine');
const world = new World();
world.addFaction('Mages Guild', 'Solren', 80);
world.addCharacter('Elyra', 'Mage', 'Mages Guild', 'Solren');
world.addCharacter('Talion', 'Apprentice', 'Mages Guild', 'Elyra');
world.showCharacters();
world.deleteCharacter('Solren');
world.showFactions();
world.showCharacters();
//# sourceMappingURL=main.js.map