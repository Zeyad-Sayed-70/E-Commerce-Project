import React from 'react'
import { Link, useParams } from 'react-router-dom';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const History = () => {
    const productType = useParams();
  return (
    <>
    <div className='history'>
        <div className='container'>
            <Link to='/home'>Home</Link>
            <ArrowRightIcon />
            <Link to='/collection'>Collections</Link>
            <ArrowRightIcon />
            <span>{productType.type}</span>
        </div>
    </div>
    </>
  )
}
