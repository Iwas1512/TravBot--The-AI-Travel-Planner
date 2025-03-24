import React from 'react'
import { Button } from '../button'
import {Link} from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] text-center mt-16'>

           <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span><br/> Personalized just for you
        </h1>
        <p className='text-xl text-gray-500 text-center'>Your Very Own Personal Trip Planner</p>
        
        <Link to ={'/create-trip'}>
        <Button>Get Started Here</Button>
        </Link>
        
        </div>
  )
}

export default Hero