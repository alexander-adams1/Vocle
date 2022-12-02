import React from 'react';

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <button className="btn-spotify" href="/auth/login" onClick={console.log(1)}>
                    Login with Spotify 
                </button>
            </header>
        </div>
    );
}

export default Login;
