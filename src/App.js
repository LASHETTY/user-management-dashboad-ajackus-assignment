import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Snackbar, Alert, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { userApi } from './api/userApi';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const showAlert = useCallback((message, severity) => {
    setAlert({ open: true, message, severity });
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userApi.getUsers();
      // Add department field if not present
      const usersWithDepartment = data.map(user => ({
        ...user,
        department: user.department || ''
      }));
      setUsers(usersWithDepartment);
    } catch (error) {
      showAlert('Failed to fetch users: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = useCallback(async (userData) => {
    try {
      const newUser = await userApi.addUser(userData);
      setUsers(prev => [...prev, { ...newUser, id: prev.length + 1 }]);
      showAlert('User added successfully', 'success');
      setOpenForm(false);
    } catch (error) {
      showAlert('Failed to add user: ' + error.message, 'error');
    }
  }, [showAlert]);

  const handleUpdateUser = useCallback(async (userData) => {
    if (!selectedUser) return;
    
    try {
      const updatedUser = await userApi.updateUser(selectedUser.id, userData);
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id ? { ...updatedUser, ...userData } : user
      ));
      showAlert('User updated successfully', 'success');
      setOpenForm(false);
    } catch (error) {
      showAlert('Failed to update user: ' + error.message, 'error');
    }
  }, [selectedUser, showAlert]);

  const handleDeleteUser = useCallback(async (id) => {
    try {
      await userApi.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      showAlert('User deleted successfully', 'success');
    } catch (error) {
      showAlert('Failed to delete user: ' + error.message, 'error');
    }
  }, [showAlert]);

  const handleEdit = useCallback((user) => {
    setSelectedUser(user);
    setOpenForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setSelectedUser(null);
    setOpenForm(false);
  }, []);

  const handleCloseAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, open: false }));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading && <LinearProgress />}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenForm(true)}
        sx={{ mb: 3 }}
      >
        Add User
      </Button>

      <UserList
        users={users}
        onEdit={handleEdit}
        onDelete={handleDeleteUser}
        loading={loading}
      />

      <UserForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={selectedUser ? handleUpdateUser : handleAddUser}
        initialData={selectedUser}
      />

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity}
          variant="filled"
          elevation={6}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
