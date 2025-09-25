# React Native Integration Guide

## Overview

Your Com-rade authentication API is fully compatible with React Native mobile apps. This guide shows you how to integrate it.

## API Base URL

```javascript
const API_BASE_URL = "http://YOUR_SERVER_IP:5000"; // Replace with your server IP
// For local development: 'http://192.168.1.100:5000' (your computer's IP)
// For production: 'https://your-domain.com'
```

## 1. Authentication Service

Create an authentication service in your React Native app:

```javascript
// services/AuthService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.1.100:5000"; // Your server IP

class AuthService {
  // Sign up new user
  static async signUp(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, user: data };
      } else {
        return { success: false, error: data.message || "Sign up failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  }

  // Sign in user
  static async signIn(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in AsyncStorage
        await AsyncStorage.setItem("authToken", data.token);
        return { success: true, token: data.token };
      } else {
        return { success: false, error: data.message || "Sign in failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  }

  // Get user profile
  static async getProfile() {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        return { success: false, error: "No token found" };
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, user: data };
      } else {
        return {
          success: false,
          error: data.message || "Failed to get profile",
        };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  }

  // Sign out user
  static async signOut() {
    try {
      await AsyncStorage.removeItem("authToken");
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to sign out" };
    }
  }

  // Check if user is authenticated
  static async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return !!token;
    } catch (error) {
      return false;
    }
  }

  // Get stored token
  static async getToken() {
    try {
      return await AsyncStorage.getItem("authToken");
    } catch (error) {
      return null;
    }
  }
}

export default AuthService;
```

## 2. Login Screen Component

```javascript
// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AuthService from "../services/AuthService";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    const result = await AuthService.signIn(username, password);
    setLoading(false);

    if (result.success) {
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("Home"); // Navigate to your main screen
    } else {
      Alert.alert("Error", result.error);
    }
  };

  const handleSignUp = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    const result = await AuthService.signUp(username, password);
    setLoading(false);

    if (result.success) {
      Alert.alert("Success", "Account created successfully! Please login.");
    } else {
      Alert.alert("Error", result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Com-rade Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
```

## 3. Protected Route Component

```javascript
// components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AuthService from "../services/AuthService";

const ProtectedRoute = ({ children, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const isAuth = await AuthService.isAuthenticated();
    setAuthenticated(isAuth);
    setLoading(false);

    if (!isAuth) {
      navigation.navigate("Login");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return authenticated ? children : null;
};

export default ProtectedRoute;
```

## 4. API Helper with Automatic Token

```javascript
// utils/ApiHelper.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.1.100:5000";

class ApiHelper {
  static async makeAuthenticatedRequest(endpoint, options = {}) {
    const token = await AsyncStorage.getItem("authToken");

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      // Handle token expiration
      if (response.status === 401) {
        await AsyncStorage.removeItem("authToken");
        // Navigate to login screen
        // You can use a navigation service or context here
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiHelper;
```

## 5. Required Dependencies

Install these packages in your React Native app:

```bash
npm install @react-native-async-storage/async-storage
# or
yarn add @react-native-async-storage/async-storage
```

## 6. Network Configuration

### For iOS (ios/Info.plist):

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

### For Android (android/app/src/main/AndroidManifest.xml):

```xml
<application
  android:usesCleartextTraffic="true"
  ...>
```

## 7. CORS Setup (Add to your backend)

Add CORS middleware to your Express server:

```javascript
// In your index.js
import cors from "cors";

app.use(
  cors({
    origin: "*", // For development - restrict in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

## Key Features Your API Provides for Mobile:

✅ **User Registration** - Create new accounts  
✅ **User Authentication** - Secure login with JWT  
✅ **Token-based Auth** - Perfect for mobile apps  
✅ **Profile Access** - Get user data with token  
✅ **Secure Password Storage** - bcrypt hashing  
✅ **Token Expiration** - 1-hour security window  
✅ **RESTful Design** - Standard HTTP methods

## Production Considerations:

1. **Use HTTPS** in production
2. **Implement refresh tokens** for better UX
3. **Add rate limiting** to prevent abuse
4. **Implement proper error handling**
5. **Add input validation**
6. **Use environment variables** for API URLs

Your authentication system is mobile-ready! 🚀📱
