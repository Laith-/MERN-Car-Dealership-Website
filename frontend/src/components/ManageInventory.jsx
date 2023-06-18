import { useSelector, useDispatch } from "react-redux";
import { getCars, deleteCar, editCar, reset } from "../features/cars/carSlice";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import CarItem from "./CarItem";
import "../css/InventoryManagerGrid.css";

function ManageInventory() {
  const dispatch = useDispatch();

  const { cars, isLoading, isError, message } = useSelector((state) => state.cars);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCars());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const [editMode, setEditMode] = useState(true);
  const [selectedCars, setSelectedCars] = useState([]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedCars([]); // Clear the selectedCars state when exiting edit mode
  };

  const handleCarItemClick = (carId) => {
    if (editMode) {
      if (selectedCars.includes(carId)) {
        setSelectedCars((prevSelectedCars) =>
          prevSelectedCars.filter((id) => id !== carId)
        );
      } else {
        setSelectedCars((prevSelectedCars) => [...prevSelectedCars, carId]);
      }
    }
  };
  

  const handleDelete = () => {
    // Dispatch actions for each selected car
    selectedCars.forEach((carId) => {
      dispatch(deleteCar(carId))
    })
  }

  const handlePublish = () => {
    // Dispatch actions for each selected car
    selectedCars.forEach((carId) => {
      // Dispatch action to update the published property of the car
      dispatch(editCar({ carId: carId, editedFields: { published: true } }));
    });
  
    // Clear the selectedCars state
    setSelectedCars([]);
  }

  const handleUnublish = () => {
    // Dispatch actions for each selected car
    selectedCars.forEach((carId) => {
      // Dispatch action to update the published property of the car
      dispatch(editCar({ carId: carId, editedFields: { published: false } }));
    });
  
    // Clear the selectedCars state
    setSelectedCars([]);
  };
  

  const Toolbar = () => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDeleteConfirmation = () => {
      if (confirmDelete) {
        handleDelete();
      } else {
        setConfirmDelete(true);
      }
    };

    const handleCancel = () => {
      if (confirmDelete) {
        setConfirmDelete(false);
      } else {
        toggleEditMode();
      }
    };

    return (
      <div className="toolbar">
        <h1 style={{ textAlign: 'left' }}>Toolbar</h1>
        {confirmDelete ? (
          <>
            <button className="toolbar-button" onClick={handleCancel}>Cancel</button>
            <button className="toolbar-button" onClick={handleDeleteConfirmation}>Are you sure?</button>
          </>
        ) : (
          <button className="toolbar-button" onClick={handleDeleteConfirmation}>Delete</button>
        )}
        <button className="toolbar-button" onClick={handlePublish}>Publish</button>
        <button className="toolbar-button" onClick={handleUnublish}>Unpublish</button>
      </div>
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="content">
      {/* Render the Toolbar component */}
      <Toolbar />

      {cars.length > 0 ? (
        <div className="cars-grid">
          {cars.map((car) => (
            <CarItem
              key={car._id}
              car={car}
              editMode={editMode}
              selected={selectedCars.includes(car._id)}
              onItemClick={handleCarItemClick}
            />
          ))}
        </div>
      ) : (
        <h3>No inventory</h3>
      )}
    </section>
  );
}

export default ManageInventory;
