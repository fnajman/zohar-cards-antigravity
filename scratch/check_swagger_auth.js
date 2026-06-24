import fs from 'fs';
const text = fs.readFileSync('/Users/justme/.gemini/antigravity-ide/brain/c81f8e9c-9230-49a8-92ab-8204cda32ece/.system_generated/steps/6325/content.md', 'utf-8');
const jsonMatch = text.match(/\{[\s\S]*\}/);
if (jsonMatch) {
    const swagger = JSON.parse(jsonMatch[0]);
    for (const [path, methods] of Object.entries(swagger.paths)) {
        if (path.includes('/auth') || path.includes('/login')) {
            console.log(`Path: ${path}`);
        }
    }
}
