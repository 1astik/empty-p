/**
 * Search for a match by line in the project.
 * For those who do not know that idle can do this, or for hardcore console fans.
 */

const fs = require('fs')
const path = require('path')

const ignore = ['.dockerignore', '.gitignore', 'note.txt', 'package.json', 
    'package-lock.json', 'node_modules', '.idea', 'docs', 'image',
    '.git', 'logs', '.gitkeep', 'public']

let numberFiles = 0
let numberStrings = 0
let numberCharacters = 0

const search = process.argv[2] ? new RegExp(process.argv[2]): ''


function find(currentPath = path.resolve(__dirname + '/../')) {

    const files = fs.readdirSync(currentPath)

    for (let i = 0; i < files.length; i++) {

        const file = path.parse(files[i])

        if (ignore.includes(file.base))
            continue

        if (!file.ext) {

            find(currentPath + '/' + file.base)

        } else {

            const content = fs.readFileSync(currentPath + '/' + file.base)

            numberFiles++
            
            content.toString().split('\n').forEach((string, index) => {
                if (search) {
                    const coincidence = string.match(search)
                    if (coincidence) {
                        console.log(`path: ${currentPath}/${file.base}`)
                        console.log(`${index + 1}/${coincidence.index + 1} input: ${coincidence.input}\n`)
                    }
                }
                if (string.trim().length)
                    numberStrings++
            })

            content.toString().split('').forEach(symbol => {
                if (symbol.trim())
                    numberCharacters++
            })
        }
    }
}

find()

console.log('Number of files: ' + numberFiles)
console.log('Number of rows: ' + numberStrings)
console.log('Number of characters: ' + numberCharacters)