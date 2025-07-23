import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';


export default function UserDetailsModal({ open, handleClose, user }) {
  if (!user) return null;
    
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Typography><strong>Name:</strong> {user.firstName}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}</Typography>
        <Typography><strong>Account:</strong> {user.isActive ? "Active" : "Inactive"}</Typography>
      </DialogContent>
    </Dialog>
  );
}