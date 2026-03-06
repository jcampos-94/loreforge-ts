export class DataLoader {
  private static loaded: boolean = false;

  static async ensureLoaded(): Promise<void> {
    if (this.loaded) return;

    console.log('Loading world data...');

    await this.loadFactions();
    await this.loadCharacters();

    this.loaded = true;

    console.log('World data loaded.\n');
  }

  private static async loadFactions(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('Factions loaded.');
  }

  private static async loadCharacters(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('Characters loaded.');
  }
}
