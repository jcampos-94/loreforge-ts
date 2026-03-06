export class DataLoader {
    static loaded = false;
    static async ensureLoaded() {
        if (this.loaded)
            return;
        console.log('Loading world data...');
        await this.loadFactions();
        await this.loadCharacters();
        this.loaded = true;
        console.log('World data loaded.\n');
    }
    static async loadFactions() {
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log('Factions loaded.');
    }
    static async loadCharacters() {
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log('Characters loaded.');
    }
}
//# sourceMappingURL=DataLoader.js.map