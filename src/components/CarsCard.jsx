import React, {useState} from 'react'
import CarImage from "./CarImage.jsx";

const CarsCard = ({ cars: { make, drive, model, cylinders, transmission, year, fuel_type } }) => {
    const [carColor, setCarColor] = useState('red');
    const colors = ['red', 'orange', 'yellow', 'blue', 'black', 'white', 'green'];

    let transmssn = '';
    if (transmission === 'a') {
        transmssn = 'Automatic';
    } else if (transmission === 'm') {
        transmssn = 'Manual';
    }

    return <div className='cars-card'>

        <div className="img-wrap">
            <div className="cars-card-image">
                <img className='carImg' src={CarImage(make, year, model, "", carColor)} alt='Car image' />
            </div>
            <div className='car-colors'>
                {colors.map((color) => (
                    <div className='color' style={{backgroundColor: color}} key={color} onClick={() => setCarColor(color)}></div>
                ))}
            </div>
        </div>

        <div className='info'>
            <h3>{make.toUpperCase()}</h3><h3>{model.toUpperCase()}</h3>

            <div className='content'>
                <p>Vehicle model year: {year}</p>
                <p>Number of cylinders: {cylinders}</p>
                <p>Type of transmission: {transmssn}</p>
                <p>Drive transmission: {drive.toUpperCase()}</p>
                <p>Type of fuel used: {fuel_type.charAt(0).toUpperCase() + fuel_type.slice(1)}</p>
            </div>
        </div>
    </div>
}

export default CarsCard