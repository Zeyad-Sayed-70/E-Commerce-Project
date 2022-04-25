import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Col, Row, Stack} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import {homeContextAPI} from '../App';


export const SideNav = () => {
    
    const homeData = useContext(homeContextAPI);
    const {wishListData, setWishListData} = homeData;

    const [compare, setCompare] = useState(0);
    const [menuToggle, setMenuToggle] = useState(false);

    return (
        <>
        <div className='sidenav-container'>
            <div className='container'>
                <a href='http://localhost:3000/signIn'>
                <div  className='box'>
                    <PersonIcon />
                    <p>Sign In</p>
                </div>
                </a>
                <a href='http://localhost:3000/signUp'>
                <div className='box'>
                    <AccountBalanceIcon />
                    <p>Create Account</p>
                </div >
                </a>
                <Link to='/wishlist'>
                    <div className='box'>
                        <FavoriteIcon />
                        <p>{`Wishlist(${wishListData.length})`}</p>
                    </div >
                </Link>
                <div className='box compare'>
                    <CompareArrowsIcon />
                    <p>{`Compare(${compare})`}</p>
                </div >
                <div className='menu-toggle'>
                    <MenuIcon onClick={() => {setMenuToggle(!menuToggle)}} />
                    <ul className={menuToggle ? 'active' : ''}>
                        <li><Link to='/test'>Home</Link></li>
                        <li><Link to='/test'>Megamenu</Link></li>
                        <li><Link to='/test'>Layouts</Link></li>
                        <li><Link to='/test'>FAQs</Link></li>
                        <li> <Link to='/'> {`Compare(${compare})`} </Link> </li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};


export const Navbar = () => {
    const homeData = useContext(homeContextAPI);
    const {productsData, cartListData, setCartListData, cartListDataIds, setCartListDataIds} = homeData;

    const logoUrl = 'https://cdn.shopify.com/s/files/1/0279/3317/9952/files/1059dc5f-72f3-482a-ae78-5bc92fdbf8e2_200x200_526a4f06-da66-4d40-ac28-205fe1490bc4_175x.png?v=1572850954';

    const [searchToggle, setSearchToggle] = useState(false);

    const removeCartProduct = (ev) => {
        const newCartList = cartListData.filter((e) => {
            return e.id != ev.target.parentElement.id;
        })
        const newCartListIds = cartListDataIds.filter((e) => {
            return e != ev.target.parentElement.id;
        })
        setCartListData(newCartList)
        setCartListDataIds(newCartListIds);
    };

    // Calc Total Price
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let newTotal = 0;
        for ( let x of cartListData ) {
            newTotal += ( parseInt(x.price.slice(1)) * x.amount ); 
        }
        setTotal(newTotal);
    }, [cartListData]);

    const [menuSlideInd, setMenuSlideInd] = useState(0);
    const [isAnimate, setIsAnimate] = useState(false);
    const [animate, setAnimate] = useState('hideEff');

    useEffect(() => {
        setTimeout(() => {setIsAnimate(true)}, 10);
        setIsAnimate(false);
    }, [menuSlideInd])

    return (
    <>
    <nav>
        <div className='container'>
            <div className='logo'><img src={logoUrl} alt='logo' /></div>
            <div className='menu'>
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li>
                        <Link to='/collection'>Megamenu<ArrowDropDownIcon /></Link>
                        <div className='megamenu p-3'>
                            <Row>
                            <Col xs={4}>
                            <div className='featured-product'>
                                <h4 className='fs-5'>Featured Products</h4>
                                <div className='slide d-flex'>
                                    <Col xs={12}>
                                        <div className={`product text-center ${isAnimate ? animate : ''}`}>
                                            <img className='w-100' src={productsData[menuSlideInd].img} alt={productsData[menuSlideInd].name} />
                                            <p className='my-2'>{productsData[menuSlideInd].name}</p>
                                            <span className='fw-bold'>{productsData[menuSlideInd].price}</span>
                                        </div>
                                    </Col>
                                    <span className='arrow arrowLeft d-block' onClick={() => {
                                        if ( menuSlideInd > 0) setMenuSlideInd(menuSlideInd - 1)
                                        else setMenuSlideInd(productsData.length-1)
                                        }}><ArrowCircleLeftIcon /></span>
                                    <span className='arrow arrowLRight d-block' onClick={() => {
                                        if ( menuSlideInd < productsData.length-1 ) setMenuSlideInd(menuSlideInd + 1)
                                        else setMenuSlideInd(0)
                                    }}><ArrowCircleRightIcon /></span>
                                </div>
                            </div>
                            </Col>
                            <Col xs={8} className='info'>
                                <h4>Shopify theme version 4.0</h4>
                                <p>With our new framework, 2020 is also equipped with excellent functionalities to richen user’s online shopping experience, which Shopify user cannot find in Shopify default:</p>
                                <ul className='d-flex flex-column text-start p-0 m-0 gap-1'>
                                    <li>HTML builder</li>
                                    <li>Free version</li>
                                    <li>Shopify section ready, Drag & drop</li>
                                    <li>Fast performance</li>
                                    <li>Ajax search, Ajax filter</li>
                                    <li>Cross-selling, Upsell</li>
                                    <li>Free shipping</li>
                                    <li>Multi header and footer</li>
                                    <li>Right to left</li>
                                    <li>Multi currencies</li>
                                    <li>Megamenu</li>
                                    <li>add more...</li>
                                </ul>
                            </Col>
                            </Row>
                        </div>
                    </li>
                    <li>
                        <Link to='/home'>Layouts<ArrowDropDownIcon /></Link>
                        <div className='normalmenu'>
                            <ul>
                                <li><Link to='/test'>List collection</Link></li>
                                <li><Link to='/test'>Collection</Link></li>
                                <li><Link to='/test'>Product</Link></li>
                                <li><Link to='/test'>Blog</Link></li>
                                <li><Link to='/test'>Blog post</Link></li>
                                <li><Link to='/test'>Cart</Link></li>
                                <li><Link to='/test'>Contact us</Link></li>
                                <li><Link to='/test'>FAQs</Link></li>
                                <li><Link to='/test'>Withlist</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li><Link to='/test'>FAQs</Link></li>
                </ul>
            </div>
            <div className='menutools'>
                <div className='search'>
                    <SearchIcon onClick={() => {setSearchToggle(!searchToggle)}} />
                    <div className={searchToggle ? 'searchmenu' : ''}>
                        <input type='text' placeholder='Search...' />
                    </div>
                </div>
                <div className='cart'>
                    <span className='amount'>{cartListData.length}</span>
                    <Link to='/cartlist'>
                    <ShoppingCartIcon />
                    </Link>
                    <div className='cartmenu'>
                        {cartListData.map((e) => {
                            return <div key={e.id} className='cartProduct d-flex justify-content-between align-items-center gap-1 my-2 px-3'>
                                <img src={e.img} alt={e.name} />
                                <div className='info'>
                                    <p className='m-0'>{e.name}</p>
                                    <p className='m-0'>{e.price} x<strong>{e.amount}</strong></p>
                                </div>
                                <span id={e.id} className='remove' style={{cursor: 'pointer'}}><CloseIcon onClick={(ev) => {removeCartProduct(ev)}} /></span>
                            </div>
                        })}
                        {cartListData.length === 0 ? 'Your cart is currently empty.': ''}
                        <div className='total mt-3'>
                            <span>Total: <strong>${total.toFixed(2)}</strong></span>
                            <div className='buttons my-3'>
                                <Row>
                                    <Col xs={6} className='pe-1'>
                                        <Link to='/cartlist'> <Button variant='outline-dark' className='primary w-100 py-2'>Update Cart</Button> </Link>
                                    </Col>
                                    <Col xs={6} className='ps-1'>
                                         <Button as='a' href='http://localhost:3000/checkout' disabled={cartListData.length === 0} variant='dark' className='w-100 py-2'><FactCheckIcon /> Check Out</Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    </>
    );
};
