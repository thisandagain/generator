/**
 * Creates a copy of the specified template in the current working directory.
 *
 * @package generator
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var wrench  = require('wrench'),
    fs      = require('fs');

/**
 * Export
 *
 * @param {String} Template name
 * @param {String} Destination name
 *
 * @return {String} Replica path
 */
module.exports = function (template, name, callback) {
    // Absolute paths to source & destination
    var source      = process.env.HOME + '/.generator/' + template;
    var destination = process.cwd() + '/' + name;

    // Checks
    if (!fs.existsSync(source)) return callback('Template not found.');
    if (fs.existsSync(destination)) return callback('Path already exists.');

    wrench.copyDirSyncRecursive(source, destination, {
       forceDelete: false,       // Whether to overwrite existing directory or not
       excludeHiddenUnix: false, // Whether to copy hidden Unix files or not (preceding .)
       preserveFiles: false,     // If we're overwriting something and the file already exists, keep the existing
       inflateSymlinks: true,    // Whether to follow symlinks or not when copying files
    }, function(err)
    {
        callback(err, destination);
    });
};