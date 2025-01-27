# User Management Dashboard

A modern React application for managing user data with features like viewing, adding, editing, and deleting users. The application uses JSONPlaceholder as a mock backend API.

## Live Demo
[View Live Demo on Vercel](https://user-management-dashboard-ajackus.vercel.app)

## Features

- View list of users with their details
- Add new users with validation
- Edit existing user information
- Delete users
- Predefined department selection
- Form validation with error messages
- Loading states and error handling
- Responsive Material UI design
- Clean and modular code structure

## Technologies Used

- React 18
- Material-UI (MUI) for UI components
- Axios for API calls
- JSONPlaceholder for mock API
- Vercel for deployment

## Project Structure

```
src/
  ├── api/
  │   └── userApi.js         # API integration layer
  ├── components/
  │   ├── UserList.js        # User list table component
  │   └── UserForm.js        # Add/Edit user form component
  └── App.js                 # Main application component
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/LASHETTY/user-management-dashboad-ajackus-assignment.git
   cd user-management-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Deployment

The application is deployed on Vercel. To deploy your own version:

1. Fork the repository
2. Create an account on [Vercel](https://vercel.com)
3. Connect your GitHub repository to Vercel
4. Deploy with default settings

## Development Challenges & Solutions

1. **API Integration**: 
   - Implemented comprehensive error handling
   - Added loading states for better UX
   - Handled mock API limitations

2. **Form Validation**: 
   - Added client-side validation for all fields
   - Implemented real-time validation feedback
   - Created a structured department selection

3. **State Management**: 
   - Used React hooks effectively
   - Implemented proper state updates
   - Added loading and error states

4. **UI/UX Design**: 
   - Created a clean, intuitive interface
   - Added responsive design
   - Implemented user feedback mechanisms

## Future Improvements

1. Add pagination or infinite scrolling for large user lists
2. Implement search and filtering capabilities
3. Add user authentication and authorization
4. Add unit tests and integration tests
5. Implement data caching
6. Add bulk operations (delete multiple users, etc.)
7. Add sorting functionality
8. Implement dark mode theme

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Repository

[GitHub Repository](https://github.com/LASHETTY/user-management-dashboad-ajackus-assignment)

## License

[MIT](https://choosealicense.com/licenses/mit/)
