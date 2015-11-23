const uniq = require('lodash.uniq')

const drivers = [
    {
        name: 'localstorage',
        module: require('./drivers/localstorage.js'),
        isCookies: false,
    },
    {
        name: 'indexeddb',
        module: require('./drivers/indexeddb.js'),
        isCookies: false,
    },
    {
        name: 'websql',
        module: require('./drivers/websql.js'),
        isCookies: false,
    },
    {
        name: 'cookie',
        module: require('./drivers/cookie.js'),
        isCookies: true,
    },
]

var mirrorStore = function(databaseName) {
    this.databaseName = databaseName

    // Initialize drivers and keep only supported ones
    this.drivers = drivers
        .map(function(driver) {
            driver.instance = driver.module(this.databaseName)
            driver.supported = driver.instance.supported()
            return driver
        }.bind(this))
        .filter(function(driver) {
            return driver.supported
        })
}

mirrorStore.prototype.supports = function() {
    return this.drivers
        .map(function(driver) {
            return driver.name
        })
        .filter(function(driver) { return typeof driver !== 'undefined' })
}

mirrorStore.prototype.setItem = function(key, value, options) {
    return Promise.all(this.drivers.map(function(driver) {
        return driver.instance.setItem(key, value, options)
    }))
    .then(function() {
        return true
    })
}

mirrorStore.prototype._countUnique = function(original) {
    var compressed = {};

    for (var i = 0, len = original.length; i < len; i++) {
        var keyVal = original[i]
        var key = JSON.stringify(keyVal)

        if (typeof compressed[key] === 'undefined') {
            compressed[key] = {
                value: keyVal,
                count: 0,
            }
        }

        compressed[key].count++
    }

    return Object.keys(compressed).map(function(keyName) {
        return {
            value: compressed[keyName].value,
            count: compressed[keyName].count,
        }
    })
}

mirrorStore.prototype.getItem = function(key) {
    return Promise.all(this.drivers.map(function(driver) {
        return driver.instance.getItem(key)
    }))
    .then(function(responseList) {
        responseList = responseList.filter(function(item) {
            return typeof item !== 'undefined' && item !== null
        })
        if (responseList.length < 1) {
            return
        }
        responseList = this._countUnique(responseList)
        responseList = responseList.sort(function (a, b) {
                if (a.count > b.count) {
                    return 1;
                }
                if (a.count < b.count) {
                    return -1;
                }
                return 0;
            })

        return responseList[0].value
    }.bind(this))
}

mirrorStore.prototype.removeItem = function(key, options) {
    return Promise.all(this.drivers.map(function(driver) {
        return driver.instance.removeItem(key, options)
    }))
    .then(function() {
        return true
    })
}

mirrorStore.prototype.keys = function() {
    return Promise.all(this.drivers.map(function(driver) {
        return driver.instance.keys()
    }))
    .then(function(keys) {
        var returnSortedArray = true

        keys = keys.reduce(function(outKeys, allKeys) {
            for (var i = 0, len = allKeys.length; i < len; i++) {
                outKeys.push(allKeys[i])
            }
            return outKeys
        }, [])

        return uniq(keys, returnSortedArray)
    })
}

module.exports = mirrorStore
