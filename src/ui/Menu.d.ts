import { World } from '../core/World.js';
/**
 * Handles terminal-based user interaction and menu navigation.
 */
export declare class Menu {
    private rl;
    private world;
    constructor(world: World);
    /**
     * Clears the console and enters the main interaction loop.
     */
    start(): void;
    /**
     * Renders the primary command list to the terminal.
     */
    private showMenu;
    /**
     * Routes user input to specific logic handlers.
     */
    private handleMenu;
    /**
     * Prompt-based workflow to register a new faction.
     */
    private addFaction;
    /**
     * Multi-step prompt to register a character and link to a faction/mentor.
     */
    private addCharacter;
    /**
     * Removes a character from the world state by name.
     */
    private deleteCharacter;
    /**
     * Removes a faction from the world state by name.
     */
    private deleteFaction;
    /**
     * Displays the mentor relationships of a specific character.
     */
    private showMentorshipTree;
    /**
     * Uses ANSI escape codes to clear the terminal screen.
     */
    private clearConsole;
    /**
     * Halts execution to allow the user to read output before returning to the menu.
     */
    private pause;
}
//# sourceMappingURL=Menu.d.ts.map