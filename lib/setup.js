/**
 * Loads the default templates for the current user.
 *
 * @package generator
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var colors  = require('colors'),
    wrench  = require('wrench'),
    fs      = require('fs');

/**
 * Export
 */
module.exports = function (callback) {
    var source = __dirname + '/../templates';
    var target = process.env.HOME + '/.generator';

    fs.exists(target, function (exists) {
        if (exists) console.log('Re-initalizing default templates...'.yellow);
        wrench.copyDirSyncRecursive(source, target, {
            forceDelete      : true,  // Whether to overwrite existing directory or not
            excludeHiddenUnix: false, // Whether to copy hidden Unix files or not (preceding .)
            preserveFiles    : false, // If we're overwriting something and the file already exists, keep the existing
            inflateSymlinks  : true   // Whether to follow symlinks or not when copying files
        }, callback);
    });
};