var should = require('should')

var randomName = 'db1'

function testDriver(driverInstance) {
    var keyString = 'testString'
    var valueString = 'testStringValue123'

    var keyNum = 'testInt'
    var valueNum = 123598710687

    var keyBool = 'testBool'
    var valueBool = true

    var keyArray = 'testArray'
    var valueArray = [1, 2, 3, 'foo', 'bar', 'baz']

    var keyObj = 'testObj'
    var valueObj = {a: 1, b: 2, c: 'foo', d: [1, 2, 3, 'bar', 'baz']}

    it('should be supported', function () {
        (driverInstance.supported()).should.equal(true)
    })
    describe('setItem()', function() {
        it('should be able to store a value', function (done) {
            driverInstance
                .setItem(keyString, valueString)
                .then(function(value) {
                    should(value).be.exactly(true)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })

        after(function(done) {
            driverInstance.removeItem(keyString)
                .then(function() {
                    done()
                }).then(undefined, done)
        })
    })
    describe('removeItem()', function() {
        it('should be able to remove the stored value', function (done) {
            driverInstance
                .setItem(keyString, valueString)
                .then(function() {
                    return driverInstance.removeItem(keyString)
                })
                .then(function(value) {
                    should(value).be.exactly(true)
                })
                .then(function() {
                    return driverInstance.keys()
                })
                .then(function(value) {
                    should(value).be.an.Array()
                    should(value).have.length(0)
                })
                .then(function() {
                    done()
                })
                .then(undefined, done)
        })
    })
    describe('String type', function() {
        afterEach(function(done) {
            driverInstance.removeItem(keyString)
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to store a string', function (done) {
            driverInstance
                .setItem(keyString, valueString)
                .then(function(value) {
                    should(value).be.exactly(true)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to retrieve stored string', function (done) {
            driverInstance
                .setItem(keyString, valueString)
                .then(function() {
                    return driverInstance.getItem(keyString)
                })
                .then(function(value) {
                    should(value).be.a.String()
                    should(value).be.exactly(valueString)
                })
                .then(function() {
                    done()
                })
                .then(undefined, done)
        })
    })
    describe('Number type', function() {
        afterEach(function(done) {
            driverInstance.removeItem(keyNum)
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to store a number', function (done) {
            driverInstance
                .setItem(keyNum, valueNum)
                .then(function(value) {
                    should(value).be.exactly(true)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to retrieve stored number', function (done) {
            driverInstance
                .setItem(keyNum, valueNum)
                .then(function() {
                    return driverInstance.getItem(keyNum)
                })
                .then(function(value) {
                    should(value).and.be.a.Number()
                    should(value).be.exactly(valueNum)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
    })
    describe('Boolean type', function() {
        afterEach(function(done) {
            driverInstance.removeItem(keyBool)
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to store a boolean', function (done) {
            driverInstance
                .setItem(keyBool, valueBool)
                .then(function(value) {
                    should(value).be.exactly(true)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to retrieve stored boolean', function (done) {
            driverInstance
                .setItem(keyBool, valueBool)
                .then(function() {
                    return driverInstance.getItem(keyBool)
                })
                .then(function(value) {
                    should(value).and.be.a.Boolean()
                    should(value).be.exactly(valueBool)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
    })
    describe('Array type', function() {
        afterEach(function(done) {
            driverInstance.removeItem(keyArray)
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to store an array', function (done) {
            driverInstance
                .setItem(keyArray, valueArray)
                .then(function(value) {
                    should(value).be.exactly(true)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to retrieve stored array', function (done) {
            driverInstance
                .setItem(keyArray, valueArray)
                .then(function() {
                    return driverInstance.getItem(keyArray)
                })
                .then(function(value) {
                    should(value).and.be.a.Array()
                    should(value).be.deepEqual(valueArray)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
    })
    describe('Object type', function() {
        afterEach(function(done) {
            driverInstance.removeItem(keyObj)
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to store an object', function (done) {
            driverInstance
                .setItem(keyObj, valueObj)
                .then(function(value) {
                    should(value).be.exactly(true)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to retrieve stored object', function (done) {
            driverInstance
                .setItem(keyObj, valueObj)
                .then(function() {
                    return driverInstance.getItem(keyObj)
                })
                .then(function(value) {
                    should(value).and.be.a.Object()
                    should(value).be.deepEqual(valueObj)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
    })

    describe('keys()', function() {
        afterEach(function(done) {
            driverInstance
                .removeItem(keyString)
                .then(function() {
                    return driverInstance.removeItem(keyNum)
                })
                .then(function() {
                    return driverInstance.removeItem(keyBool)
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
        it('should be able to enumerate stored keys', function (done) {
            driverInstance.setItem(keyString, valueString)
                .then(function() {
                    return driverInstance.setItem(keyNum, valueNum)
                })
                .then(function() {
                    return driverInstance.setItem(keyBool, valueBool)
                })
                .then(function() {
                    return driverInstance.keys()
                })
                .then(function(value) {
                    should(value).be.an.Array()
                    should(value).containDeep([keyString, keyNum, keyBool])
                })
                .then(function() {
                    done()
                }).then(undefined, done)
        })
    })
}

describe('mirrorstore-drivers', function () {
    describe('localstorage', function () {
        var driver = require('../drivers/localstorage.js')
        testDriver(driver(randomName))
    })
    describe('websql', function () {
        var driver = require('../drivers/websql.js')
        testDriver(driver(randomName))
    })
/*    xdescribe('indexeddb (skipped, unsupported on phantomjs)', function () {
        var driver = require('../drivers/indexeddb.js')
        testDriver(driver(randomName))
    }) */
    describe('cookie', function () {
        var driver = require('../drivers/cookie.js')
        testDriver(driver(randomName), true)
    })
})
