# TODO: Make Project Management Dashboard Fully Working

## Backend Improvements
- [ ] Install bcryptjs and jsonwebtoken in backend
- [ ] Create .env file in backend with MONGODB_URL, JWT_SECRET, PORT
- [ ] Update userSchema.js: Ensure password is hashed (minor change if needed)
- [ ] Update projectSchema.js: Change teamMembers/roles to arrays of ObjectIds referencing User
- [ ] Create auth middleware in backend/index.js for JWT verification
- [ ] Update /signup route: Hash password with bcrypt
- [ ] Update /login route: Compare hashed password, return JWT
- [ ] Protect project routes with auth middleware
- [ ] Add new endpoints: PUT /projects/:id, DELETE /projects/:id, GET /projects/:id, POST /projects/:id/assign (role-based)

## Frontend Improvements
- [ ] Add /signup route in App.jsx
- [ ] Create AuthContext.jsx for auth state management
- [ ] Create PrivateRoute.jsx for protecting routes
- [ ] Update App.jsx to wrap in AuthProvider and use PrivateRoute for protected routes
- [ ] Implement Login.jsx: Form with Axios to /login, store token
- [ ] Implement Signup.jsx: Form with Axios to /signup
- [ ] Update Layout.jsx: Add navbar with navigation links and logout
- [ ] Implement Dashboard.jsx: Fetch and display projects/stats
- [ ] Implement ExistingProjects.jsx: Fetch and display all projects
- [ ] Implement ProjectOverview.jsx: Form to create project

## General
- [ ] Update root package.json scripts for concurrent dev (backend + frontend)
- [ ] Test backend endpoints
- [ ] Test frontend integration
- [ ] Verify full functionality
