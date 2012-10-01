/**
 * Test suite
 *
 * @package __name__
 * @author __author__ <__email__>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    test    = require('tap').test,

    target  = require(__dirname + '/../lib/index.js');

/**
 * Suite
 */
async.auto({

    __name__:  function (callback) {
        target.__name__(callback);
    },

    test:   ['__name__', function (callback, obj) {
        test('Component definition', function (t) {
            t.type(target, 'object', 'Component should be an object');
            t.type(target.__name__, 'function', 'Method should be a function');
            t.end();
        });

        test('__name__ method', function (t) {
            t.type(obj.all, 'object', 'Results should be an object');
            t.end();
        });

        callback();
    }]

}, function (err, obj) {
    test('Catch errors', function (t) {
        t.equal(err, null, 'Errors should be null');
        t.end();
        process.exit();
    });
});