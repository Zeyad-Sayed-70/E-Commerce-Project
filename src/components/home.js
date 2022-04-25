import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

// Import Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Spinner from 'react-bootstrap/Spinner'

import 'bootstrap/dist/css/bootstrap.min.css';

// Products Data
import {homeContextAPI} from '../App';
import { Col, Row } from 'react-bootstrap';

export const Home = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {setIsLoading(false)}, 500);
        
    }, []);

  return (
      <>
        {isLoading && <div className='loading'><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span>
        </Spinner></div>}
        <SliderImg />
        <ShowImg />
        <TrendSlider />
        <StackProducts />
        <Collection />
        <Featured />
        <Brands />
      </>
  )
}



const sliderImgData = [{
    id: 1,
    img_url: 'https://cdn.shopify.com/s/files/1/0279/3317/9952/files/home2-slide1.jpg?v=1572848845',
    info: {
        header: 'Furniture Life',
        para: 'Learning is cool, but knowing is better, and I know the key to success',
        button_text: 'View More',
    }
},
{
    id: 2,
    img_url: 'https://cdn.shopify.com/s/files/1/0279/3317/9952/files/home2-slide2.jpg?v=1572848853',
    info: {
        header: 'Summer Sale',
        para: 'Learning is cool, but knowing is better, and I know the key to success',
        button_text: 'Shop now',
    }
}];

const SliderImg = () => {
    const [slideData, setSlideData] = useState(sliderImgData);
    const [page, setPage] = useState(0);
    const [hSize, setHSize] = useState(0);
    const sliderViewer = useRef();

    useEffect(() => {
        setHSize(sliderViewer.current?.offsetWidth);
        window.addEventListener('resize', resizeHeight);
        return () => {
            return window.removeEventListener('resize', resizeHeight);
        }
    }, [sliderViewer])
    
    const resizeHeight = () => {
        if ( hSize < 1300 ) {
            setHSize(sliderViewer.current?.offsetWidth);
        }
    }
    return (
    <>
        <div className='sliderimg' ref={sliderViewer} style={{backgroundImage: `url(${slideData[page]?.img_url})`, height: (hSize/2) }}>
            <span className='switcher switcher-left' onClick={() => {
                if ( page - 1 >= 0 ) setPage(page - 1);
                else setPage(slideData.length-1);
            }}><ArrowBackIosIcon /></span>
            <div className='container'>
                <div className='info'>
                    <h1>{slideData[page]?.info?.header}</h1>
                    <p>{slideData[page]?.info?.para}</p>
                    <button className='main-btn'>{slideData[page]?.info?.button_text} <ArrowRightAltIcon /></button>
                </div>
            </div>
            <span className='switcher switcher-right' onClick={() => {
                if ( page + 1 < slideData.length ) setPage(page + 1);
                else setPage(0);
            }}><ArrowForwardIosIcon /></span>
            <div className='penigation'>
                {slideData.map((e, ind) => {
                    return <span key={ind} className={ind === page ? 'active' : ''} onClick={() => {
                        setPage(ind);
                    }}></span>
                })}
            </div>
        </div>
    </>
    );
};

const ShowImg = () => {
    const imgs = [
        '//cdn.shopify.com/s/files/1/0279/3317/9952/files/bn1_1920x_80b92f0d-c631-4049-b3e0-09ae9df0039b_1920x.jpg?v=1572848933',
        '//cdn.shopify.com/s/files/1/0279/3317/9952/files/bn3_1920x_1920x_a6e58bb4-329a-447f-aef3-665f98dc8559_1920x.jpg?v=1572848927',
        '//cdn.shopify.com/s/files/1/0279/3317/9952/files/bn2_1920x_1920x_4cfc4926-3b15-414f-8a16-357f522ff366_1920x.jpg?v=1572848927',
    ];

    return (
        <>
        <div className='showimg'>
            <div className='box'><img src={imgs[0]} alt='img-1' /></div>
            <div className='box'><img src={imgs[1]} alt='img-2' /></div>
            <div className='box'><img src={imgs[2]} alt='img-3' /></div>
        </div>
        </>
    );
};


