import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import './App.css';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

const randomColor = () => {
  const randomChannel = () => Math.floor(Math.random() * 255);
  return `rgb(${randomChannel()},${randomChannel()},${randomChannel()})`;
};

const splitNode = (tree, path, direction) => {
  const newNode = {
    direction,
    first: null,
    second: null,
  };
  if (path.length === 0) return newNode;
  const traverse = (cur, path) => {
    if (path.length === 1) {
      const [pos] = path;
      cur[pos] = newNode;
    } else {
      const [pos, ...rest] = path;
      traverse(cur[pos], rest);
    }
  };
  const newTree = { ...tree };
  traverse(newTree, path);
  return newTree;
};

const removeNode = (tree, path) => {
  if (path.length === 0) return null;
  const traverse = (cur, path) => {
    if (path.length === 1) {
      const [pos] = path;
      cur[pos] = null;
    } else {
      const [pos, ...rest] = path;
      traverse(cur[pos], rest);
    }
  };
  const newTree = { ...tree };
  traverse(newTree, path);
  return newTree;
};

const Control = ({ setTree, path }) => {
  const splitVertically = () => {
    setTree((prev) => splitNode(prev, path, VERTICAL));
  };
  const splitHorizontally = () => {
    setTree((prev) => splitNode(prev, path, HORIZONTAL));
  };
  return (
    <div className="control centerize gap5px">
      <button onClick={splitVertically}>v</button>
      <button onClick={splitHorizontally}>h</button>
    </div>
  );
};

const Container = ({ direction, first, second, setTree, path = [] }) => {
  const [sizes, setSizes] = useState(['50%', 'auto']);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const removerRef = useRef(null);
  useEffect(() => {
    if (firstRef && firstRef.current)
      firstRef.current.style.backgroundColor = randomColor();
    if (secondRef && secondRef.current)
      secondRef.current.style.backgroundColor = randomColor();
  }, []);
  const handleRemoveNode = () => {
    setTree((prev) => removeNode(prev, path));
  };
  return direction ? (
    <SplitPane
      className="container"
      split={direction}
      sizes={sizes}
      onChange={setSizes}
    >
      <Pane minSize="10%" maxSize="90%">
        <div className="centerize" ref={firstRef}>
          {first?.direction ? (
            <Container
              direction={first?.direction}
              first={first?.first}
              second={first?.second}
              setTree={setTree}
              path={[...path, 'first']}
            />
          ) : (
            <Control
              first={first}
              second={second}
              setTree={setTree}
              path={[...path, 'first']}
            />
          )}
        </div>
        <button
          ref={removerRef}
          className="remover"
          style={{
            // [direction === HORIZONTAL ? 'top' : 'left']: `${sizes[0]}`,
            // [direction === VERTICAL ? 'left' : 'top']: `${50}%`,
            top: 10,
            left: 10,
          }}
          onClick={handleRemoveNode}
        >
          -
        </button>
      </Pane>
      <div className="centerize" ref={secondRef}>
        {second?.direction ? (
          <Container
            direction={second?.direction}
            first={second?.first}
            second={second?.second}
            setTree={setTree}
            path={[...path, 'second']}
          />
        ) : (
          <Control
            first={first}
            second={second}
            setTree={setTree}
            path={[...path, 'second']}
          />
        )}
      </div>
    </SplitPane>
  ) : (
    <Control first={first} second={second} setTree={setTree} path={path} />
  );
};

function App() {
  const [tree, setTree] = useState(null);
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
