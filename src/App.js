import './App.css';

function App() {
  const child = {
    name: 'sakib',
    child: null,
  };
  const data = {
    name: 'salahuddin',
    child: null,
  };
  const onClick = () => {
    data.child = child;
    console.log(data);
  };
  console.log(data);
  return (
    <div className="App" onClick={onClick}>
      Hello
    </div>
  );
}

export default App;
