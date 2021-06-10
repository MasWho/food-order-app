import './App.css';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartContextProvider from './store/CartContextProvider';
import {useState} from 'react';

function App() {

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <CartContextProvider>
        <Header onShowCart={setCartOpen}/>
        <Meals />
        {cartOpen && <Cart onClose={setCartOpen}/>}
      </CartContextProvider>
    </>
  );
}

export default App;
