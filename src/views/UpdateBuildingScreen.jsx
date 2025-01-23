// src/screens/UpdateBuildingScreen.jsx
import React, { useState, useEffect } from "react";
import { request } from "../api";
import { useParams, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function UpdateBuildingScreen() {
    const { id } = useParams();
    const [building, setBuilding] = useState({});
    const [buildingName, setBuildingName] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();

    useEffect(() => {
        const fetchBuilding = async () => {
            try {
                const res = await request("get", `/buildings/${id}`);
                setBuilding(res.data);
                setBuildingName(res.data.buildingName);
                setStatus(res.data.status);
                setDescription(res.data.description);
            } catch (error) {
                console.error("Failed to fetch building:", error);
            }
        };
        fetchBuilding();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedBuilding = { buildingName, status, description };
        try {
            await request("put", `/buildings/${id}`, updatedBuilding);
            history.push("/building");
        } catch (error) {
            console.error("Failed to update building:", error);
        }
    };

    return (
        <div>
            <h2>Update Building</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Building Name"
                    value={buildingName}
                    onChange={(e) => setBuildingName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>
        </div>
    );
}

export default UpdateBuildingScreen;
