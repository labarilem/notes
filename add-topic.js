const YAML = require('yaml');
const fs = require('fs');
const readlineSync = require('readline-sync');
const kebabCase = require('kebab-case');

// Parsing input
const topicName = readlineSync.question('Topic name: ');
if(!topicName) throw new Error('Please insert a non-empty topic name');
const defaultTopicFolder = kebabCase(topicName).replace(' ', '-').replace('--', '-').substr(1); // removes first dash
const topicFolder = readlineSync.question(`Topic folder (${defaultTopicFolder}): `) || defaultTopicFolder;

// Updating mkdocs.yml
const mkdocsPath = './mkdocs.yml';
const rawMkdocs = fs.readFileSync(mkdocsPath, 'utf-8');
const parsedMkdocs = YAML.parse(rawMkdocs);
const mkdocsPageConfig = {};
mkdocsPageConfig[topicName] = [ { 'Home': `${topicFolder}/index.md` } ];
parsedMkdocs.pages.splice(1, 0, mkdocsPageConfig);
const newMkdocs = YAML.stringify(parsedMkdocs);
fs.writeFileSync(mkdocsPath, newMkdocs);

// Updating README.md
const readmePath = './README.md'
const readme = fs.readFileSync(readmePath, 'utf-8');
const newReadmeEntry = `\n- [${topicName}](./notes/${topicFolder}/index.md)`;
const insertReadmeIndex = readme.indexOf('\n', readme.indexOf('## Contents')) + 1;
const newReadme = readme.slice(0, insertReadmeIndex) + newReadmeEntry + readme.slice(insertReadmeIndex);
fs.writeFileSync(readmePath, newReadme);

// Updating notes/index.md
const globalIndexPath = './notes/index.md';
const globalIndex = fs.readFileSync(globalIndexPath, 'utf-8');
const newGlobalIndexEntry = `\n- [${topicName}](./${topicFolder}/index.md)`;
const insertGlobalIndex = globalIndex.indexOf('\n', globalIndex.indexOf('## Contents')) + 1;
const newGlobalIndex = globalIndex.slice(0, insertGlobalIndex) + newGlobalIndexEntry + globalIndex.slice(insertGlobalIndex);
fs.writeFileSync(globalIndexPath, newGlobalIndex);

// Creating notes/<topic> folder
const topicFolderPath = `./notes/${topicFolder}`;
if(!fs.existsSync(topicFolderPath)) fs.mkdirSync(topicFolderPath);

// Creating notes/<topic>/index.md
const localIndexPath = `./${topicFolderPath}/index.md`;
const localIndex = `# ${topicName}

${topicName}.

Topics:

`;
fs.writeFileSync(localIndexPath, localIndex);

// Creating notes/<topic>/images folder
const imagesFolderPath = `${topicFolderPath}/images`;
if(!fs.existsSync(imagesFolderPath)) fs.mkdirSync(imagesFolderPath);
