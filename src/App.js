import './App.css';
import './components/Layout/Header/Header';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import {useState} from 'react';

function App() {

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onShowCart={setCartOpen}/>
      <Meals />
      {cartOpen && <Cart onClose={setCartOpen}/>}
    </>
  );
}

export default App;
