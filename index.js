"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
var yaml = require("js-yaml");
var fs = require("fs");
var path = require("path");
var pipelines_1 = require("./pipelines");
var SaxonJS = require('saxon-js/SaxonJS2N');
function run() {
    var files = yaml.load(core.getInput('files', { required: true }));
    var params = yaml.load(core.getInput('params') || '{}');
    var include = (core.getInput('include') || 'true').toLowerCase() == 'true';
    var expand = (core.getInput('expand') || 'true').toLowerCase() == 'true';
    var compile = (core.getInput('compile') || 'true').toLowerCase() == 'true';
    var pipeline = core.getInput('pipeline') || 'schxslt';
    var steps = (0, pipelines_1.getSteps)(pipeline, include, expand, compile);
    Object.entries(files).forEach(function (_a) {
        var target = _a[0], source = _a[1];
        perform(steps, source, target, params);
    });
}
function perform(steps, source, target, params) {
    if (params === void 0) { params = {}; }
    var tmp;
    core.info(source + " => " + target);
    steps.forEach(function (step, i) {
        var options = {
            destination: 'serialized',
            stylesheetFileName: step,
            stylesheetParams: params,
            sourceText: tmp,
        };
        if (i == 0)
            options.sourceFileName = source;
        var result = SaxonJS.transform(options);
        tmp = result.principalResult;
        if (i == steps.length - 1) {
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.writeFileSync(target, tmp);
        }
    });
}
run();
