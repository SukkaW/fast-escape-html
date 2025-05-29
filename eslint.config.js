'use strict';

module.exports = require('eslint-config-sukka').sukka(
  {},
  {
    files: ['benchmark/index.ts'],
    linterOptions: {
      reportUnusedDisableDirectives: false
    }
  }
);
