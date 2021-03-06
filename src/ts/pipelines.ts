interface Pipeline {
    all?: string
    include: string
    expand: string
    compile: string
}

const pipelines: {[type: string]: Pipeline} = {
    "schxslt": {
        all: `${__dirname}/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/pipeline-for-svrl.sef.json`,
        include: `${__dirname}/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/include.sef.json`,
        expand: `${__dirname}/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/expand.sef.json`,
        compile: `${__dirname}/node_modules/@k15g/xslt-schxslt-saxonjs-2.3/compile-for-svrl.sef.json`,
    },
    "iso-schematron": {
        include: `${__dirname}/node_modules/@k15g/xslt-schematron-saxonjs-2.3/iso_dsdl_include.sef.json`,
        expand: `${__dirname}/node_modules/@k15g/xslt-schematron-saxonjs-2.3/iso_abstract_expand.sef.json`,
        compile: `${__dirname}/node_modules/@k15g/xslt-schematron-saxonjs-2.3/iso_svrl_for_xslt2.sef.json`,
    },
}

export function getSteps(type: string, include: boolean, expand: boolean, compile: boolean): string[] {
    var steps: string[] = []
    var pipeline = pipelines[type]

    if (pipeline == undefined)
        throw new Error(`Pipeline '${type}' is unknown.`)

    if (include && expand && compile && pipeline.all) {
        steps.push(pipeline.all)
    } else {
        if (include)
            steps.push(pipeline.include)
        if (expand)
            steps.push(pipeline.expand)
        if (compile)
            steps.push(pipeline.compile)
    }

    return steps
}