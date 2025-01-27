import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    MenuItem
} from '@mui/material';

const DEPARTMENTS = [
    'Engineering',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Other'
];

const UserForm = ({ open, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        department: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                department: initialData.department || ''
            });
            setErrors({
                name: '',
                email: '',
                department: ''
            });
        } else {
            setFormData({
                name: '',
                email: '',
                department: ''
            });
        }
    }, [initialData]);

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return value.trim() === '' ? 'Name is required' : '';
            case 'email':
                return value.trim() === '' 
                    ? 'Email is required'
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? 'Invalid email format'
                    : '';
            case 'department':
                return value.trim() === '' ? 'Department is required' : '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all fields
        const newErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            department: validateField('department', formData.department)
        };
        
        setErrors(newErrors);

        // Check if there are any errors
        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        onSubmit(formData);
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                {initialData ? 'Edit User' : 'Add New User'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            fullWidth
                        />
                        <TextField
                            name="department"
                            label="Department"
                            select
                            value={formData.department}
                            onChange={handleChange}
                            error={!!errors.department}
                            helperText={errors.department || 'Please select a department'}
                            fullWidth
                        >
                            {DEPARTMENTS.map((dept) => (
                                <MenuItem key={dept} value={dept}>
                                    {dept}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} color="inherit">
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained"
                        color="primary"
                    >
                        {initialData ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserForm;
