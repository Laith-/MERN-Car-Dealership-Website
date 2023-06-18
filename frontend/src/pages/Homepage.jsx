import '../css/InventoryManagerGrid.css';
import CarCard from "../components/CarCard";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPublishedCar } from '../features/cars/carSlice';
import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom'

function Homepage() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);


  useEffect(() => {
    dispatch(getPublishedCar());
  }, [dispatch]);

  if (!cars) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>This is the frontpage!</h1>
      {cars.length > 0 ? (
        <div className="cars-grid">
          {cars.map((car) => (
            <div
              key={car._id}
              className="car-clickable">
              
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
