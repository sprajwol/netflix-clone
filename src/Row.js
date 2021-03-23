import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original';

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');

	// A snippet of code which runs based on a specific condition
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);

			return request;
		}
		fetchData();
		// [], run once when the row loads and dont run again.
		// [movies], run once when row loads and run again when movies load
	}, [fetchUrl]);

	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movie?.title || movie?.name || movie?.original_name || '')
				.then((url) => {
					console.log('urlss0', url);
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch((error) => console.log(error));
		}
	};

	// console.log(movies);
	return (
		<div className='row'>
			<h2>{title}</h2>
			<div className='row__posters'>
				{/** several row posters */}
				{movies.map((movie) => (
					<img
						key={movie.id}
						onClick={() => handleClick(movie)}
						className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
					/>
				))}
			</div>
			{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;
