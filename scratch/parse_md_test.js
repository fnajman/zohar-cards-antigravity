import fs from 'fs';

const md = fs.readFileSync('/Users/justme/Documents/sync/VibesCoding/Zohar card/4_backup/content/letters_content_fr.2. lalou.md', 'utf-8');

const letterBlocks = md.split(/^# \[/m).slice(1);
console.log(`Trouvé ${letterBlocks.length} blocs de lettres.`);

const results = [];
for (const block of letterBlocks) {
    const lines = block.trim().split('\n');
    const header = lines[0]; // e.g. "1] Aleph (א)"
    const idMatch = header.match(/^(\d+)\]/);
    if (!idMatch) continue;
    const id = parseInt(idMatch[1]);
    
    const fields = {};
    const fieldBlocks = block.split(/^### /m).slice(1);
    for (const fb of fieldBlocks) {
        const fLines = fb.trim().split('\n');
        const fieldName = fLines[0].trim();
        const content = fLines.slice(1).join('\n').trim();
        fields[fieldName] = content;
    }
    
    results.push({ id, fieldsCount: Object.keys(fields).length, hasNewField: !!fields['body_correspondence.body_area_kabbale_tehima'] });
}

console.log(results.slice(0, 3));
