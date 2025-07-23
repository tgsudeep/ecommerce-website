import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem
} from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import axios from 'axios';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [categoryFilter, setCategoryFilter] = useState('All');

  const API_URL = 'http://localhost:5000/products';

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      const validProducts = res.data.filter((p) => !!p.id);
      setProducts(validProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async () => {
    const { id, name, ...rest } = editData;

    try {
      const isDuplicate = products.some(
        (p) => p.name?.toLowerCase() === name?.toLowerCase() && p.id !== id
      );

      if (isDuplicate) {
        alert('Product with same name already exists!');
        return;
      }

      if (id) {
        await axios.put(`${API_URL}/${id}`, { id, name, ...rest });
      } else {
        const newProduct = {
          id: crypto.randomUUID(),
          name,
          ...rest,
          status: 'In Stock' 
        };
        await axios.post(API_URL, newProduct);
      }

      setOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleSoftDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to soft delete this product?");
    if (!confirmDelete) return;

    try {
      const product = products.find((p) => p.id === id);
      if (!product) return;

      await axios.put(`${API_URL}/${id}`, { ...product, status: 'Out of Stock' }); // ✅ changed here
      fetchProducts();
    } catch (error) {
      console.error("Error soft deleting product:", error);
    }
  };

  const activeProducts = products.filter((p) => p.status === 'In Stock'); // ✅ changed here

  const filteredProducts =
    categoryFilter === 'All'
      ? activeProducts
      : activeProducts.filter((p) => p.category === categoryFilter);

  const uniqueCategories = [
    ...new Set(products.map((p) => p.category).filter(Boolean))
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'brand', headerName: 'Brand', width: 130 },
    { field: 'category', headerName: 'Category', width: 110 },
    { field: 'newPrice', headerName: ' Price', width: 100, type: 'number' },
    { field: 'status', headerName: 'Status', width: 110 },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          key="edit"
          label="Edit"
          onClick={() => {
            setEditData(row);
            setOpen(true);
          }}
          showInMenu
        />,
        <GridActionsCellItem
          key="softDelete"
          label="Soft Delete"
          onClick={() => handleSoftDelete(id)}
          showInMenu
        />
      ],
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditData({});
            setOpen(true);
          }}
        >
          Add Product
        </Button>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={categoryFilter}
            label="Filter by Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            {uniqueCategories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <DataGrid
        autoHeight
        rows={filteredProducts}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row.id}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          boxShadow: 1,
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            overflow: 'visible !important',
          },
          '& .MuiDataGrid-cell:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#fafafa',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 450 } }}
      >
        <DialogTitle>{editData.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {[
              ['name', 'Name'],
              ['brand', 'Brand'],
              ['category', 'Category'],
              ['newPrice', 'Price'],
              ['oldPrice', 'Old Price'],
              ['description', 'Description'],
              ['image', 'Image URL']
            ].map(([field, label]) => (
              <Grid item xs={12} sm={field === 'description' ? 12 : 6} key={field}>
                <TextField
                  label={label}
                  type={field.includes('Price') ? 'number' : 'text'}
                  fullWidth
                  multiline={field === 'description'}
                  rows={field === 'description' ? 3 : 1}
                  value={editData[field] ?? ''}
                  onChange={(e) =>
                    setEditData({ ...editData, [field]: e.target.value })
                  }
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editData.status || 'In Stock'}
                  label="Status"
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                >
                  <MenuItem value="In Stock">In Stock</MenuItem>
                  <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}