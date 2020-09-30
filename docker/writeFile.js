const fs = require('fs')

console.log(process.argv)

if (process.argv.length !== 4) {
  console.warn('You must pass two arguments to this command!')
  console.warn(
    'Example: node writeFile.js myFileName.js "console.log(\'hello!\')"'
  )
  process.exit(1)
}

// The first element of process.argv is the path to the node binary.
// The second is the path to this file being run (writeFile.js).
const fileName = process.argv[2]
const fileContents = process.argv[3]

fs.writeFileSync(fileName, fileContents, 'utf8')
