const adapter = require('../adapters/localforage.js')
const localforage = require('localforage')
const driver = localforage.LOCALSTORAGE

module.exports = function(name) {
    return new adapter(driver, name)
}
