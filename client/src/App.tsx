import React, { ReactElement } from 'react';
import './App.css';

function App(): ReactElement {

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  const url = `https://api.notion.com/v1/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

  return (
    <div className="App">
      <a href={url}>Add to Notion</a>
    </div>
  );
}

export default App;
