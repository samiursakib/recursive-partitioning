import React, { useEffect, useRef, useState } from 'react';
import 'split-pane-react/esm/themes/default.css';
import './App.css';
import { randomColor } from './libs/utils';
import { Container } from './components/Container';

function App() {
  const [tree, setTree] = useState(null);
  const appRef = useRef(null);
  useEffect(() => {
    if (appRef && appRef.current)
      appRef.current.style.backgroundColor = randomColor();
  }, []);
  return (
    <div ref={appRef} style={{ height: '100vh' }}>
      <Container
        direction={tree?.direction}
        first={tree?.first}
        second={tree?.second}
        setTree={setTree}
      />
    </div>
  );
}

export default App;
