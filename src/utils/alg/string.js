


/**
 * @param {String} source
 * @param {String} startSeparator
 * @param {String} endSeparator
 * @returns {String|undefined}
 */
function extractInnerSubstring(source = '', startSeparator, endSeparator) {
    const match = source.match(new RegExp(`${startSeparator}.[^${endSeparator}]*`))

    if (match) {
        return match[0].replace(startSeparator, '')
    }
}

/**
 * @param {String} string
 * @returns {String}
 */
function decodeUnicodeEscapeSequence(string) {
    try {
        return JSON.parse('"' + string + '"')
    } catch {
        try {
            return JSON.parse('"' + string.replace(/\n/g, ' ').replace(/\\/g, ' ') + ' "').trim()
        } catch {
            return string
        }
    }
}

function escapeStringRegexp(string) {
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d')
}

function safeJsonParse(string) {
    try {
        return JSON.parse(string)
    } catch {
        return null
    }
}

function clearString(str) {
    return str.split('').join('')
}

/**
 * @param {String} url
 * @returns {String}
 */
function safeDecodeURI(url = '') {
    for (let r = 6; r !== 0 && url.indexOf('%') !== -1; r--) {
        try {
            url = r % 2 === 0 ? decodeURI(url) : decodeURIComponent(url)
        } catch(e) {
            try {
                url = r % 2 === 0 ? decodeURIComponent(url) : decodeURI(url)
            } catch {
                return url
            }
        }
    }
    return url
}


module.exports = {
    extractInnerSubstring,
    decodeUnicodeEscapeSequence,
    escapeStringRegexp,
    safeJsonParse,
    clearString,
    safeDecodeURI
}
