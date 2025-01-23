import React, { useEffect, useState } from "react";
import { StandardTable } from "erp-hust/lib/StandardTable";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Typography, Modal, Box, TextField } from "@mui/material";
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

const AssetScreen = () => {
  const [assets, setAssets] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentAsset, setCurrentAsset] = useState({
    assetCode: "",
    assetName: "",
    status: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      request("get", "/asset/get-all", (res) => {
        setAssets(res.data);
      }).then();
    };

    fetchData();
  }, []);

  const columns = [
    { title: "Asset Code", field: "assetCode" },
    { title: "Asset Name", field: "assetName" },
    { title: "Status", field: "status" },
    { title: "Description", field: "description" },
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
    setCurrentAsset({ ...row });
    setOpenModal(true);
  };

  const handleDelete = (row) => {
    const deleteAsset = async () => {
      request(
        "delete",
        `/asset/delete/${row.assetCode}`,
        (res) => {
          console.log(`Deleted asset ${row.assetName}`);
          setAssets((prev) =>
            prev.filter((asset) => asset.assetCode !== row.assetCode)
          );
        },
        {},
        {}
      ).then();
    };
    if (window.confirm(`Are you sure you want to delete asset: ${row.assetName}?`)) {
      deleteAsset();
    }
  };

  const handleModalOpen = () => {
    setCurrentAsset({
      assetCode: "",
      assetName: "",
      status: "",
      description: "",
    });
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setCurrentAsset({
      assetCode: "",
      assetName: "",
      status: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAsset((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditAsset = () => {
    const apiEndpoint = currentAsset.assetCode
      ? `/asset/edit/${currentAsset.assetCode}`
      : "/asset/add-new";
    request(
      "post",
      apiEndpoint,
      (res) => {
        console.log(res);

        if (currentAsset.assetCode) {
          setAssets((prev) =>
            prev.map((asset) =>
              asset.assetCode === currentAsset.assetCode ? res.data : asset
            )
          );
        } else {
          setAssets((prev) => [...prev, res.data]);
        }
      },
      {},
      currentAsset
    ).then();

    handleModalClose();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        University Classroom Asset Management
      </Typography>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleModalOpen}>
          Add New
        </Button>
      </div>
      <StandardTable
        title="Asset List"
        columns={columns}
        data={assets}
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
            {currentAsset.assetCode ? "Edit Asset" : "Add New Asset"}
          </Typography>
          <TextField
            label="Asset Code"
            name="assetCode"
            value={currentAsset.assetCode}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!!currentAsset.assetCode}
          />
          <TextField
            label="Asset Name"
            name="assetName"
            value={currentAsset.assetName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            value={currentAsset.status}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={currentAsset.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleAddOrEditAsset}>
              {currentAsset.assetCode ? "Update" : "Add"}
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

export default AssetScreen;
