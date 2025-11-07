"use client";

import PodcastCard from '@/components/PodcastCard'
import { podcastData } from '@/constants'
import React from 'react'

const Home = () => {
  
  return (
    <div className='mt-10 flex flex-col gap-10'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcast</h1>

        <div className='podcast_grid'>
          {podcastData.map(({
            id,
            title,
            description,
            imgURL,
          }) => (
            <PodcastCard
              key={id}
              imgUrl={imgURL}
              title={title}
              description={description}
              podcastId={id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home