"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
var yaml = require("js-yaml");
var fs = require("fs");
var path = require("path");
var SaxonJS = require('saxon-js/SaxonJS2N');
function run() {
    var files = yaml.load(core.getInput('files', { required: true }));
    var params = yaml.load(core.getInput('params') || '{}');
    var include = (core.getInput('include') || 'true').toLowerCase() == 'true';
    var expand = (core.getInput('expand') || 'true').toLowerCase() == 'true';
    var compile = (core.getInput('compile') || 'true').toLowerCase() == 'true';
    var steps = [];
    if (include && expand && compile) {
        steps.push(__dirname + "/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/pipeline-for-svrl.sef.json");
    }
    else {
        if (include)
            steps.push(__dirname + "/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/include.sef.json");
        if (expand)
            steps.push(__dirname + "/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/expand.sef.json");
        if (compile)
            steps.push(__dirname + "/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/compile-for-svrl.sef.json");
    }
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
        if (i < steps.length - 1)
            tmp = result.principalResult;
        else {
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.writeFileSync(target, result.principalResult);
        }
    });
}
run();
