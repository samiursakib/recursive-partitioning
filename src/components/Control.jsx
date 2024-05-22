import { splitNode } from '../libs/utils';
import * as constant from '../libs/constants';

export const Control = ({ setTree, path }) => {
  const splitVertically = () => {
    setTree((prev) => splitNode(prev, path, constant.VERTICAL));
  };
  const splitHorizontally = () => {
    setTree((prev) => splitNode(prev, path, constant.HORIZONTAL));
  };
  return (
    <div className="control centerize gap5px">
      <button onClick={splitVertically}>v</button>
      <button onClick={splitHorizontally}>h</button>
    </div>
  );
};
