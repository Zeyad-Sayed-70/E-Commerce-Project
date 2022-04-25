import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {productType} from './home';
import {homeContextAPI} from '../App';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Col, Row } from 'react-bootstrap';

import Spinner from 'react-bootstrap/Spinner'

export const Collection = () => {
    require('../styles/collection.css');
    const {productsData} = useContext(homeContextAPI);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {setIsLoading(false)}, 750);
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
            <span>Collections</span>
        </div>
    </div>
    {/* History */}

    <h1 className='title mt-5'>Collections</h1>
    <div className='collections'>
        <div className='container'>
                {productType.map((e, i) => {
                    return  <Row key={i} xs={12} className='collection'>
                        <Col xs={12} md={3} className='parent p-0'>
                            <Link key={i} to={`/collection/${e.title}`}>
                                <img src={e.img} alt={e.title}/>
                                <span className='collectionTitle'>{e.title}</span>
                                <span className='collectionAmount'>{e.numOfProducts}</span>
                            </Link>
                        </Col>
                        {productsData.filter((el) => (el.type).toLowerCase() === (e.title).toLowerCase()  ).map((ele, i) => {
                            if ( i < 3 ) {
                                return <Col key={ele.id} xs={3} className='child p-0'>
                                    <img src={ele.img} alt={ele.title}/>
                                </Col>
                            }
                        })}
                    </Row>
                })}
        </div>
    </div>
    </>
  )
}
