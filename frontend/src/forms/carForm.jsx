import {useState} from "react"
import { useDispatch } from "react-redux"
import {createCar} from "../features/cars/carSlice"


function CarForm() {
  const [carData, setCarData] = useState({
    year: "",
    make: "",
    model: "",
    // Add more variables here
  })

  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target;
    setCarData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createCar(carData));
    setCarData({
      year: "",
      make: "",
      model: "",
      // Reset other variables as needed
    })
  }

  const { year, make, model } = carData

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="text"
            name="year"
            id="year"
            value={year}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="make">Make</label>
          <input
            type="text"
            name="make"
            id="make"
            value={make}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            name="model"
            id="model"
            value={model}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Upload
          </button>
        </div>
      </form>
    </section>
  )
}

    export default CarForm