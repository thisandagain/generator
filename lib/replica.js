/**
 * Creates a replica of the specified template in the current working directory.
 *
 * @package generator
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var fs  = require('fs-extra');

/**
 * Constructor
 *
 * @param {String} Source path
 * @param {String} Destination name
 *
 * @return {String} Replica path
 */
function Replica (path, name, callback) {
    var self = this;

    if (fs.existsSync(path)) {
        var destination = process.cwd() + '/' + name;

        if (fs.existsSync(destination)) {
            callback('Path already exists.');
        } else {
            fs.copy(path, destination, function (err) {
                callback(err, destination);
            });
        }
    } else {
        callback('Template not found.');
    }
};

/**
 * Export
 */
module.exports = Replica;
