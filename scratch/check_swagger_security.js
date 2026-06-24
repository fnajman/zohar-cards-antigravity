import fs from 'fs';
const text = fs.readFileSync('/Users/justme/.gemini/antigravity-ide/brain/c81f8e9c-9230-49a8-92ab-8204cda32ece/.system_generated/steps/6325/content.md', 'utf-8');
const jsonMatch = text.match(/\{[\s\S]*\}/);
if (jsonMatch) {
    const swagger = JSON.parse(jsonMatch[0]);
    console.log("Global Security:");
    console.log(JSON.stringify(swagger.security, null, 2));
    console.log("\nSecurity Definitions:");
    console.log(JSON.stringify(swagger.components?.securitySchemes || swagger.securityDefinitions, null, 2));
    console.log("\nPATCH security:");
    console.log(JSON.stringify(swagger.paths['/letter/{letter_id}']['patch'].security, null, 2));
    console.log("\nGET parameters:");
    console.log(JSON.stringify(swagger.paths['/letter']['get'].parameters, null, 2));
}
