/**
 * Loads the default templates for the current user.
 *
 * @package generator
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var bin     = require('commander'),
    colors  = require('colors'),
    fs      = require('fs-extra');

/**
 * Constructor
 *
 * @param {String} Source path (local to module)
 * @param {String} Target path (users home directory)
 *
 * @return {Error}
 */
function Setup (source, target, callback) {
    var self = this;

    // Copy source directory to target path
    function cmd (cb) {
        fs.copy(source, target, cb);
    }

    // Check target to see if directory already exists
    if (fs.existsSync(target)) {
        console.log('Re-initalizing default templates...'.red);
        cmd(callback);
    } else {
        cmd(callback);
    }
};

/**
 * Export
 */
module.exports = Setup;
