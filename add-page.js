const YAML = require('yaml');
const fs = require('fs');
const readlineSync = require('readline-sync');
const kebabCase = require('kebab-case');

// Parsing input
const mkdocsPath = './mkdocs.yml';
const parsedMkdocs = YAML.parse(fs.readFileSync(mkdocsPath, 'utf-8'));
const allTopics = parsedMkdocs.pages;
const suggestedTopic = Object.getOwnPropertyNames(allTopics[1])[0];
const topicName = readlineSync.question(`Topic name (${suggestedTopic}): `) || suggestedTopic;
const topic = allTopics.find(t => Object.getOwnPropertyNames(t)[0] == topicName);
if (!topic) {
  throw new Error('Please insert a valid topic name');
}
const topicPages = topic[topicName];
const pageName = readlineSync.question(`Page name: `);
if(!pageName) throw new Error('Please insert a non-empty page name');
if(topicPages.find(p => Object.getOwnPropertyNames(p)[0] == pageName)) throw new Error('A page with the same name already exists in this topic.');
const defaultPageFilename = kebabCase(pageName).replace(' ', '-').replace('--', '-').substr(1) + '.md'; // removes first dash
const pageFilename = readlineSync.question(`Page file name (${defaultPageFilename}): `) || defaultPageFilename;

// Creating notes/<topic>/<page>.md
const topicFolder = topic[topicName][0]['Home'].replace('/index.md', '');
const topicFolderPath = `./notes/${topicFolder}`;
const pagePath = `${topicFolderPath}/${pageFilename}`;
const page = `# ${pageName}

${pageName}.

`;
fs.writeFileSync(pagePath, page);

// Updating mkdocs.yml
const pageConfig = {};
pageConfig[pageName] = `${topicFolder}/${pageFilename}`;
topicPages.push(pageConfig);
const newMkdocs = YAML.stringify(parsedMkdocs);
fs.writeFileSync(mkdocsPath, newMkdocs);

// Updating notes/<topic>/index.md
const topicIndexPath = `${topicFolderPath}/index.md`;
const topicIndex = fs.readFileSync(topicIndexPath, 'utf-8');
const newPageEntry = `${topicPages.length - 1}. [${pageName}](./${pageFilename})\n`;
const newTopicIndex = topicIndex + newPageEntry;
fs.writeFileSync(topicIndexPath, newTopicIndex);
