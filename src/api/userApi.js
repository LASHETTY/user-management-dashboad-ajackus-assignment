import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const userApi = {
    getUsers: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    },

    addUser: async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/users`, userData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to add user');
        }
    },

    updateUser: async (id, userData) => {
        try {
            const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update user');
        }
    },

    deleteUser: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/users/${id}`);
            return true;
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }
};
