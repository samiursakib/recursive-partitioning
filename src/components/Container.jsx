import { useLayoutEffect, useRef, useState } from 'react';
import { randomColor, removeNode } from '../libs/utils';
import SplitPane from 'split-pane-react/esm/SplitPane';
import { Pane } from 'split-pane-react';
import { Control } from './Control';
import * as constant from '../libs/constants';

export const Container = ({ direction, first, second, setTree, path = [] }) => {
  const [sizes, setSizes] = useState(['50%', 'auto']);
  const firstRef = useRef(null);
  const removerRef = useRef(null);
  useLayoutEffect(() => {
    if (firstRef && firstRef.current)
      firstRef.current.style.backgroundColor = randomColor();
  }, []);
  const handleRemoveNode = () => {
    setTree((prev) => removeNode(prev, path));
  };
  return (
    <>
      {direction ? (
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
                top: 10,
                left: 10,
              }}
              onClick={handleRemoveNode}
            >
              -
            </button>
          </Pane>
          <div
            className="centerize"
            style={{
              background: 'inherit',
              [direction === constant.HORIZONTAL ? 'borderTop' : 'borderLeft']:
                '2px solid',
            }}
          >
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
      )}
    </>
  );
};
