import { accessToken } from 'mapbox-gl';
import Sound from 'react-sound';
import { generateAccessToken, generateTrack } from './GenerateSong';

var URL = generateTrack(`https://open.spotify.com/playlist/4sX9J6HyFYZxtauo6Xu37o`, accessToken)
export default function PlaySound() {
    return (
        <div>
            <Sound
                url={URL.toString()}
                playFromPosition={0}
            />
        </div>
    )
}
