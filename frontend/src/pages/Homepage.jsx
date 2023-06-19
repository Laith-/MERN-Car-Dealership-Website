import '../css/InventoryManagerGrid.css';
import CarCard from "../components/CarCard";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPublishedCar } from '../features/cars/carSlice';
import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom';

function Homepage() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);

  const [yearFilter, setYearFilter] = useState('');
  const [makeFilter, setMakeFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');

  useEffect(() => {
    document.title = 'Homepage - Tulu Canada'
    dispatch(getPublishedCar());
  }, [dispatch]);

  if (!cars) {
    return <Spinner />;
  }

  // Define options for the dropdown menu
  const yearOptions = cars && Array.isArray(cars) ? [...new Set(cars.map(car => car.year.toString().toUpperCase()))] : [];
  const makeOptions = cars && Array.isArray(cars) ? [...new Set(cars.map(car => car.make.toUpperCase()))] : [];
  const modelOptions = cars && Array.isArray(cars) ? [...new Set(cars.map(car => car.model.toUpperCase()))] : [];


  return (
    <div>
      <h1>This is the frontpage!</h1>

      <div className="filter-section">
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
          <option value="">Year</option>
          {yearOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <select value={makeFilter} onChange={(e) => setMakeFilter(e.target.value)}>
          <option value="">Make</option>
          {makeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <select value={modelFilter} onChange={(e) => setModelFilter(e.target.value)}>
          <option value="">Model</option>
          {modelOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {cars.length > 0 ? (
        <div className="cars-grid">
          {cars
            .filter((car) => {
              const yearMatch =
                yearFilter === '' || car.year.toString().includes(yearFilter);
              const makeMatch =
                makeFilter === '' || car.make.toLowerCase().includes(makeFilter.toLowerCase());
              const modelMatch =
                modelFilter === '' || car.model.toLowerCase().includes(modelFilter.toLowerCase());
              return yearMatch && makeMatch && modelMatch;
            })
            .map((car) => (
              <div key={car._id} className="car-clickable">
                <Link to={`/vehicle/${car.tuluStockNum}`} target="_blank">
                  <CarCard car={car} />
                </Link>
              </div>
            ))}
        </div>
      ) : (
        <h3>No inventory</h3>
      )}
    </div>
  );
}

export default Homepage;
