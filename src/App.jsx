import React, {useEffect, useRef, useState} from 'react';
import Search from './components/Search.jsx';
import Spinner from "./components/Spinner.jsx";
import CarsCard from './components/CarsCard.jsx';
import { useDebounce } from 'react-use';
import CarImage from "./components/CarImage.jsx";
import Carousel from "./components/Carousel.jsx";
import DarkMode from "./components/DarkMode.jsx";

const API_BASE_URL = 'https://cars-by-api-ninjas.p.rapidapi.com/v1';

const API_KEY = import.meta.env.VITE_RN_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    }
}
const App = () => {
    const [debounceSearchTerm, setDebounceSearchTerm] = useState('')
    const [searchTerm, setSearchTerm] = useState('');

    const [carsList, setCarsList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const trendingCars = [{model: 'Huracan', year: 2015, make: 'LAMBORGHINI', color: 'green'}, {model: 'Vanquish', year: 2002, make: 'ASTON MARTIN', color: 'white'}, {model: 'x6', year: 2008, make: 'bmw', color: 'black'}, {model: '911 GT3 RS', year: 2007, make: 'PORSCHE', color: 'yellow'}, {model: 'Aventador', year: 2012, make: 'LAMBORGHINI', color: 'green'}, {model: 'Civic', year: 1994, make: 'honda', color: 'blue'}, {model: '7 Series', year: 1986, make: 'bmw', color: 'yellow'}, {model: 'chiron', year: 2018, make: 'BUGATTI', color: 'white'}, {model: '675LT', year: 2016, make: 'MCLAREN AUTOMOTIVE', color: 'orange'}, {model: 'Model 3', year: 2017, make: 'tesla', color: 'red'}];


    // Debounce the search term to prevent making too many API request
    // by waiting for the user to stop typing for 500ms
    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchCars = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');


            try {
                const endpoint = `${API_BASE_URL}/cars?model=${encodeURIComponent(query)}`;

                const response = await fetch(endpoint, API_OPTIONS);

                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }

                const data = await response.json();

                if (data.Response === 'False') {
                    setErrorMessage(data.Error || 'Failed to fetch cars');
                    setCarsList([]);
                    return;
                }

                setCarsList(data || []);

            } catch (error) {
                console.error(`Error fetching cars: ${error}`);
                if (query !== ''){
                    setErrorMessage("Error fetching cars. Please try again later.");
                } else {
                    setErrorMessage("Enter car in search.");
                }

            } finally {
                setIsLoading(false);
        }
    }

    useEffect(() => {
        if (debounceSearchTerm !== '') {
            fetchCars(debounceSearchTerm);
        }
    }, [debounceSearchTerm]);

    const trendingRef = useRef();

   const handleWheel = (event) => {
        event.preventDefault();
        trendingRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {
        trendingRef.current.addEventListener('wheel', handleWheel);
    }, [])

    const directions = ['right', 'left'];

  return (
    <main>
      <div className='wrapper'>
        <header>
          <div className='header-left'>
              <h1>All About <span className="text-gradient">Cars</span></h1>

          </div>
          <div className='header-right'>
              <Search searchTerm={ searchTerm } setSearchTerm={ setSearchTerm } />
              <DarkMode />
          </div>
        </header>

          {trendingCars.length > 0 && (
              <section className='cars trending'>
                  <h2>Trending Cars</h2>
                 <ul ref={trendingRef}>
                      {trendingCars.map((car, index) => (
                          <li key={car.model} onClick={() => setDebounceSearchTerm(car.model)}>
                              <p>{index + 1}</p>
                              <img className='carImg' src={CarImage(car.make, car.year, car.model, "25", car.color)} alt='Car image' />
                          </li>
                      ))}
                  </ul>
              </section>
          )}

          <section className='cars'>
              <h2>Car Info</h2>

              {isLoading ? (
                  <Spinner />
              ) : errorMessage ? (
                  <p className='text-red-500'>{ errorMessage }</p>
              ) : carsList.length > 0 ? (
                  <ul>
                      {carsList.map((cars) => (
                          <CarsCard key={cars.model} cars={cars} />
                      ))}
                  </ul>
              ) : 'Enter car in search bar!'}
          </section>

          <section className='carousel-wrapper'>
              <h2 className='p-[10px]'>Manufacturers</h2>
              <div className='carousel-container'>
              {directions.map((direction, index) => (
                  <Carousel key={index} direction={direction} />
              ))}
              </div>
          </section>
          <section className="footer">
              <p className="copyright">© 2025 All About Cars.</p>
          </section>
      </div>
    </main>
  )
}

export default App
