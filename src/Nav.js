import React, { useState, useEffect } from 'react';

import './Nav.css';

function Nav() {
	const [show, handleShow] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) {
				handleShow(true);
			} else handleShow(false);
		});
		return () => {
			window.removeEventListener('scroll');
		};
	}, []);

	return (
		<div className={`nav ${show && 'nav__black'}`}>
			<img
				className='nav__logo'
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
				alt='Netflix Logo'
			/>
			<img
				className='nav__avatar'
				src='https://www.flaticon.com/svg/vstatic/svg/1077/1077012.svg?token=exp=1616484919~hmac=1d660fd4996e42d581a618631c98ec26'
				alt='Netflix Avatar'
			/>
		</div>
	);
}

export default Nav;
