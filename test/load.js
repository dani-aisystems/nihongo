global.window = global;
for (const f of ['data-core.js','data-days-1.js','data-days-2.js','data-days-3.js','engine.js']) require('../'+f);
module.exports = window.NIHONGO;
