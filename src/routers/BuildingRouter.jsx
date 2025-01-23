import React, { useState } from 'react';

const UpdateBuildingScreen = () => {
    const [buildingName, setBuildingName] = useState('');
    const [address, setAddress] = useState('');
    const [floors, setFloors] = useState(0);

    const handleUpdate = () => {
        // Handle the update logic here
        console.log('Building updated:', { buildingName, address, floors });
    };

    return (
        <div>
            <h1>Update Building</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Building Name:</label>
                    <input
                        type="text"
                        value={buildingName}
                        onChange={(e) => setBuildingName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>Floors:</label>
                    <input
                        type="number"
                        value={floors}
                        onChange={(e) => setFloors(Number(e.target.value))}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateBuildingScreen;