import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import {homeContextAPI} from '../App';

import Spinner from 'react-bootstrap/Spinner'

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Col, Row, Button, Form, FloatingLabel } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


export const Cartlist = () => {
    require('../styles/cartlist.css');
    const {cartListData, cartListDataIds, setCartListData, setCartListDataIds} = useContext(homeContextAPI);
    
    const decreaseAmount = (element) => {
        if ( element.amount !== 1 ) {
            element.amount = (element.amount - 1);
            const newCartList = cartListData.map((e) => {
                if ( e.id === element.id ) {
                    return element;
                }
                return e;
            });
            setCartListData(newCartList);
        }
    };
    
    const increaseAmount = (element) => {
        if ( element.amount <= 64 ) {
            element.amount = (element.amount + 1);
            const newCartList = cartListData.map((e) => {
                if ( e.id === element.id ) {
                    return element;
                }
                return e;
            });
            setCartListData(newCartList);
        }
    };

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
    
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let newTotal = 0;
        for ( let x of cartListData ) {
            newTotal += ( parseInt(x.price.slice(1)) * x.amount ); 
        }
        setTotal(newTotal);
    }, [cartListData]);


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {setIsLoading(false)}, 300);
        
    }, []);


  return (
    <>
    {isLoading && <div className='loading'><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>}

    <div className='history'>
        <div className='container'>
            <Link to='/home'>Home</Link>
            <ArrowRightIcon />
            <span>Cart List</span>
        </div>
    </div>
    <div className='cart py-5'>
        <div className='container'>
            <h1 className='text-center fs-2 my-5'>Shopping Cart</h1>
            <div className='products'>
                {cartListData.length === 0 ?
                <div className='text-center'> <p className='mb-4'>Your cart is currently empty.</p> <Link to='/' ><Button variant='dark'>Continue Shopping</Button> </Link> </div> 
                : ''}
                {cartListData.map((e) => {
                    return <div key={e.id} className='product'>
                        <Row className='d-flex justify-content-between align-items-center flex-column flex-md-row text-center text-md-start gap-4'>
                            <Col xs={2}>
                                <img className='w-100' src={e.img} alt={e.name} />
                            </Col>
                            <Col>
                                <div>
                                    <h4>{e.name}</h4>
                                    <span id={e.id} className='remove'><span style={{cursor: 'pointer'}} onClick={(ev) => {removeCartProduct(ev)}}>Remove</span></span>
                                </div>
                            </Col>
                            <Col>
                                <div className='amount justify-content-md-end '>
                                    <button  onClick={() => {decreaseAmount(e)} }>-</button>
                                    <span>{e.amount}</span>
                                    <button  onClick={() => {increaseAmount(e)} }>+</button>
                                </div>
                            </Col>
                            <Col xs={2}>
                                <span className='text-md-end d-block'>{e.price}</span>
                            </Col>
                        </Row>
                        <hr />
                    </div>
                })}
            </div>
            { cartListData.length !== 0 ?
            <div className='checkout my-5'>
                <Row className='flex-column flex-md-row text-center text-md-start'>
                    <Col xs={12} md={6} className='mb-5'>
                        <div className='feedback'>
                        <label htmlFor='feedback' className='mb-1'>Special instructions for seller</label>
                          <FloatingLabel controlId="floatingTextarea2" label="FeedBack">
                            <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '200px' }}
                            />
                        </FloatingLabel>
                        </div>
                    </Col>
                    <Col xs={12} md={6} className='text-center text-md-end'>
                        <h4>${total.toFixed(2)}</h4>
                        <p>Taxes and shipping calculated at checkout</p>
                        <a href='http://localhost:3000/checkout'> <Button variant='dark' >Check Out</Button> </a>
                    </Col>
                </Row>
            </div>
            : '' }
        </div>
    </div>
    </>
  )
}
