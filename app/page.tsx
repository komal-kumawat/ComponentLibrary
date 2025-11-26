import Navbar from '@/app/component/components/Navbar'
import Link from 'next/link'
import React from 'react'
import next from "../Icons/Nextjs.svg"
import reactIcon from "../Icons/React.svg";
import motion from "../Icons/Motion.svg";
import shadcn from "../Icons/shadcn.svg";
import Image from 'next/image';
import tailwind from "../Icons/tailwindcss.svg"

const page = () => {
  return (
    <div>
      <Navbar />
      <div className=' font-bold flex flex-col items-center justify-center h-[100vh] w-full'>
        <h1 className='text-6xl m-8 text-gray-300'>Build Higher With ElevateUI</h1>
        <p className='text-xl text-gray-500 '>Craft unique, polished interfaces.
          A library created to lift your workflow.</p>
        <div className='flex items-center justify-center m-5'>
          <Link href="/component/button">
            <button className='bg-gray-200 p-2 text-gray-900 rounded-md m-5'>
              browse components
            </button>
          </Link>
          <Link href="/docs">
            <button className='bg-blue-600 p-2 text-gray-300 rounded-md m-5'>
              Documentation
            </button>
          </Link>
        </div>
        <div className='flex gap-8 items-center justify-center'>
          <div className='flex flex-col items-center justify-center gap-1'>
            <Link href="">
              <Image src={next} width={40} alt='next'></Image>
            </Link>
            <span>Next</span>
          </div>


          <div className='flex flex-col items-center justify-center gap-1'>
            <Link href="">
              <Image src={tailwind} width={40} alt='next' className='m-2'></Image>
            </Link>
            <span>TailwindCSS</span>
          </div>

          <div className='flex flex-col items-center justify-center gap-1'>
            <Link href="">
              <Image src={motion} width={40} alt='next' className='bg-yellow-400 rounded-4xl p-1'></Image>
            </Link>
            <span>Motion</span>
          </div>

          <div className='flex flex-col items-center justify-center gap-1'>
            <Link href="">
              <Image src={shadcn} width={40} alt='next' ></Image>
            </Link>
            <span>shadcn/ui</span>
          </div>

          <div className='flex flex-col items-center justify-center gap-1'>
            <Link href="">
              <Image src={reactIcon} width={40} alt='next'></Image>
            </Link>
            <span>React</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page
