#!/usr/bin/env node

/**
 * Command line interface for generator.
 *
 * @package generator
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var bin     = require('commander'),
    colors  = require('colors'),
    package = require('../package.json');

var Setup   = require('../lib/setup.js'),
    Replica = require('../lib/replica.js'),
    Walk    = require('../lib/walk.js');

/**
 * Defaults
 */
var TEMPLATE_SRC = __dirname + '/../templates';
var TEMPLATE_DIR = process.env.HOME + '/.generator';
function stderr (err) {
    console.log('Error: '.red + err.red);
    process.exit(1);
}

/**
 * CLI definition
 */
bin
    .version(package.version)
    .usage('-n [project name] -t [template name]')
    .option('-t, --template <template>', 'Template name (from ~/.generator')
    .option('-n, --name <name>', 'Name of project to be generated')
    .option('-s, --setup', 'Initializes the generator template directory')
    .parse(process.argv);

/**
 * Setup
 */
if (bin.setup) {
    new Setup(TEMPLATE_SRC, TEMPLATE_DIR, function (err) {
        if (err) stderr(err);
        console.log('Setup complete'.green);
    });
} else {
    /**
     * Check requirements
     */
    if (typeof bin.template === 'undefined' || bin.name === 'index.js') {
        stderr('Template and project name must be specified. See --help.');
    }

    /**
     * Copy template & process
     */
    new Replica(TEMPLATE_DIR+'/'+bin.template, bin.name, function (err, path) {
        if (err) stderr(err);
        new Walk(path, bin.name, false);
    });
}

/**
 * Uncaught exception handler
 */
process.on('uncaughtException', function (err) {
    process.exit(0);
});