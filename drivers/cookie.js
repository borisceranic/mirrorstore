var Promise = require('promise')
var JSON = require('json3')
var merge = require('lodash.merge')
var cookies = require('cookies-js')

var CookieDriver = function() {
    this.isSupported = false
    this.cookiesLib = cookies
    this.cookiesDefaults = {
        path: '/',
        domain: undefined,
        expires: undefined,
        secure: false,
    }

    if (this.cookiesLib.enabled) {
        this.isSupported = true
    }
}

CookieDriver.prototype._resolver = function(promise, fulfillWith) {
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

CookieDriver.prototype._getItem = function(key) {
    return function(resolve, reject) {
        try {
            var value = JSON.parse(this.cookiesLib.get(key))
            resolve(value)
        } catch (e) {
            resolve(null)
        }
    }
}

CookieDriver.prototype._setItem = function(key, value, opts) {
    return function(resolve, reject) {
        try {
            var oldDefaults = this.cookiesLib.defaults
            this.cookiesLib.defaults = merge(this.cookiesDefaults, opts)
            var ret = this.cookiesLib.set(key, JSON.stringify(value))
            this.cookiesLib.defaults = oldDefaults

            resolve(ret)
        } catch (e) {
            reject(e)
        }
    }
}

CookieDriver.prototype._removeItem = function(key, opts) {
    return function(resolve, reject) {
        try {
            resolve(this.cookiesLib.expire(key, merge(this.cookiesDefaults, opts)))
        } catch (e) {
            reject(e)
        }
    }
}

CookieDriver.prototype._keys = function() {
    return function(resolve, reject) {
        var keys = []
        try {
            if (typeof this.cookiesLib._cache === 'object') {
                // cache renewal needs to happen each time as cache may be stale
                this.cookiesLib._renewCache()
                keys = Object.keys(this.cookiesLib._cache).map(function(value) {
                    return value.replace(this.cookiesLib._cacheKeyPrefix, '')
                }.bind(this))
            }
            resolve(keys)
        } catch (e) {
            reject(e)
        }
    }
}

CookieDriver.prototype.supported = function() {
    return this.isSupported
}

CookieDriver.prototype.getItem = function(key) {
    return this._resolver(new Promise(this._getItem(key).bind(this)))
}

CookieDriver.prototype.setItem = function(key, value, opts) {
    return this._resolver(new Promise(this._setItem(key, value, opts).bind(this)), true)
}

CookieDriver.prototype.removeItem = function(key, opts) {
    return this._resolver(new Promise(this._removeItem(key, opts).bind(this)), true)
}

CookieDriver.prototype.keys = function() {
    return this._resolver(new Promise(this._keys().bind(this)))
}

module.exports = function () {
    return new CookieDriver()
}
