'use strict';

requirejs.config({
  baseUrl: 'bower_components',
  paths: {
    'templates': '../js/templates',
    'component': '../js/component',
    'page': '../js/page',
    'hoganjs': 'hogan/web/builds/3.0.2/hogan-3.0.2.amd'
  },
  urlArgs: "ts=" + (new Date()).getTime()
});

require(
  [
    'flight/lib/compose',
    'flight/lib/registry',
    'flight/lib/advice',
    'flight/lib/logger',
    'flight/lib/debug'
  ],

  function(compose, registry, advice, withLogging, debug) {
    debug.enable(true);
    compose.mixin(registry, [advice.withAdvice]);

    require(['page/default'], function(initializeDefault) {
      initializeDefault();
    });
  }
);
