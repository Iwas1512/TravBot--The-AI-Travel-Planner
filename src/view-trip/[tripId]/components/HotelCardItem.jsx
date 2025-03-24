import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

function HotelCardItem({hotel}) {
    const [photoUrl,setPhotoUrl] =useState();
        useEffect(()=>{
            hotel&&GetPlacePhoto();
    
        },[hotel])
        const GetPlacePhoto =async()=>{
            const data={
                textQuery:hotel?.hotelName
            }
            const result =await GetPlaceDetails(data).then(resp=>{
                console.log(resp.data.places[0].photos[3].name)
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[4].name);
                setPhotoUrl(PhotoUrl);
            })
        }
  return (
     <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target='_blank'> 
                    <div className='hover:scale-105 transition-all cursor-pointer'>
                        <img src ={photoUrl} className='rounded-lg h-[200px]'/>
    
                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-medium'>{hotel?.hotelName}</h2>
                            <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                            <h2 className='text-sm text-green-900'>💰{hotel?.price}</h2>
                            <h2 className='text-sm text-yellow-600'>⭐{hotel?.rating}</h2>
    
                        </div>
    
    
                    </div>
                    </Link>
  )
}

export default HotelCardItem