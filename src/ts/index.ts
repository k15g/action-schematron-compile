import * as core from '@actions/core'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import * as path from 'path'
import { TransformOptions, TransformResponse } from './saxon'
import { getSteps } from './pipelines'
const SaxonJS = require('saxon-js/SaxonJS2N')

function run() {
    // Read inputs
    var files = yaml.load(core.getInput('files', { required: true })) as object
    var params = yaml.load(core.getInput('params') || '{}') as { [key: string]: string }
    var include = (core.getInput('include') || 'true').toLowerCase() == 'true'
    var expand = (core.getInput('expand') || 'true').toLowerCase() == 'true'
    var compile = (core.getInput('compile') || 'true').toLowerCase() == 'true'
    var pipeline = core.getInput('pipeline') || 'schxslt'

    // Prepare steps
    var steps = getSteps(pipeline, include, expand, compile)

    // Loop through files
    Object.entries(files).forEach(([target, source]) => {
        perform(steps, source, target, params)
    })
}

function perform(steps: string[], source: string, target: string, params: { [key: string]: string } = {}) {
    var tmp: string

    core.info(`${source} => ${target}`)

    steps.forEach((step, i) => {
        var options: TransformOptions = {
            destination: 'serialized',
            stylesheetFileName: step,
            stylesheetParams: params,
            sourceText: tmp,
        }

        if (i == 0)
            options.sourceFileName = source

        var result: TransformResponse = SaxonJS.transform(options)
        tmp = result.principalResult

        if (i == steps.length - 1) {
            fs.mkdirSync(path.dirname(target), { recursive: true })
            fs.writeFileSync(target, tmp)
        }
    })
}

run()