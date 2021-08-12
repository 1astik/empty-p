


class SettledFiltered {
    constructor() {
        this.results = []
        this.errors = []
        this.empty = 0
    }
}



/**
 * @param {Promise[]} promises 
 * @returns {Promise.<SettledFiltered>}
 */
async function settledFilter(promises) { 
    const results = await Promise.allSettled(promises)

    const _result = new SettledFiltered()

    for (const result of results) {
        if (result.status === 'fulfilled') {
            if (result.value) {
                _result.results.push(result.value)
            } else {
                _result.empty++
            }
        } else {
            _result.errors.push(result.reason)
        }
    }

    return _result
}

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))


module.exports = {
    settledFilter,
    sleep
}