const TrendSlider = () => {
    const homeData = useContext(homeContextAPI);
    const {productsData, wishListData, wishListDataIds, setwishListDataIds, setWishListData} = homeData;
    const trendSlisder = useRef();

    return (
        <>
        <div className='trendslider'>
            <h1 className='title'>Trending</h1>
            <span className='switcher switcher-left' onClick={() => {
                trendSlisder.current.scrollBy({top: 0, left: -500, behavior: 'smooth'})
            }}><ArrowBackIosIcon /></span>
            <div className='container' ref={trendSlisder}>
                <div className='slider'>
                    <Row className='flex-nowrap'>
                    {productsData.map((e) => {
                        return <Col key={e.id} className='box' xs={12} md={4}> <div>
                            <div className={`fav ${wishListDataIds.includes(e.id) ? 'active' : ''}`} onClick={() => {                                
                                if ( !wishListDataIds.includes(e.id) ) {
                                    setWishListData([...wishListData, e]);
                                    setwishListDataIds([...wishListDataIds, e.id]);                                    
                                } else {
                                    setWishListData(wishListData.filter((el) => {
                                        return el.id !== e.id;
                                    }))
                                    setwishListDataIds(wishListDataIds.filter((el) => {
                                        return el !== e.id;
                                    }))
                                }
                            }}><FavoriteIcon /></div>
                            <Option e={e} />
                            <Link to={`/collection/${e.type}/${e.name}`}>
                            <div className='h-100'><img className='mb-3' src={e.img} alt={e.name} /> </div>
                            </Link>
                            <p className='m-0'>{e.name}</p>
                            <span className='fw-bold'>{e.price}</span>
                        </div>
                        </Col>
                    })}
                    </Row>
                </div>
            </div>
                <span className='switcher switcher-right' onClick={() => {
                    trendSlisder.current.scrollBy({top: 0, left: 500, behavior: 'smooth'})
                }}><ArrowForwardIosIcon /></span>
        </div>
        </>
    );
};

export const Option = ({e}) => {
    const homeData = useContext(homeContextAPI);
    const {cartListData ,setCartListData, cartListDataIds, setCartListDataIds} = homeData;

    return (
        <>
        <div className={`option ${cartListDataIds.includes(e?.id) ? 'active' : ''}`}>
            <span onClick={() => {
                if ( !cartListDataIds.includes(e.id) ) {
                    const newProduct = {...e, amount: 1};
                    console.log(newProduct)
                    setCartListData([...cartListData, newProduct]);
                    setCartListDataIds([...cartListDataIds, newProduct.id]);
                } else {
                    setCartListData(cartListData.filter((el) => {
                        return el.id !== e.id;
                    }))
                    setCartListDataIds(cartListDataIds.filter((el) => {
                        return el !== e.id;
                    }))
                }
            }
            }><ShoppingBagIcon /></span>
            <span><VisibilityIcon /></span>
            <span><CompareArrowsIcon /></span>
        </div>
        </>
    );
};

export const productType = [{
    id: 1,
    img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/cate1_600x_c154764e-f0e9-4166-a065-ee25a91b214b_600x.jpg?v=1572850149',
    title: 'Stools',
    numOfProducts: 16,
},
{
    id: 2,
    img: '//cdn.shopify.com/s/files/1/0279/3317/9952/products/the-best-is-yet-to-come-framed-poster_1296x.jpg?v=1572849324 1296w',
    title: 'Desk Lamps',
    numOfProducts: 16,
},
{
    id: 3,
    img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/cate3_600x_600x_90afc793-1e28-430a-bd8f-f3d7713f96a7_600x.jpg?v=1572850149',
    title: 'Table',
    numOfProducts: 16,
},
{
    id: 4,
    img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/cate4_600x_600x_596a67f0-e6ed-4d93-ba8d-56c1fa1cd2fb_600x.jpg?v=1572850155',
    title: 'Wall Sconces',
    numOfProducts: 16,
},
{
    id: 5,
    img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/cate5_600x_d4736af8-92be-41b9-8a23-5bfde96eddbe_600x.jpg?v=1572850149',
    title: 'Living room',
    numOfProducts: 16,
}];

const StackProducts = () => {

    return (
        <>
        <div className='stack_pro'>
            <h1 className='title'>Product Types</h1>
            <div className='container'>
                {productType.map((e) => {
                    return <Col key={e.id} xs={6} md={3} className='box ps-2 pe-2 mb-4'> <div>
                        <Link to={`/collection/${e.title}`}>
                        <img src={e.img} alt={e.title} />
                        </Link>
                        <h4 className='mt-3'>{e.title}</h4>
                        <span>{e.numOfProducts} products</span>
                    </div>
                    </Col>
                })}
            </div>
        </div>
        </>
    );
};

