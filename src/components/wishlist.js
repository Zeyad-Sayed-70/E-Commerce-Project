import React, { useContext, useEffect, useState } from 'react';
import {Col, Row} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import {homeContextAPI} from '../App';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

import Spinner from 'react-bootstrap/Spinner'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/wishlist.css';

export const Wishlist = () => {
    const {wishListData, setWishListData, wishListDataIds, setwishListDataIds} = useContext(homeContextAPI);

    const removeWishProduct = (ev) => {
        console.log(wishListDataIds)
        const newWishList = wishListData.filter((e) => {
            return e.id != ev.target.parentElement.id;
        })
        const newWishListIds = wishListDataIds.filter((e) => {
            return e != ev.target.parentElement.id;
        })
        setWishListData(newWishList)
        setwishListDataIds(newWishListIds);
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {setIsLoading(false)}, 300);
        
    }, []);


  return (
      <>
    {isLoading && <div className='loading'><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span>
            </Spinner></div>}
    {/* History */}
    <div className='history'>
        <div className='container'>
            <Link to='/home'>Home</Link>
            <ArrowRightIcon />
            <span>Wish List</span>
        </div>
    </div>
    {/* History */}

    {/* Wishlsit */}
      <div className='wishlist py-5'>
        <div className='container'>
            <h1 className='text-center mt-3 mb-5'>Wish List</h1>
                {wishListData.length === 0 ? <p className='text-center'>Wish List is Empty</p> : ''}
            <div className='products d-flex flex-wrap'>
                {/* Map Each Product */}
                {wishListData.map((e) => {
                return <Col key={e.id} xs={12} md={4} lg={3} > <div className='box px-2 my-3'> 
                        <Link to={`/collection/${e.type}/${e.name}`}>
                            <img className='w-100' src={e.img} alt={e.name} />
                            <h4 className='my-2'>{e.name}</h4>
                            <span>{e.price}</span>
                        </Link>
                            <span id={e.id} onClick={(ev) => {removeWishProduct(ev)}} className='remove'><CloseIcon /></span>
                    </div>
                </Col>
                })}
            </div>
        </div>
      </div>
    {/* Wishlsit */}
      </>
  )
}
