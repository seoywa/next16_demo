'use client'

import Image from 'next/image'
import React from 'react'

const ExploreBtn = () => {
  return (
    <button type='button' id='explore-btn' className='mt-7 mx-auto'  >
      <a href="#events">
        Explore Events
        <Image alt='arrow-down' src={'/icons/arrow-down.svg'} width={24} height={24} />
      </a>
    </button>
  )
}

export default ExploreBtn