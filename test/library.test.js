const should = require('should')
const mirrorStore = require('../index.js')

describe('mirrorstore-library', function () {

    const storeName = 'Fancy Store'

    const keyString = 'testString'
    const valueString = 'testStringValue123'

    const keyNum = 'testInt'
    const valueNum = 123598710687

    const keyBool = 'testBool'
    const valueBool = true

    const keyArray = 'testArray'
    const valueArray = [1, 2, 3, 'foo', 'bar', 'baz']

    const keyObj = 'testObj'
    const valueObj = {a: 1, b: 2, c: 'foo', d: [1, 2, 3, 'bar', 'baz']}

    it('should be able to load', function() {
        const ms = new mirrorStore(storeName)
    })
    it('should have a list of backend storage mechanisms', function() {
        const ms = new mirrorStore(storeName);
        const supports = ms.supports();

        (supports).should.be.Array();
        (supports.length).should.be.above(0);
    })
    it('should be able to read non-existing value as undefined', function(done) {
        const ms = new mirrorStore(storeName);
        ms.getItem('non-existing')
            .then(function(value) {
                should(value).be.an.Undefined()
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to set a string value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyString, valueString)
            .then(function(value) {
                should(value).be.exactly(true)
            })
            .then(function() {
                ms.removeItem(keyString)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to retrieve a string value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyString, valueString)
            .then(function(value) {
                should(value).be.exactly(true)
                return ms.getItem(keyString)
            })
            .then(function(value) {
                should(value).be.a.String()
                should(value).be.exactly(valueString)
            })
            .then(function() {
                ms.removeItem(keyString)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to set a numeric value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyNum, valueNum)
            .then(function(value) {
                should(value).be.exactly(true)
            })
            .then(function() {
                ms.removeItem(keyNum)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to retrieve a numeric value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyNum, valueNum)
            .then(function(value) {
                should(value).be.exactly(true)
                return ms.getItem(keyNum)
            })
            .then(function(value) {
                should(value).be.an.Number()
                should(value).be.exactly(valueNum)
            })
            .then(function() {
                ms.removeItem(keyNum)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to set a boolean value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyBool, valueBool)
            .then(function(value) {
                should(value).be.exactly(true)
            })
            .then(function() {
                ms.removeItem(keyBool)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to retrieve a boolean value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyBool, valueBool)
            .then(function(value) {
                should(value).be.exactly(true)
                return ms.getItem(keyBool)
            })
            .then(function(value) {
                should(value).be.a.Boolean()
                should(value).be.exactly(valueBool)
            })
            .then(function() {
                ms.removeItem(keyBool)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to set an array value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyArray, valueArray)
            .then(function(value) {
                should(value).be.exactly(true)
            })
            .then(function() {
                ms.removeItem(keyArray)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to retrieve an array value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyArray, valueArray)
            .then(function(value) {
                should(value).be.exactly(true)
                return ms.getItem(keyArray)
            })
            .then(function(value) {
                should(value).be.an.Array()
                should(value).be.deepEqual(valueArray)
            })
            .then(function() {
                ms.removeItem(keyArray)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to set an object value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyObj, valueObj)
            .then(function(value) {
                should(value).be.exactly(true)
            })
            .then(function() {
                ms.removeItem(keyObj)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to retrieve an object value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyObj, valueObj)
            .then(function(value) {
                should(value).be.exactly(true)
                return ms.getItem(keyObj)
            })
            .then(function(value) {
                should(value).be.an.Object()
                should(value).be.deepEqual(valueObj)
            })
            .then(function() {
                ms.removeItem(keyObj)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to remove a value', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyObj, valueObj)
            .then(function(value) {
                should(value).be.exactly(true)
                return ms.getItem(keyObj)
            })
            .then(function(value) {
                should(value).be.an.Object()
                should(value).be.deepEqual(valueObj)
                return ms.removeItem(keyObj)
            })
            .then(function(value) {
                should(value).be.exactly(true)
                return ms.getItem(keyObj)
            })
            .then(function(value) {
                should(value).be.an.Undefined()
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
    it('should be able to retrieve stored keys', function(done) {
        const ms = new mirrorStore(storeName);
        ms.setItem(keyString, valueString)
            .then(function() {
                return ms.setItem(keyNum, valueNum)
            })
            .then(function() {
                return ms.setItem(keyBool, valueBool)
            })
            .then(function() {
                return ms.keys()
            })
            .then(function(value) {
                should(value).containDeep([keyString, keyNum, keyBool])
            })
            .then(function() {
                return ms.removeItem(keyString)
            })
            .then(function() {
                return ms.removeItem(keyNum)
            })
            .then(function() {
                return ms.removeItem(keyBool)
            })
            .then(function() {
                return ms.keys()
            })
            .then(function(value) {
                should(value).be.an.Array()
                should(value).have.length(0)
            })
            .then(function() {
                done()
            }).then(undefined, done)
    })
})
