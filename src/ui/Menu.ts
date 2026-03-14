import readline from 'node:readline';
import { World } from '../core/World.js';

/**
 * Handles terminal-based user interaction and menu navigation.
 */
export class Menu {
  private rl;
  private world: World;

  constructor(world: World) {
    this.world = world;

    // Set up standard I/O interface
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * Clears the console and enters the main interaction loop.
   */
  start() {
    this.clearConsole();
    this.showMenu();
  }

  /**
   * Renders the primary command list to the terminal.
   */
  private showMenu() {
    console.log('=== LoreForge — World Engine ===\n');
    console.log('1. Add faction');
    console.log('2. Add character');
    console.log('3. Delete character');
    console.log('4. Delete faction');
    console.log('5. Show factions');
    console.log('6. Show characters');
    console.log('7. Show mentorship tree');
    console.log('8. Exit');

    this.rl.question('\nChoose an option: ', (choice) => {
      this.handleMenu(choice);
    });
  }

  /**
   * Routes user input to specific logic handlers.
   */
  private handleMenu(choice: string) {
    switch (choice) {
      case '1':
        this.clearConsole();
        this.addFaction();
        break;

      case '2':
        this.clearConsole();
        this.addCharacter();
        break;

      case '3':
        this.clearConsole();
        this.deleteCharacter();
        break;

      case '4':
        this.clearConsole();
        this.deleteFaction();
        break;

      case '5':
        this.clearConsole();
        this.world.showFactions();
        this.pause();
        break;

      case '6':
        this.clearConsole();
        this.world.showCharacters();
        this.pause();
        break;

      case '7':
        this.clearConsole();
        this.showMentorshipTree();
        break;

      case '8':
        this.rl.close();
        break;

      default:
        console.log('Invalid option.');
        this.showMenu();
    }
  }

  /**
   * Prompt-based workflow to register a new faction.
   */
  private addFaction() {
    this.rl.question('Faction name: ', (name) => {
      this.rl.question('Leader name: ', (leader) => {
        const success = this.world.addFaction(name, leader);

        if (success) {
          this.world.saveWorld(); // Persist changes to storage
          console.log('Faction created.');
        }

        this.pause();
      });
    });
  }

  /**
   * Multi-step prompt to register a character and link to a faction/mentor.
   */
  private addCharacter() {
    this.rl.question('Character name: ', (name) => {
      this.rl.question('Role: ', (role) => {
        this.rl.question('Faction: ', (faction) => {
          this.rl.question('Mentor (optional): ', (mentor) => {
            // Treat empty strings as undefined for optional mentorship
            // It will translate into "Unknown" thanks to the Character class
            const mentorName = mentor.trim() === '' ? undefined : mentor;

            const success = this.world.addCharacter(
              name,
              role,
              faction,
              mentorName,
            );

            if (success) {
              this.world.saveWorld(); // Persist changes to storage
              console.log('Character created.');
            }

            this.pause();
          });
        });
      });
    });
  }

  /**
   * Removes a character from the world state by name.
   */
  private deleteCharacter() {
    this.rl.question('Character name to delete: ', (name) => {
      this.world.deleteCharacter(name);
      this.world.saveWorld(); // Persist changes to storage

      this.pause();
    });
  }

  /**
   * Removes a faction from the world state by name.
   */
  private deleteFaction() {
    this.rl.question('Faction name to delete: ', (name) => {
      this.world.deleteFaction(name);
      this.world.saveWorld(); // Persist changes to storage

      this.pause();
    });
  }

  /**
   * Displays the mentor relationships of a specific character.
   */
  private showMentorshipTree() {
    this.rl.question('Enter character name: ', (name) => {
      this.world.showMentorshipTree(name);

      this.pause();
    });
  }

  /**
   * Uses ANSI escape codes to clear the terminal screen.
   */
  private clearConsole() {
    //console.clear() wasn't used due to the terminal behaving oddly sometimes
    process.stdout.write('\x1Bc');
  }

  /**
   * Halts execution to allow the user to read output before returning to the menu.
   */
  private pause() {
    this.rl.question('\nPress ENTER to continue...', () => {
      this.clearConsole();
      this.showMenu();
    });
  }
}
