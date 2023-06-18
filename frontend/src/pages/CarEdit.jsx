import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPublishedCar, editCar } from '../features/cars/carSlice';
import Spinner from "../components/Spinner";
import '../css/CarEdit.css'; // Import the CSS file for styling

function CarEdit() {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(state => state.cars.cars);

  useEffect(() => {
    dispatch(getPublishedCar(itemId));
  }, [dispatch, itemId]);

  const [editedFields, setEditedFields] = useState(car ? { ...car } : {})
  const [editMode, setEditMode] = useState(false);
  

  const handleEdit = (key, value) => {
    setEditedFields({ ...editedFields, [key]: value });
  };

  const handleToggleEdit = () => {
    if (editMode) {
        // Log the changed fields
        Object.entries(editedFields).forEach(([key, value]) => {
          if (car && value !== car[key]) {
            console.log(`Changed field: ${key}, new value: ${value}`);
          }
        });
    
        // Dispatch the editCar action with the itemId and editedFields
        dispatch(editCar({ carId: car._id, editedFields }))
      } else {
        setEditedFields(car);
    }
    setEditMode(!editMode);
  }
  
  

  if (!car) {
    return <Spinner />;
  }

  const renderFields = () => {
    if (!car) {
      return null; // or a loading state, depending on your requirements
    }
    
    return Object.keys(car).map(key => (
      <div key={key} className="field-container">
        <strong>{key}: </strong>
        {editMode ? (
            <input
            className="edit-input" // Apply custom CSS class for styling
            type="text"
            value={editedFields[key] !== undefined ? editedFields[key] : car[key]}
            onChange={e => handleEdit(key, e.target.value)}
            />
        ) : (
            <span>{editedFields[key] !== undefined ? editedFields[key] : car[key]}</span>
        )}
      </div>
    ));
  };

  return (
    <div className="car-edit-container"> {/* Apply CSS style for left alignment */}
      <h2>Edit Car {car.tuluStockNum}</h2>
      {renderFields()}
      <button onClick={handleToggleEdit}>
        {editMode ? 'Save Changes' : 'Edit'}
      </button>
    </div>
  );
}



export default CarEdit;
