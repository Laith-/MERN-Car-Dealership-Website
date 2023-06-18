import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import placeHolderImage from '../assets/tulu-circle.png';
import '../css/InventoryManagerGrid.css';

function CarItem({ car, editMode, selected, onItemClick }) {
  const [isSelected, setIsSelected] = useState(selected);
  ///const editMode = true

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handleItemClick = () => {
    if (editMode) {
      setIsSelected(!isSelected);
      onItemClick(car._id); // Pass the car ID to the parent component
    }
  };

  const carItemClassName = isSelected ? 'car-item selected' : 'car-item';

  return (
    <div
      className={carItemClassName}
      onClick={handleItemClick}
    >
      <img src={placeHolderImage} alt="Car" className="car-image" />
      <div className="car-divider"></div>
      <h2 className="car-title">{car.year} {car.make} {car.model}</h2>

      <p className="stock-number">Stock #{car.tuluStockNum || 'Tulu'}</p>
      <div className="car-details">Price: ${car.price || '24,295'}</div>
      <div className="car-details">KM: {car.color || '140,543'}km</div>
      <div className="car-details">Price: ${car.price || '24,295'}</div>
      <div className="car-details">KM: {car.color || '140,543'}km</div>

      <div className="car-buttons">
        <Link
          to={`/vehicle/${car.tuluStockNum}`}
          className="item-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </Link>
        <Link
          to={`/dashboard/inventorymanager/edit/${car.tuluStockNum}`}
          className="item-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export default CarItem;
