import React, {useState} from 'react'

const AddParkingForm = props => {
    const initialFormState = { id: null, name: '', category: '' }
    const [parking, setParking] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target
      
        setParking({ ...parking, [name]: value })
    }
    return (
        <form onSubmit={event => {
            event.preventDefault()
            if (!parking.name || !parking.category) return
    
            props.addParking(parking)
            setParking(initialFormState)
        }}>
        <label>Name</label>
        <input type="text" name="name" value={parking.name} onChange={handleInputChange} />
        <label>Category</label>
        <input type="text" name="category" value={parking.category} onChange={handleInputChange} />
        <button>Add new parking</button>
        </form>
    )
}

export default AddParkingForm