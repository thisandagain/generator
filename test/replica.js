/**
 * Unit test suite.
 *
 * @package generator
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    fs      = require('fs-extra'),
    test    = require('tap').test;

var Replica = require('../lib/replica');

/**
 * Suite
 */
async.auto({

    replica:    function (callback) {
        var replica = new Replica(__dirname + '/payload', 'testReplicaPayload', callback);
    },

    test:       ['replica', function (callback, obj) {
        test('Replica', function (t) {
            t.type(obj.replica, 'string', 'Result should be a string');
            t.ok(obj.replica.indexOf('/test/testReplicaPayload') !== -1, 'Contains expected path');
            t.end();
        });

        callback();
    }],

    cleanup:    ['test', function (callback, obj) {
        fs.remove(obj.replica, callback);
    }]

}, function (err, obj) {
    test('Catch errors', function (t) {
        t.equal(err, null, 'Errors should be null');
        t.end();
    });
});