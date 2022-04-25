import React, {useRef, useState, useEffect, useContext} from 'react'
import { useParams, Link } from 'react-router-dom';
import {Button, Col, Row, Stack} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {homeContextAPI} from '../App';
import {Option} from './home';


import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import Spinner from 'react-bootstrap/Spinner'

export const TypeOfProduct = () => {
    // require('./../styles/typeOfProduct.css');

    const homeData = useContext(homeContextAPI);
    const {productsData, wishListData, wishListDataIds, setwishListDataIds, setWishListData} = homeData;

    const productType = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    
    const [isOpen, setIsOpen] = useState(
        {
            Categories: true,
            Colors: false,
            Sizes: false,
        }
        );
    
    const [isSize, setIsSize] = useState(
        {
            tiny: true,
            small: false,
            medium: false,
            large: false,
            big: false,
        }
        );

    const filterContent = useRef();
    const [isArriveFilter, setIsArriveFilter] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', checkFilterScroll);
        window.addEventListener('resize', checkFilterScroll);
        
        return () => {
            window.removeEventListener('scroll', checkFilterScroll);
            window.removeEventListener('resize', checkFilterScroll);
        }
    })
    

    const checkFilterScroll = () => {
        if ( filterContent.current.offsetTop <= window.scrollY ) {
            setIsArriveFilter(true);
        } else {
            setIsArriveFilter(false);
        }
    }

    const [filterMenu, setFilterMenu] = useState(false);

    let counter = 0;


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {setIsLoading(false)}, 500);
        
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
            <Link to='/collection'>Collections</Link>
            <ArrowRightIcon />
            <span>{productType.type}</span>
        </div>
    </div>
    {/* History */}

    {/* Filters */}
    <div className='types'>
        <div className='container'>
            <div className={`filterBar ${filterMenu ? 'openMenu' : ''}`} ref={filterContent}>
                <div className={`filter-content ${isArriveFilter ? 'active' : ''}`}>
                    <div className={`categories ${isOpen.Categories ? 'active' : ''}`}>
                        <h1 onClick={() => {setIsOpen({...isOpen, Categories: isOpen.Categories ? false : true})}}>Categories <span>{isOpen.Categories ? '-' : '+'}</span></h1>
                        <div className='content'>
                            <ul>
                                <li className={`${productType.type.toLowerCase() === 'desk lamps' ? 'active' : ''}`}><Link to={`/collection/Desk Lamps`}>Desk Lamps</Link></li>
                                <li className={`${productType.type.toLowerCase() === 'living room' ? 'active' : ''}`}><Link to={`/collection/Living room`}>Living Room</Link></li>
                                <li className={`${productType.type.toLowerCase() === 'stools' ? 'active' : ''}`}><Link to={`/collection/Stools`}>Stools</Link></li>
                                <li className={`${productType.type.toLowerCase() === 'table' ? 'active' : ''}`}><Link to={`/collection/Table`}>Table</Link></li>
                                <li className={`${productType.type.toLowerCase() === 'wall sconces' ? 'active' : ''}`}><Link to={`/collection/Wall Sconces`}>Wall Sconces</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={`colors ${isOpen.Colors ? 'active' : ''}`}>
                        <h1 onClick={() => {setIsOpen({...isOpen, Colors: isOpen.Colors ? false : true})}}>Colors <span>{isOpen.Colors ? '-' : '+'}</span></h1>
                        <div className='content'>
                            <ul>
                                <li className='white'></li>
                                <li className='silver'></li>
                                <li className='gray'></li>
                                <li className='black'></li>
                                <li className='red'></li>
                            </ul>
                        </div>
                    </div>
                    <div className={`sizes ${isOpen.Sizes ? 'active' : ''}`}>
                        <h1 onClick={() => {setIsOpen({...isOpen, Sizes: isOpen.Sizes ? false : true})}}>Sizes <span>{isOpen.Sizes ? '-' : '+'}</span></h1>
                        <div className='content'>
                            <ul>
                                <li onClick={() => {setIsSize({...isSize, tiny:  isSize.tiny ? false : true })}}><span className={isSize.tiny ? 'active' : ''}></span>tiny</li>
                                <li onClick={() => {setIsSize({...isSize, small:  isSize.small ? false : true })}}><span className={isSize.small ? 'active' : ''} ></span>small</li>
                                <li onClick={() => {setIsSize({...isSize, medium:  isSize.medium ? false : true })}}><span className={isSize.medium ? 'active' : ''} ></span>medium</li>
                                <li onClick={() => {setIsSize({...isSize, large:  isSize.large ? false : true })}}><span className={isSize.large ? 'active' : ''} ></span>large</li>
                                <li onClick={() => {setIsSize({...isSize, big:  isSize.big ? false : true })}}><span className={isSize.big ? 'active' : ''}></span>big</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        {/* Filters */}

            <div className='types-content'>
                <h1>{productType.type}</h1>
                <div className={`filterMenu  ${filterMenu ? 'active' : ''}`} onClick={() => {setFilterMenu(!filterMenu)}}>
                    <FilterListIcon />
                </div>
                <div className='products mt-5 mb-5'>
                    {productsData.map((e) => {
                        
                        if ( (e.type).toLowerCase() === productType.type.toLowerCase() ){
                            counter = 0;
                            return e;
                        } else {
                            counter++;
                        }
                        
                        if ( counter === productsData.length ) {
                            return 'notFound';
                        }
                
                    }).map((el, i) => {
                        if ( el !== undefined && el !== 'notFound' ) {
                        return <Col key={i} xs={12} md={4} lg={3} className='product'>                        
                        <div>
                            <div className={`fav ${wishListDataIds.includes(el?.id) ? 'active' : ''}`} onClick={() => {
                            if ( !wishListDataIds.includes(el?.id) ) {
                                setWishListData([...wishListData, el]);
                                setwishListDataIds([...wishListDataIds, el?.id]);
                                console.log(wishListDataIds)
                            } else {
                                setWishListData(wishListData.filter((ele) => {
                                    return ele.id !== el?.id;
                                }))
                                setwishListDataIds(wishListDataIds.filter((ele) => {
                                    return ele !== el?.id;
                                }))
                            }
                        }}><FavoriteIcon /></div>
                            <Option  e={el} productData={productsData} />
                            <Link to={`/collection/${el.type}/${el.name}`} >
                                <img src={el?.img} alt={el?.name} />
                                <span>{el?.name}</span>
                            </Link>
                        </div>
                        </Col>
                    } else { return <div key={i}>{el === 'notFound' ? 'Not Founded' : ''}
                    </div>
                    }})}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
