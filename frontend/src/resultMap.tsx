export var resultMap : Map<string, any>;
resultMap = new Map<string, any>();
const mockOptions = []
mockOptions.push(`sampleSongA`)
mockOptions.push(`sampleSongB`)

resultMap.set(`Tracks and Artists List`, mockOptions)

export function setResultMap(newMap : Map<string, any>) {
    resultMap = newMap
}
