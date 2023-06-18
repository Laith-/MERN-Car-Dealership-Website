import placeHolderImage from '../assets/tulu-circle.png';
import '../css/InventoryManagerGrid.css';
import carfaxLogo from '../assets/carfax-logo.png'

function CarCard({ car }) {
    
  return (
    <div className="car-item">
      <img src={placeHolderImage} alt="Car" className="car-image" />
      <div className="car-divider"></div>
      <h2 className="car-title">{car.year} {car.make} {car.model}</h2>
      <p className="stock-number">Stock #{car.tuluStockNum || 'Tulu'}</p>
      <div className="car-details">Price: ${car.price || '24,295'}</div>
      <div className="car-details">KM: {car.color || '140,543'}km</div>
      <div className="car-details">Trim: {car.price || 'Base'}</div>

      <a href="https://www.carfax.com" target="_blank" rel="noopener noreferrer">
        <img src={carfaxLogo} alt="Carfax Logo" className="carfax-logo" />
      </a>
    </div>
  );
}

export default CarCard;
