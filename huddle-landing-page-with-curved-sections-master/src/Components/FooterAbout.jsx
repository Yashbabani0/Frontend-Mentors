import React from 'react';
import logo from '../../public/footer-logo.svg';
import phone from '../../public/icon-phone.svg';
import email from '../../public/icon-email.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';

export default function FooterAbout() {
  return (
    <div className='w-full h-[25em] md:pl-[4em] bg-veryDarkCyan p-[2em] text-veryPaleBlue'>
      <img src={logo} alt="Footer Logo" className='pb-[2em]' />
      <p className='text-veryPaleBlue leading-8 md:w-[30%]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nulla quam, hendrerit lacinia vestibulum a, ultrices quis sem.
      </p>
      <a href="#" className='flex gap-[1em] mt-[1em]'>
        <img src={phone} alt="Phone Icon" />
        Phone: +1-543-123-4567
      </a>
      <a href="#" className='flex gap-[1em] mt-[1em]'>
        <img src={email} alt="Email Icon" />
        example@company.com
      </a>
      <div className="icon flex gap-[1em] mt-[3em]">
        <a href="#" className='text-veryPaleBlue'>
          <FontAwesomeIcon icon={faSquareFacebook} size="2x" />
        </a>
        <a href="#" className='text-veryPaleBlue'>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="#" className='text-veryPaleBlue'>
          <FontAwesomeIcon icon={faSquareTwitter} size="2x" />
        </a>
      </div>
    </div>
  );
}
