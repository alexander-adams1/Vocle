import React from 'react';
import { getToken } from './FetchAudio';
function App() {
  return (
    <div className="App">
      {getToken()}
    </div>
  );
}

export default App;