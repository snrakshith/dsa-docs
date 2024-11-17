---
title: "Context API"
description: "An overview of Context API usage in whims portal"
---

# State management in WHIMS 360 portal using Context API

---

## **What is Context API?**

- Context API provides a way to pass data through the component tree without passing props at every level.
- It helps when some global state (like user authentication, theme, etc.) needs to be accessed by many components.

---

Let’s transform this into a **UserRoleContext** to focus entirely on managing user roles, such as `facility_manager` or `admin`, retrieved from an API.

---

## **UserRoleContext with Role Management Example**

We’ll create a **UserRoleContext** to handle fetching, storing, and providing access to the user's role from an API.

---

### **Folder Structure**

Inside `src/`:

```
src/
│
├── components/
├── context/
│   └── UserRoleContext.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── AdminPage.tsx
│   └── Login.tsx
└── App.tsx
```

---

### **1. Create UserRoleContext**

Here’s how we define a context to manage user roles.

#### **UserRoleContext.tsx**

```tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the shape of UserRoleContext
interface UserRoleContextType {
  role: string | null;
  fetchUserRole: () => Promise<void>;
  isLoading: boolean;
}

// Create context with default value undefined for safety
const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

// Props for UserRoleProvider
interface UserRoleProviderProps {
  children: ReactNode;
}

// Provider component
export const UserRoleProvider: React.FC<UserRoleProviderProps> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate an API call to fetch user role
  const fetchUserRole = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/role"); // Replace with your actual API
      const data = await response.json();
      setRole(data.role); // Example: { role: 'facility_manager' }
    } catch (error) {
      console.error("Failed to fetch user role:", error);
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  return <UserRoleContext.Provider value={{ role, fetchUserRole, isLoading }}>{children}</UserRoleContext.Provider>;
};

// Custom hook to use UserRoleContext
export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
};
```

---

### **2. Create Pages Based on Role**

#### **AdminPage.tsx**

This page will be accessible only for `admin` users.

```tsx
import React from "react";
import { useUserRole } from "../context/UserRoleContext";

const AdminPage: React.FC = () => {
  const { role } = useUserRole();

  if (role !== "admin") {
    return <p>Access denied. You are not an admin.</p>;
  }

  return (
    <div>
      <h2>Admin Page</h2>
      <p>Welcome, Admin!</p>
    </div>
  );
};

export default AdminPage;
```

#### **Dashboard.tsx**

This page is accessible for all users, but it shows different content based on the user’s role.

```tsx
import React from "react";
import { useUserRole } from "../context/UserRoleContext";

const Dashboard: React.FC = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {role === "facility_manager" && <p>Welcome, Facility Manager!</p>}
      {role === "admin" && <p>Welcome, Admin!</p>}
    </div>
  );
};

export default Dashboard;
```

---

### **3. Implement Routes**

In `src/App.tsx`, define routes with role-based access.

#### **App.tsx**

```tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { UserRoleProvider } from "./context/UserRoleContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";

const App: React.FC = () => {
  return (
    <UserRoleProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </UserRoleProvider>
  );
};

export default App;
```

---

### **4. Login Page**

Simulate a login that redirects the user to the **Dashboard**.

#### **Login.tsx**

```tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "../context/UserRoleContext";

const Login: React.FC = () => {
  const { fetchUserRole } = useUserRole();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await fetchUserRole(); // Fetch user role after login
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
```

---

### **5. Testing the Flow**

1. On visiting `/login`, the user clicks **Login**, which triggers `fetchUserRole`.
2. After login, the user is redirected to `/dashboard` and sees content based on their role.
3. If the user tries to visit `/admin` without the correct role, they will see an **"Access denied"** message.
