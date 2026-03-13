import { World } from './core/World.js';
import { Menu } from './ui/Menu.js';

// Initialize core data state
const world = new World();

// Load persisted data before mounting the UI
await world.loadWorld();

// Inject world state into the UI controller
const menu = new Menu(world);

// Start the primary interface loop
menu.start();
