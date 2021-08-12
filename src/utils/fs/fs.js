const fs = require('fs')
const path = require('path')
const config = require('@config')



function findFilePathsByFilename(filename, excludeDirs = []) {
    return findFilepathsByFilenameR(filename, config.path.core, [], new Set(excludeDirs))
}

/**
 * @param {String} filename
 * @param {String} currentDir
 * @param {Array.<String>} paths
 * @param {Set.<String>} excludeDirs
 * @returns {Array.<String>}
 */
function findFilepathsByFilenameR(filename, currentDir, paths = [], excludeDirs) {
    const filenames = fs.readdirSync(currentDir)

    for (const currentFilename of filenames) {
        const currentPath = path.resolve(currentDir, currentFilename)
        const fileStat = fs.statSync(currentPath)
        if (fileStat.isDirectory()) {
            if (!excludeDirs.has(currentFilename)) {
                findFilepathsByFilenameR(filename, currentPath, paths, excludeDirs)
            }
        } else if (fileStat.isFile()) {
            const pathInfo = path.parse(currentPath)
            if (pathInfo.name === filename) {
                paths.push(currentPath)
            }
        }
    }

    return paths
}


module.exports = {
    findFilePathsByFilename,
}