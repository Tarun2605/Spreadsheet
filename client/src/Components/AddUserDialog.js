import React, { useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { AxiosWrapperContext } from '../Utils/AxiosWrapper';
import { toast } from 'react-toastify';

export default function AddUserDialog({ open, onClose, roomId }) {
    const [email, setEmail] = useState('');
    const { apiPost } = useContext(AxiosWrapperContext);

    const handleAddUser = async () => {
        try {
            await apiPost('api/invite', { email, roomId });
            toast.success('User added successfully');
            onClose();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAddUser} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}
