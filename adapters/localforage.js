const localforage = require('localforage')

var Adapter = function(driver, name) {
    this.driver = driver
    this.isSupported = false

    if (localforage.supports(this.driver)) {
        this.isSupported = true
        this.localforage = localforage.createInstance({
            driver: this.driver,
            name: name,
        })
    }
}

Adapter.prototype._resolver = function(promise, fulfillWith) {
    return promise
        .then(function(value) {
            if (typeof fulfillWith !== 'undefined') {
                return fulfillWith
            }

            return value
        })
        .then(undefined, function(err) {
            return new Error(err)
        })
}

Adapter.prototype.supported = function() {
    return this.isSupported
}

Adapter.prototype.getItem = function(key) {
    return this._resolver(this.localforage.getItem(key))
}

Adapter.prototype.setItem = function(key, value) {
    return this._resolver(this.localforage.setItem(key, value), true)
}

Adapter.prototype.removeItem = function(key) {
    return this._resolver(this.localforage.removeItem(key), true)
}

Adapter.prototype.keys = function() {
    return this._resolver(this.localforage.keys())
}

module.exports = Adapter
