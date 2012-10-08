/**
 * Walks the contents of a specified path and processes each file.
 *
 * @package generator
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    bin     = require('commander'),
    colors  = require('colors'),
    fs      = require('fs'),
    findit  = require('findit');

var exec    = require('child_process').exec;

/**
 * Constructor
 */
function Walk (path, name, verbose) {
    var self = this;
    self.dictionary = new Object(null);

    /**
     * Handle arguments
     */
    self.dictionary['__name__'] = name;
    if (typeof verbose === 'undefined') {
        verbose = false;
    }
    
    /**
     * File processor queue (FIFO)
     */
    var queue = async.queue(function (file, callback) {
        processFile(file, function (err, buffer) {
            fs.writeFile(file, buffer, callback);
        });
    }, 1);

    queue.drain = function () {
        console.log('Template ready. Running "make"...'.green);
        exec('make generator', {
            cwd: path
        }, function (err, stdout, stderr) {
            console.log('Complete!'.green);
            process.exit(0);
        });
    };

    /**
     * Add files to the queue.
     */
    var finder = findit.find(path);
    finder.on('file', function (file, stat) {
        queue.push(file);
    });
    
    /**
     * File processor
     */
    function processFile(file, callback) {
        fs.readFile(file, function (err, data) {
            if (err) return callback(err);
            var buffer = data.toString();
            
            // Queue command line prompts
            var q = async.queue(function (key, callback) {
                // Exclude GCC-style macros
                if (key.toUpperCase() === key) {
                    callback();
                } else {
                    // Replace
                    if (typeof self.dictionary[key] !== 'undefined') {
                        buffer = buffer.replace(key, self.dictionary[key]);
                        callback();
                    } else {
                        var human = key.replace(/__/g, '');
                        bin.prompt(human + ': ', function (value) {
                            self.dictionary[key] = value;
                            buffer = buffer.replace(key, self.dictionary[key]);
                            callback();
                        });
                    }
                }
            }, 1);

            // Create the match list and push to queue
            var regex = /__(.*?)__/ig;
            var match = buffer.match(regex);
            if (match === null) {
                return callback(null, buffer);
            } else {
                q.push(match);
            }

            // Continue
            q.drain = function () {
                callback(null, buffer);
            };
        });
    }
};

/**
 * Export
 */
module.exports = Walk;
