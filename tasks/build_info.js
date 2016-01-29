/*
 * grunt-build-info
 * https://github.com/r3b/grunt-build-info
 *
 * Copyright (c) 2014 ryan bridges
 * Licensed under the APLv2 license.
 */

'use strict';

var getConfiguration = require("../lib/services");

function registerTasks(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerTask('set_build_info', 'Set the global build_info.', function(val) {
    // grunt.config.set("BUILD_INFO", val);
    console.log("VAL", val);

    global["BUILD_INFO"] = val;
  });

  grunt.registerMultiTask('build_info', 'Import build info from CI systems', function() {
    global["BUILD_INFO"] = getConfiguration();
  });

}

module.exports = function(grunt){
  if (grunt) {
    registerTasks(grunt);
  } else {
    return getConfiguration();
  }
};
