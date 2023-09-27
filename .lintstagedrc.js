const path = require('path')

const testEslint = filenames =>
  `next lint --fix --file ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' --file ')}`
const testPrettier = filenames =>
  `npx prettier -w ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [testEslint, testPrettier],
}
