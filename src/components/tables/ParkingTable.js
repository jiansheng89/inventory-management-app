import React from 'react'

const ParkingTable = props => {
  return (
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            {props.parkings.length > 0 ? (
                props.parkings.map(parking => (
                <tr key={parking.id}>
                    <td>{parking.name}</td>
                    <td>{parking.category}</td>
                    <td>
                    <button onClick={() => {
                        props.editRow(parking)
                    }} className="button muted-button"
                    >Edit</button>
                    <button onClick={() => props.deleteParking(parking.id)} className="button muted-button">
                        Delete
                    </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={3}>No users</td>
                </tr>
            )}
        </tbody>
    </table>
  )
}

export default ParkingTable