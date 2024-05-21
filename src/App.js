import React, { useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import './App.css';

const randomColor = () => {
  const randomChannel = () => Math.random() * 255;
  return `rgb(${randomChannel()},${randomChannel()},${randomChannel()})`;
};

const Control = ({ first, second, setTree }) => {
  const splitVertically = () => {
    //
  };
  const splitHorizontally = () => {
    //
  };
  return (
    <div className="control centerize gap5px">
      <button>v</button>
      <button>h</button>
    </div>
  );
};

const Container = ({ direction, first, second, setTree }) => {
  const [sizes, setSizes] = useState(['50%', 'auto']);
  console.log('direction: ', direction, 'first: ', first, 'second: ', second);
  return direction ? (
    <SplitPane split={direction} sizes={sizes} onChange={setSizes}>
      <Pane minSize="10%" maxSize="90%">
        <div className="centerize" style={{ background: randomColor() }}>
          {first?.direction ? (
            <Container
              direction={first?.direction}
              first={first?.first}
              second={first?.second}
              setTree={setTree}
            />
          ) : (
            <Control first={first} second={second} setTree={setTree} />
          )}
        </div>
      </Pane>
      <div className="centerize" style={{ background: randomColor() }}>
        {second?.direction ? (
          <Container
            direction={second?.direction}
            first={second?.first}
            second={second?.second}
            setTree={setTree}
          />
        ) : (
          <Control first={first} second={second} setTree={setTree} />
        )}
      </div>
    </SplitPane>
  ) : (
    <Control first={first} second={second} setTree={setTree} />
  );
};

function App() {
  const [tree, setTree] = useState({
    direction: 'vertical',
    first: {
      direction: 'horizontal',
      first: undefined,
      second: {
        direction: 'vertical',
        first: {
          direction: 'horizontal',
          first: {
            direction: 'vertical',
            first: undefined,
            second: undefined,
          },
          second: undefined,
        },
        second: {
          direction: 'horizontal',
          first: undefined,
          second: undefined,
        },
      },
    },
    second: {
      direction: 'vertical',
      first: undefined,
      second: undefined,
    },
  });
  return (
    <div style={{ height: '100vh' }}>
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
