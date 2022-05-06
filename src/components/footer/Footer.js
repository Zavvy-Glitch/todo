import React from 'react';
import { useState } from 'react';

const Footer = () => {

  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    setShow(!show);
  }

  return (
    <footer>
    <p onClick={handleClick} id="me">PPPPPPP</p>
    <p className={show ? 'showPath' : 'hidden'}>PPPPPPPPPPPP</p>
    <div id='PPPP'>
      <a href='PPPP'>PPPPPP</a>
      <a href='PPPP'>PPPPPPP</a>
    </div>
  </footer>
  )
}

export default Footer;