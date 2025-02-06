import React, { useEffect, useState } from 'react';
import profilePic from "./media/userProfileImage/profilePic.jpg"

import { createClient } from '@supabase/supabase-js';
import IconComponent from './components/icon/IconComponent';


const getData = async () => {
  const projectUrl = process.env.REACT_APP_projectUrl
  const projectKey = process.env.REACT_APP_supabaseKey

  const supabase = createClient(projectUrl, projectKey)

  const { data} = await supabase
    .from("links")
    .select()

  return data
}

const App = () => {

  const [isLoading, setIsLoading] = useState (true)
  const [links, setLinks] = useState([])

  useEffect( () => {
    getData().then(data => {
      setLinks(data)
      setIsLoading(false)
    })
  },[])

  if (isLoading) {
    return <div className='flex flex-col h-full items-center justify-center bg-gray-200 text-gray-700'>
      <h1 className='text-7xl'>
        Loading ...
      </h1>
    </div>
  }

  return (
    <div className="flex flex-col h-full items-center justify-center bg-gray-200 text-gray-700">
      <div className="flex flex-col items-center jus">
        <img
          alt='profilePic'
          srcSet={profilePic}
          className='w-20 h-20 mb-3 rounded-full'
        />

        <ul className='flex flex-col w-full'>
          {
            links.map((link, index) => {
              return (
                <li key={index} className='cursor-pointer m-2 py-3 px-10 border-2 border-black text-sm md:text-lg'>
                  <a href={link.url} className='flex items-center' target='_blank' rel='noreferrer'>
                    <IconComponent color="black" iconName={link.icon} /> <p className='ml-5'>{link.title}</p>
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  ); 
}

export default App;
