import React, { useEffect, useState } from 'react';
import { StandardTable } from 'erp-hust/lib/StandardTable';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, Modal, Box, TextField } from '@mui/material';
import { request } from 'api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const VendorScreen = () => {
  const [vendors, setVendors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentVendor, setCurrentVendor] = useState({
    name: '',
    status: '',
    address: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      request('get', '/vendor/get-all', (res) => {
        setVendors(res.data);
      }).then();
    };

    fetchData();
  }, []);

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Tên nhà cung cấp', field: 'name' },
    { title: 'Trạng thái', field: 'status' },
    { title: 'Địa chỉ', field: 'address' },
    {
      title: 'Chỉnh sửa',
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => handleEdit(rowData)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    {
      title: 'Xóa',
      sorting: false,
      render: (rowData) => (
        <IconButton onClick={() => handleDelete(rowData)} color="secondary">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleEdit = (row) => {
    setCurrentVendor({
      name: row.name,
      status: row.status,
      address: row.address,
      id: row.id,
    });
    setOpenModal(true);
  };

  const handleDelete = (row) => {
    const deleteVendor = async () => {
      request(
        'delete',
        `/vendor/delete/${row.id}`,
        () => {
          setVendors((prev) => prev.filter((vendor) => vendor.id !== row.id));
        },
        {},
        {}
      ).then();
    };
    if (window.confirm(`Bạn có chắc chắn muốn xóa nhà cung cấp: ${row.name}?`)) {
      deleteVendor();
    }
  };

  const handleModalOpen = () => {
    setCurrentVendor({ name: '', status: '', address: '' });
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setCurrentVendor({ name: '', status: '', address: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVendor((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditVendor = () => {
    const apiEndpoint = currentVendor.id
      ? `/vendor/edit/${currentVendor.id}`
      : '/vendor/add-new';
    const method = currentVendor.id ? 'put' : 'post';
    request(
      method,
      apiEndpoint,
      (res) => {
        if (currentVendor.id) {
          setVendors((prev) =>
            prev.map((vendor) => (vendor.id === currentVendor.id ? res.data : vendor))
          );
        } else {
          setVendors((prev) => [...prev, res.data]);
        }
      },
      {},
      currentVendor
    ).then();
    handleModalClose();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Quản lý nhà cung cấp
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleModalOpen}
        >
          Thêm mới
        </Button>
      </div>
      <StandardTable
        title="Danh sách nhà cung cấp"
        columns={columns}
        data={vendors}
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
            {currentVendor.id ? 'Chỉnh sửa nhà cung cấp' : 'Thêm nhà cung cấp mới'}
          </Typography>
          <TextField
            label="Tên nhà cung cấp"
            name="name"
            value={currentVendor.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Trạng thái"
            name="status"
            value={currentVendor.status}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Địa chỉ"
            name="address"
            value={currentVendor.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleAddOrEditVendor}>
              {currentVendor.id ? 'Cập nhật' : 'Thêm'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleModalClose}
              style={{ marginLeft: '10px' }}
            >
              Hủy
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default VendorScreen;
