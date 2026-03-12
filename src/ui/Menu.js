import readline from 'node:readline';
import { World } from '../core/World.js';
export class Menu {
    rl;
    world;
    constructor(world) {
        this.world = world;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    start() {
        this.clearConsole();
        this.showMenu();
    }
    showMenu() {
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
    handleMenu(choice) {
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
    addFaction() {
        this.rl.question('Faction name: ', (name) => {
            this.rl.question('Leader name: ', (leader) => {
                this.world.addFaction(name, leader);
                //save
                this.world.saveWorld();
                console.log('Faction created.');
                this.pause();
            });
        });
    }
    addCharacter() {
        this.rl.question('Character name: ', (name) => {
            this.rl.question('Role: ', (role) => {
                this.rl.question('Faction: ', (faction) => {
                    this.rl.question('Mentor (optional): ', (mentor) => {
                        const mentorName = mentor.trim() === '' ? undefined : mentor;
                        this.world.addCharacter(name, role, faction, mentorName);
                        //save
                        this.world.saveWorld();
                        console.log('Character created.');
                        this.pause();
                    });
                });
            });
        });
    }
    deleteCharacter() {
        this.rl.question('Character name to delete: ', (name) => {
            this.world.deleteCharacter(name);
            //save
            this.world.saveWorld();
            this.pause();
        });
    }
    deleteFaction() {
        this.rl.question('Faction name to delete: ', (name) => {
            this.world.deleteFaction(name);
            //save
            this.world.saveWorld();
            this.pause();
        });
    }
    showMentorshipTree() {
        this.rl.question('Enter character name: ', (name) => {
            this.world.showMentorshipTree(name);
            this.pause();
        });
    }
    clearConsole() {
        //console.clear();
        process.stdout.write('\x1Bc');
    }
    pause() {
        this.rl.question('\nPress ENTER to continue...', () => {
            this.clearConsole();
            this.showMenu();
        });
    }
}
//# sourceMappingURL=Menu.js.map