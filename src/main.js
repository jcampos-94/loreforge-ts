import readline from 'node:readline';
import { World } from './core/World.js';
import { Menu } from './ui/Menu.js';
const world = new World();
const menu = new Menu(world);
menu.start();
//# sourceMappingURL=main.js.map