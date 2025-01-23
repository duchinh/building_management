import React, { useState } from "react";
import {
  TextField,
  Stack,
  Button,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

function CreateBuildingScreen({ setBuildings }) {
  const [building, setBuilding] = useState({
    buildingCode: "",
    buildingName: "",
    status: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBuilding({ ...building, [name]: value });
  };

  const handleCreateBuilding = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/buildings", building);

      if (response.status === 201) {
        toast.success("Building created successfully!");

        // Cập nhật danh sách các tòa nhà
        setBuildings((prevBuildings) => [...prevBuildings, response.data]);

        // Reset form
        setBuilding({
          buildingCode: "",
          buildingName: "",
          status: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Failed to create building:", error);
      toast.error("Failed to create building!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create New Building
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Building Code"
          variant="outlined"
          name="buildingCode"
          value={building.buildingCode}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Building Name"
          variant="outlined"
          name="buildingName"
          value={building.buildingName}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={building.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={building.description}
          onChange={handleChange}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateBuilding}
        >
          Create Building
        </Button>
      </Stack>
    </Container>
  );
}

export default CreateBuildingScreen;
