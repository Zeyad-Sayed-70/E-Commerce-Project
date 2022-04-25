import React, {useState, createContext, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import './styles/home.css';
import './styles/typeOfProduct.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Imports Components
import {Home} from './components/home';
import {SideNav, Navbar} from './components/nav';
import {TypeOfProduct} from './components/TypeOfProduct';
import {Collection} from './components/collection';
import {Product} from './components/product';
import { Wishlist } from './components/wishlist';
import { Cartlist } from './components/cartlist';
import { SignUp } from './components/signUp';
import { SignIn } from './components/signIn';
import { Checkout } from './components/checkout/checkout';
import { Footer } from './components/footer';

import {products,withList,cartList,withListIds,cartListIds} from './productsData';
export const homeContextAPI = createContext();


const App = () => {

    const [productsData, setProductsData] = useState(products);
    const [wishListData, setWishListData] = useState(withList);
    const [cartListData, setCartListData] = useState(cartList);
    const [wishListDataIds, setwishListDataIds] = useState(withListIds);
    const [cartListDataIds, setCartListDataIds] = useState(cartListIds);

    // Save Datas In Local Storage
    localStorage.setItem('productData', JSON.stringify(productsData));
    localStorage.setItem('wishListData', JSON.stringify(wishListData));
    localStorage.setItem('cartListData', JSON.stringify(cartListData));
    localStorage.setItem('wishListDataIds', JSON.stringify(wishListDataIds));
    localStorage.setItem('cartListDataIds', JSON.stringify(cartListDataIds));


  return (
  <Router>
    <homeContextAPI.Provider value={
          {productsData,
           wishListData, 
           cartListData, 
           wishListDataIds, 
           cartListDataIds, 
           setProductsData, 
           setWishListData, 
           setCartListData, 
           setwishListDataIds, 
           setCartListDataIds,
           }}>
    <SideNav />
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/cartlist' element={<Cartlist />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/collection/:type' element={<TypeOfProduct />} />
      <Route path='/collection/:type/:name' element={<Product />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/SignIn' element={<SignIn />} />
      <Route path='/checkout' element={<Checkout />} />
    </Routes>
    <Footer />
    </homeContextAPI.Provider>
  </Router>
  );
}

export default App;
