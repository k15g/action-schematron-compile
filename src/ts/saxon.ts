export interface TransformOptions {
    stylesheetLocation?: string
    stylesheetFileName?: string
    stylesheetText?: string
    stylesheetInternal?: any
    stylesheetBaseURI?: string

    sourceType?: string
    sourceLocation?: string
    sourceFileName?: string
    sourceNode?: any
    sourceText?: string
    sourceBaseURI?: string

    stylesheetParams?: { [key: string]: string }
    initialTemplate?: string
    templateParams?: { [key: string]: string }
    tunnelParams?: { [key: string]: string }
    initialFunction?: string
    functionParams?: string[]
    initialMode?: string
    initialSelection?: any

    documentPool?: any
    textResourcePool?: any

    destination?: string
    resultForm?: string
    outputProperties?: { [key: string]: string }
    deliverMessage?: Function
    deliverResultDocument?: Function
    masterDocument?: any
    baseOutputURI?: string

    collations?: any
    collectionFinder?: Function
    logLevel?: number
    nonInteractive?: boolean

    principalResult?: string
}

export interface TransformResponse {
    principalResult?: string
}