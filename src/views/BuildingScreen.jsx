import React, { useEffect, useState } from "react";
import { StandardTable } from "erp-hust/lib/StandardTable";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Typography, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { request } from "api";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BuildingScreen = () => {
  const [buildings, setBuildings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState({
    buildingCode: "",
    buildingName: "",
    status: "",
    description: "",
    lastUpdatedStamp: ""
  });

  useEffect(() => {
    const fetchBuildings = async () => {
      request("get", "/buildings", (res) => {
        setBuildings(res.data);
      });
    };

    fetchBuildings();
  }, []);

  const columns = [
    { title: "Building Code", field: "buildingCode" },
    { title: "Building Name", field: "buildingName" },
    { title: "Status", field: "status" },
    { title: "Description", field: "description" },
    { title: "Last Updated", field: "lastUpdatedStamp" },
    {
      title: "Edit",
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => handleEdit(rowData)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    {
      title: "Delete",
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => handleDelete(rowData)} color="secondary">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleEdit = (row) => {
    setIsEditing(true);
    setCurrentBuilding({ ...row });
    setOpenModal(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Are you sure you want to delete building: ${row.buildingName}?`)) {
      try {
        await request("delete", `/buildings/${row.buildingCode}`);
        setBuildings((prev) => prev.filter((building) => building.buildingCode !== row.buildingCode));
      } catch (error) {
        console.error("Error deleting building: ", error);
      }
    }
  };

  const handleModalOpen = () => {
    setIsEditing(false);
    setCurrentBuilding({
      buildingCode: "",
      buildingName: "",
      status: "",
      description: "",
      lastUpdatedStamp: ""
    });
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setCurrentBuilding({
      buildingCode: "",
      buildingName: "",
      status: "",
      description: "",
      lastUpdatedStamp: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBuilding((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateBuilding = () => {
    const apiEndpoint = isEditing
      ? `/buildings/${currentBuilding.buildingCode}`
      : "/buildings";

    const method = isEditing ? "put" : "post";

    request(
      method,
      apiEndpoint,
      (res) => {
        if (isEditing) {
          setBuildings((prev) =>
            prev.map((building) =>
              building.buildingCode === currentBuilding.buildingCode ? res.data : building
            )
          );
        } else {
          setBuildings((prev) => [...prev, res.data]);
        }
      },
      {},
      currentBuilding
    );

    handleModalClose();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Building Management
      </Typography>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleModalOpen}
        >
          Add New
        </Button>
      </div>
      <StandardTable
        title="Building List"
        columns={columns}
        data={buildings}
        options={{
          selection: false,
          pageSize: 10,
          search: true,
          sorting: true,
        }}
      />
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {isEditing ? "Edit Building" : "Add New Building"}
          </Typography>
          <TextField
            label="Building Code"
            name="buildingCode"
            value={currentBuilding.buildingCode}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={isEditing}
          />
          <TextField
            label="Building Name"
            name="buildingName"
            value={currentBuilding.buildingName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            value={currentBuilding.status}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={currentBuilding.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleAddOrUpdateBuilding}>
              {isEditing ? "Update" : "Add"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleModalClose}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BuildingScreen;
