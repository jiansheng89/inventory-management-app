import React, { useState, useEffect } from 'react'

const EditParkingForm = props => {

    
  const [parking, setParking] = useState(props.currentParking)

  const handleInputChange = event => {
    const { name, value } = event.target

    setParking({ ...parking, [name]: value })
  }

  useEffect(() => {
    setParking(props.currentParking)
  }, [props])

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateParking(parking.id, parking)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={parking.name} onChange={handleInputChange} />
      <label>Category</label>
      <input type="text" name="category" value={parking.category} onChange={handleInputChange} />
      <button>Update parking</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditParkingForm