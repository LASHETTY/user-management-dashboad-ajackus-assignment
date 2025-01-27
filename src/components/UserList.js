import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = ({ users, onEdit, onDelete, loading }) => {
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2 }}>
                User List ({users.length} users)
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {user.department || 'Not Assigned'}
                            </TableCell>
                            <TableCell align="center">
                                <IconButton 
                                    onClick={() => onEdit(user)}
                                    color="primary"
                                    title="Edit user"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton 
                                    onClick={() => onDelete(user.id)}
                                    color="error"
                                    title="Delete user"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserList;
