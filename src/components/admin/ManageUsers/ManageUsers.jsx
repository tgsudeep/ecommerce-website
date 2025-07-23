import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ManageUsers.css";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import UserDetailsModal from '../ModalUsers/UserDetailsModal';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchUsers = () => {
    axios.get("http://localhost:5000/users")
      .then((res) =>{
        console.log("Fetched users:", res.data); 
        setUsers(res.data)
   } )

      .catch((err) => console.error("Error fetching users:", err));
  };

  const toggleBlock = (id, status) => {
    axios.patch(`http://localhost:5000/users/${id}`, { isBlocked: !status })
      .then(() => fetchUsers());
  };

  const softDelete = (id) => {
    axios.patch(`http://localhost:5000/users/${id}`, { isActive: false })
      .then(() => fetchUsers());
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="manage-users-container">
      <h2>Registered Users</h2>
    <div className='table-font'>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {users.filter(user => user.isActive !== false).map((user) => (
    <TableRow key={user.id}>
      <TableCell>{user.firstName} {user.secondName}</TableCell>
      <TableCell>{user.username || '-'}</TableCell>
    
      <TableCell>{user.isBlocked ? "Blocked" : "Active"}</TableCell>
      <TableCell>
        <Button
          onClick={() => toggleBlock(user.id, user.isBlocked ?? false)}
          color={user.isBlocked ? "success" : "error"}
          variant="contained"
          sx={{ mr: 1 }}
        >
          {user.isBlocked ? "Unblock" : "Block"}
        </Button>
        <Button
          onClick={() => softDelete(user.id)}
          variant="outlined"
          color="warning"
          sx={{ mr: 1 }}
        >
          Soft Delete
        </Button>
        <Button
          onClick={() => handleViewDetails(user)}
          variant="outlined"
        >
          View Details
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
      
  
      <UserDetailsModal
        open={modalOpen}
        handleClose={handleCloseModal}
        user={selectedUser}
      />
      </div>
    </div>
  );
}