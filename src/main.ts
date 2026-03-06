console.log('LoreForge — World Engine');

let worldName: string = 'LoreForge';
console.log('World:', worldName);

let factions: string[] = ['Guardians', 'Shadow Order', 'Wanderers'];
factions.push('Iron Circle');

console.log('Factions in the world:');

for (let faction of factions) {
  console.log('-', faction);
}
