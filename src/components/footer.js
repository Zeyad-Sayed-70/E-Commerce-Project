// import { Button } from 'bootstrap';
import React from 'react'
import { Col, Form, FormControl, InputGroup, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Footer = () => {
    require('../styles/footer.css');
  return (
    <>
    <Links />
    <div className='copyrights text-light py-4 text-center'>
        © 2022, Surprise. Powered by ZeZZo
    </div>
    </>
  )
}

const Links = () => {
    return <>
    <div className='footer bg-dark text-light py-5 text-center text-md-start'>
        <div className='container'>
        <Row>
            <Col xs={12} md={2} className='mb-4'>
                <h4>About us</h4>
                <ul>
                    <li>PO Box 12300 Collins</li>
                    <li>Street, Victoria 9000</li>
                    <li>(+00) 1234 5678 90</li>
                    <li>email@2020.com</li>
                </ul>
            </Col>
            <Col xs={12} md={2} className='mb-4'>
                <h4>Customer</h4>
                <ul>
                    <Link to=''><li>About us</li></Link>
                    <Link to=''><li>Brands</li></Link>
                    <Link to=''><li>Contact us</li></Link>
                    <Link to=''><li>FAQs</li></Link>
                    <Link to=''><li>Search</li></Link>
                </ul>
            </Col>
            <Col xs={12} md={2} className='mb-4'>
                <h4>Product</h4>
                <ul>
                    <Link to=''><li>Orders</li></Link>
                    <Link to=''><li>Downloads</li></Link>
                    <Link to=''><li>Addresses</li></Link>
                    <Link to=''><li>Acount details</li></Link>
                </ul>
            </Col>
            <Col xs={12} md={2} className='mb-4'>
                <h4>My account</h4>
                <ul>
                    <Link to=''><li>The board</li></Link>
                    <Link to=''><li>Accessories</li></Link>
                    <Link to=''><li>FAQs</li></Link>
                    <Link to=''><li>Terms & Conditions</li></Link>
                    <Link to=''><li>Wishlist</li></Link>
                </ul>
            </Col>
            <Col xs={12} md={3}>
                <h4>Subscribe us</h4>
                <label htmlFor='subs'>Promotions, new products and sales. Directly to your inbox.</label>
                
            <InputGroup className="my-3">
                <FormControl
                placeholder="Your email"
                aria-label="Your email"
                aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2" className='text-light'>
                <ArrowForwardIosIcon />
                </Button>
            </InputGroup>
            </Col>
        </Row>
        </div>
    </div>
    </>
};