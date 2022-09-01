const DEFAULT_THEME = require('@odpf/apsara/lib/cjs/theme')
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: DEFAULT_THEME,
  })
);
