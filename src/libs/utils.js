export const randomColor = () => {
  const randomChannel = () => Math.floor(Math.random() * 255);
  return `rgb(${randomChannel()},${randomChannel()},${randomChannel()})`;
};

export const splitNode = (tree, path, direction) => {
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

export const removeNode = (tree, path) => {
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
