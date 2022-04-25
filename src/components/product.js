import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import {homeContextAPI} from '../App';
import {Button, Col, Row, Stack} from 'react-bootstrap';


import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import Spinner from 'react-bootstrap/Spinner'

export const Product = () => {
    require('../styles/product.css');
    const {
        productsData,
        cartListData,
        cartListDataIds,
        setWishListData,
        setCartListData,
        setwishListDataIds,
        setCartListDataIds} = useContext(homeContextAPI);
        
    const product = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    
    const [ownProduct, setOwnProduct] = useState(productsData.find((e) => e.name === product.name));
    const [imgSelector, setImgSelector] = useState(0);
    const [amountOfProduct, setAmountOfProduct] = useState(1);
    const [listInd, setListInd] = useState(0);
    const [isZoom, setIsZoom] = useState(false);
    const [inCart, setInCart] = useState(false);
    const image = useRef();
    
    useEffect(() => {
        cartListData.forEach((e) => {
            if ( e.id === ownProduct.id ) {
                setInCart(true);
            }
        })
    }, [cartListData]);
        
    const zoomEffect = (ev) => {
        const x = Math.max(0, ev.clientX - ev.target.getBoundingClientRect().left);
        const y = Math.max(0, ev.clientY - ev.target.getBoundingClientRect().top);
        image.current.style.transformOrigin = `${x}px ${y}px`;
        image.current.style.transform = `scale(1.5)`;
    };
    
    const addToCart = () => {
        ownProduct.amount = amountOfProduct;
        setCartListData([...cartListData, ownProduct]);
        setCartListDataIds([...cartListDataIds, ownProduct.id])
        setInCart(true);
    };
    
    const removeFromCart = () => {
        setCartListData(cartListData.filter((e) => { return e.id !== ownProduct.id }));
        setCartListDataIds(cartListDataIds.filter((e) => { return e !== ownProduct.id }));
        setInCart(false);
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {setIsLoading(false)}, 600);
    }, []);
    


    return (
    <>
    {isLoading && <div className='loading'><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>}

    <div className='history'>
        <div className='container'>
            <Link to='/home'>Home</Link>
            <ArrowRightIcon />
            <Link to='/collection'>Collections</Link>
            <ArrowRightIcon />
            <Link to={`/collection/${product.type}`}>{product.type}</Link>
            <ArrowRightIcon />
            <span>{product.name}</span>
        </div>
    </div>
        <div className='product-content'>
            <div className='container'>
                <Row>
                    <Col xs={12} lg={6}>
                        <div className='img'>
                            <div className='img-content'>
                                <img className={`${isZoom ? 'opacity-0' : ''}`} style={{cursor: 'zoom-in'}} onClick={() => {setIsZoom(!isZoom)}} src={ownProduct.imgs[imgSelector]} alt={ownProduct.name} />
                                <img className={`zoomImg ${isZoom ? 'active' : ''}`} src={ownProduct.imgs[imgSelector]} alt={ownProduct.name} ref={image} onMouseMove={(ev) => {zoomEffect(ev)}} onMouseLeave={() => {setIsZoom(!isZoom)}} />
                            </div>
                            <div className='imgs'>
                                {ownProduct.imgs.map((e, i) => {return <Col key={i} xs={6} md={4}> <div onClick={() => {setImgSelector(i)}} className={`img ${ i === imgSelector ? 'active' : ''}`}> <img src={e} alt={ownProduct.name} /></div> </Col> })}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className='info'>
                            <div className='header'>
                                <h4>{ownProduct.name}</h4>
                                <span>{ownProduct.price}</span>
                            </div>
                            <hr />
                            <div className='checkout'>
                                <Row>
                                <Col xs={12} md={4} className='mb-3'>
                                    <div className='amount ms-auto me-auto '>
                                        <button disabled={amountOfProduct === 1} onClick={() => {setAmountOfProduct(amountOfProduct - 1)}}>-</button>
                                        <span>{amountOfProduct}</span>
                                        <button disabled={amountOfProduct === 64} onClick={() => {setAmountOfProduct(amountOfProduct + 1)}}>+</button>
                                    </div>
                                </Col>
                                <Col xs={12} md={8}>
                                    <button className='addtocart' onClick={() => {inCart ?  removeFromCart() : addToCart() }}>{ inCart ?  'Remove from Cart' : 'Add to Cart'}</button>
                                </Col>
                                </Row>
                                <Button variant='dark' onClick={() => {!cartListDataIds.includes(ownProduct.id) && addToCart() }} href='http://localhost:3000/checkout' className='buy'>Buy it now</Button>
                            </div>
                            <hr />
                            <div className='product-info'>
                                <p><span>Vendor: </span>{ownProduct.info.vendor}</p>
                                <p><span>Type: </span>{ownProduct.info.type}</p>
                                <p><span>Sku: </span>{ownProduct.info.Sku}</p>
                                <p><span>Available: </span>{ownProduct.info.Available}</p>
                            </div>
                            <hr />
                            <div className='media'>
                                <FacebookIcon />
                                <TwitterIcon />
                                <AlternateEmailIcon />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    <div className='description pt-4 pb-4'>
        <div className='container'>
            <div className='selector'>
                <ul>
                    <li className={`${listInd === 0 ? 'active' : ''}`} onClick={() => {setListInd(0)}}>DESCRIPTION</li>
                    <li className={`${listInd === 1 ? 'active' : ''}`} onClick={() => {setListInd(1)}}>REVIEW</li>
                </ul>
            </div>
            <div className='content p-4'>
                <div className={`desciption-content ${listInd === 0 ? 'active' : ''}`}>
                    <p>{ownProduct.info.description}</p>
                    <ul>
                        {ownProduct?.info?.features.map((e, i) => {
                            return <li key={i}>{e}</li>
                        })}
                    </ul>
                </div>
                <div className={`desciption-content ${listInd === 1 ? 'active' : ''}`}>
                    Not Founded
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