const collection = [{
    id: 1,
    img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/book-2_1500x_1920x_a73fcfc8-9c96-4eac-bcba-def38cf3eb4a_1920x.jpg?v=1572849456',
    pathName: 'collection',
},
{
    id: 2,
    img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/book-3_1500x_1920x_f34c8d9a-8d0e-4192-8412-f4dc15014a73_1920x.jpg?v=1572849456',
    pathName: 'collection',
},
{
    id: 3,
    img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/book-1_1500x_1920x_f67e497b-5b84-416e-bfdf-c488906e4746_1920x.jpg?v=1572849456',
    pathName: 'collection',
}];

const Collection = () => {

    return (
        <>
        <div className='collection'>
            <h1 className='title'>Collections</h1>
            <div className='container'>
                {collection.map((e) => {
                    return <div key={e.id} className='box'>
                        <Link to={`/${e.pathName}`}><img src={e.img} alt='collection' /></Link>
                    </div>
                })}
            </div>
        </div>
        </>
    );
};

const Featured = () => {
    const homeData = useContext(homeContextAPI);
    const {productsData, wishListData, wishListDataIds, setwishListDataIds, setWishListData} = homeData;

    const [type, setType] = useState('all');

    return (
        <>
        <div className='featured'>
            <div className='container'>
                <h1 className='title'>Featured Products</h1>
                <div className='filters'>
                    <ul>
                        <li className={type === 'all' ? 'active' : ''} onClick={() => {setType('all')}}>
                            All
                        </li>
                        <li className={type === 'wall sconces' ? 'active' : ''} onClick={() => {setType('wall sconces')}}>
                            Wall Sconces
                        </li>
                        <li className={type === 'desk lamps' ? 'active' : ''} onClick={() => {setType('desk lamps')}}>
                            Desk Lamps
                        </li>
                        <li className={type === 'living room' ? 'active' : ''} onClick={() => {setType('living room')}}>
                            Living room
                        </li>
                    </ul>
                    <div className='products w-100'>
                            {productsData.filter((e) => {if ( type === 'all' ) return e; if ( e.type === type ) return e}).map((el) => {
                                return  <Col key={el.id} xs={12} md={4} className='product ps-2 pe-2 mb-5' > <div>
                                    <div className={`fav ${wishListDataIds.includes(el.id) ? 'active' : ''}`} onClick={() => {
                                    if ( !wishListDataIds.includes(el.id) ) {
                                        setWishListData([...wishListData, el]);
                                        setwishListDataIds([...wishListDataIds, el.id]);
                                    } else {
                                        setWishListData(wishListData.filter((ele) => {
                                            return ele.id !== el.id;
                                        }))
                                        setwishListDataIds(wishListDataIds.filter((ele) => {
                                            return ele !== el.id;
                                        }))
                                    }
                                }}><FavoriteIcon /></div>
                                    <Option  e={el} productData={productsData} />
                                    <Link  to={`/collection/${el.type}/${el.name}`} > 
                                        <img src={el.img} alt={el.name} className='mb-3' />
                                        <p className='m-0'>{el.name}</p>
                                        <span>{el.price}</span>
                                    </Link>
                                </div>
                                </Col>
                            })}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

const brand = [
    {
        img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/brand5_400x_90138ee3-1d0a-4214-a65e-ddeb32198260_400x.jpg?v=1572849456',
        brand: 'smith'
    },
    {
        img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/brand4_400x_2934b3ee-74a3-4f2d-b219-e68ae07292cb_400x.jpg?v=1572849456',
        brand: 'salomon'
    },
    {
        img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/brand3_400x_7218ac9c-0bd5-4d2e-8bfd-74e83e4d61e0_400x.jpg?v=1572849456',
        brand: 'kids'
    },
    {
        img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/brand6_400x_6017f1f4-9972-4e4b-90cc-7eb016a059ca_400x.jpg?v=1572849455',
        brand: 'bear'
    },
    {
        img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/brand5_400x_90138ee3-1d0a-4214-a65e-ddeb32198260_400x.jpg?v=1572849456',
        brand: 'smith'
    },
    {
        img: '//cdn.shopify.com/s/files/1/0279/3317/9952/files/brand4_400x_2934b3ee-74a3-4f2d-b219-e68ae07292cb_400x.jpg?v=1572849456',
        brand: 'salomon'
    },
];

const Brands = () => {
    return <>
    <div className='container'>
    <Row className='flex-wrap'>
        {brand.map((e, i) => {
            return <Col className='p-0' key={i} xs={4} lg={2}><img className='w-100' src={e.img} alt={e.brand} /></Col>
        })}
    </Row>
    </div>
    </>
};