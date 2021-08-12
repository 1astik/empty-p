

function setIfNotFalse(object, property, value) {
    if (value) {
        object[property] = value
    }
}

function setIfNotNaN(object, property, value) {
    if (!isNaN(value))
        object[property] = value
}

function copyPropertyIfExists(targetObject, property, sourceObject) {
    if (property in sourceObject) {
        targetObject[property] = sourceObject[property]
    }
}

function copyDeep(target) {

    if (typeof target !== 'object' || typeof target === 'object' && !target)
        return target

    if (Array.isArray(target)) {

        return target.map(value => copyDeep(value))
    } else {
        const result = {}

        Object.entries(target).forEach(([name, value]) => result[name] = copyDeep(value))

        return result
    }
}

function inDotNotation(targetObject, depth = 1, propertyName = '') {

    let object = {...targetObject}

    if (propertyName)
        propertyName += '.'

    const entries = Object.entries(object)

    for (let i = 0; i < entries.length; i++) {

        if (depth !== 0 && entries[i][1] && typeof entries[i][1] === 'object' && !Array.isArray(entries[i][1])) {
            object = {...object, ...inDotNotation(entries[i][1], depth - 1, propertyName + entries[i][0])}
            delete object[entries[i][0]]
        } else if (propertyName) {
            object[propertyName + entries[i][0]] = entries[i][1]
            delete object[entries[i][0]]
        }
    }

    return object
}

/**
 * Копирует свойства объекта source в объект target
 * @param {Object} source 
 * @param {Object} target 
 */
function replaceDeep(source, target) {
    for (const [key, value] of Object.entries(source)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
            if (key in target) {
                if (typeof target[key] === 'object' && !Array.isArray(target[key])) {
                    replaceDeep(source[key], target[key])
                } else {
                    target[key] = source[key]
                }
            }
        } else {
            target[key] = value
        }
    }

    return target
}


module.exports = {
    setIfNotFalse,
    setIfNotNaN,
    copyDeep,
    inDotNotation,
    copyPropertyIfExists,
    replaceDeep
}