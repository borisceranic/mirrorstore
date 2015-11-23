var adapter = require('../adapters/localforage.js')
var localforage = require('localforage')
var driver = localforage.LOCALSTORAGE

module.exports = function(name) {
    return new adapter(driver, name)
}
