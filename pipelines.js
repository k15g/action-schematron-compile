"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSteps = void 0;
var pipelines = {
    "schxslt": {
        all: __dirname + "/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/pipeline-for-svrl.sef.json",
        include: __dirname + "/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/include.sef.json",
        expand: __dirname + "/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/expand.sef.json",
        compile: __dirname + "/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/compile-for-svrl.sef.json",
    }
};
function getSteps(type, include, expand, compile) {
    var steps = [];
    var pipeline = pipelines[type];
    if (include && expand && compile && pipeline.all) {
        steps.push(pipeline.all);
    }
    else {
        if (include)
            steps.push(pipeline.include);
        if (expand)
            steps.push(pipeline.expand);
        if (compile)
            steps.push(pipeline.compile);
    }
    return steps;
}
exports.getSteps = getSteps;
