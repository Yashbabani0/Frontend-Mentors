import React from 'react'
import Footer_logo from '../assets/footer-logo.svg'
import Facebook from '../assets/icon-facebook.svg'
import Instagram from '../assets/icon-instagram.svg'
import Pinterest from '../assets/icon-pinterest.svg'
import Twitter from '../assets/icon-twitter.svg'

export default function Footer() {
  return (
    <div className='z-10 bg-darkModerateCyan h-[22em] flex flex-col items-center justify-center'>
        <div className='pb-10'>
            <img src={Footer_logo} alt="Footer Logo" />
        </div>
        <div className='flex gap-[2em] text-darkDesaturatedCyan font-semibold pb-16'>
            <a href="#" className='hover:text-white transition-colors'>About</a>
            <a href="#" className='hover:text-white transition-colors'>Service</a>
            <a href="#" className='hover:text-white transition-colors'>Projects</a>
        </div>
        <div className='flex items-center justify-center gap-[2em]'>
            <img className='cursor-pointer filter-white-on-hover transition-colors' src={Facebook} alt="Facebook" />
            <img className='cursor-pointer filter-white-on-hover transition-colors' src={Instagram} alt="Instagram" />
            <img className='cursor-pointer filter-white-on-hover transition-colors' src={Pinterest} alt="Pinterest" />
            <img className='cursor-pointer filter-white-on-hover transition-colors' src={Twitter} alt="Twitter" />
        </div>
    </div>
  )
}
