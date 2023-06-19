import CarForm from "../forms/carForm"
import { useEffect } from "react"

function InventoryUploader() {

  useEffect(() => {
    document.title = 'Upload Inventory - Tulu Canada'
  })

  return (
    <>
      <CarForm />
    </>
  )
}


export default InventoryUploader;
