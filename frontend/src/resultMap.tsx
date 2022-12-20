/**
 * This class is a wrapper class for the global Map that contains the
 * values returned by our backend. By creating a wrapper class for the Map
 * we allow all of our classes to access the data stored in this map and 
 * modify the data via the setResultMap method. 
 */

export var resultMap : Map<string, any>;
resultMap = new Map<string, any>();
// Initiate default options for when we reload the game to avoid errors 
const mockOptions = []
mockOptions.push(`sampleSongA`)
mockOptions.push(`sampleSongB`)

resultMap.set(`Tracks and Artists List`, mockOptions)

/**
 * Setter function that allows other classes to change the details of the 
 * global Map
 * @param newMap Map which to change the value of the current resultMap to 
 */
export function setResultMap(newMap : Map<string, any>) {
    resultMap = newMap
}
