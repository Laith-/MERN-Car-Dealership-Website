import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPublishedCar } from '../features/cars/carSlice';
import Spinner from "../components/Spinner"

function CarView() {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(state => state.cars.cars);

  useEffect(() => {
    document.title = 'View Car - Tulu Canada'
    dispatch(getPublishedCar(itemId));
  }, [dispatch, itemId]);

  if (!car) {
    return <Spinner />
  }

  return (
    <div>
      <h2>VIEWING PAGE FOR {car.tuluStockNum}</h2>
      <pre>{JSON.stringify(car, null, 2)}</pre>
    </div>
  );
}

export default CarView;
