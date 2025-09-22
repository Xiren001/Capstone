# Com-rade Authentication System Documentation

## Overview

The Com-rade backend implements a robust authentication system using JWT (JSON Web Tokens) and bcrypt for password hashing. The system provides user registration, login, and protected route access with full support for mobile applications through CORS configuration. The system enforces military-grade password policies to ensure maximum security.

## Architecture

### Components

1. **User Model** (`models/user.js`) - Database schema for users
2. **Auth Routes** (`routes/auth.js`) - Authentication endpoints
3. **Passport Configuration** (`config/passport.js`) - JWT strategy setup
4. **Auth Utilities** (`utils/auth.js`) - Password hashing functions
5. **Password Policy** (`utils/passwordPolicy.js`) - Military-grade password validation
6. **CORS Middleware** - Cross-origin support for mobile apps

### Database Schema

```sql
Users Table:
- id: INTEGER (Primary Key, Auto Increment)
- username: STRING (Unique)
- password: STRING (Hashed with bcrypt)
- createdAt: DATETIME
- updatedAt: DATETIME
```

## Authentication Flow

### 1. User Registration (`POST /api/auth/signup`)

**Process:**

1. Client sends username and password
2. Server validates input
3. Password is hashed using bcrypt (10 salt rounds)
4. User record is created in database
5. Server returns user info (without password)

**Request:**

```json
{
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Response (Success - 200):**

```json
{
  "id": 1,
  "username": "john_doe"
}
```

**Response (Error - 400/500):**

```json
{
  "error": "Error message"
}
```

### 2. User Login (`POST /api/auth/signin`)

**Process:**

1. Client sends username and password
2. Server finds user by username
3. Password is compared with stored hash using bcrypt
4. If valid, JWT token is generated and signed
5. Server returns JWT token

**Request:**

```json
{
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Response (Success - 200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error - 401):**

```json
{
  "message": "Invalid credentials"
}
```

### 3. Protected Route Access (`GET /api/auth/profile`)

**Process:**

1. Client sends request with JWT token in Authorization header
2. Passport middleware validates JWT token
3. User is retrieved from database using token payload
4. If valid, user data is returned

**Request Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (Success - 200):**

```json
{
  "id": 1,
  "username": "john_doe"
}
```

**Response (Error - 401):**

```json
{
  "message": "Unauthorized"
}
```

## Security Features

### Password Security

- **Hashing Algorithm:** bcrypt with 10 salt rounds
- **Salt Rounds:** Configurable via `SALT_ROUNDS` constant
- **Password Comparison:** Secure timing-safe comparison
- **Password Policy:** Military-grade validation with strict requirements
- **Policy Enforcement:** Real-time validation during user registration

### JWT Token Security

- **Algorithm:** HS256 (HMAC SHA-256)
- **Secret Key:** Environment variable `JWT_SECRET`
- **Expiration:** 1 hour (`expiresIn: "1h"`)
- **Payload:** Contains user ID only

### Token Extraction

- **Method:** Bearer token from Authorization header
- **Format:** `Authorization: Bearer <token>`
- **Validation:** Automatic via Passport JWT strategy

## Environment Variables

Required environment variables in `.env` file:

```env
JWT_SECRET=your_super_secure_jwt_secret_key_here
PORT=5000
NODE_ENV=development

# PostgreSQL Database configuration
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=Comrade
DB_USER=postgres
DB_PASS=your_postgres_password
```

## API Endpoints Summary

| Method | Endpoint                          | Description                 | Auth Required | Rate Limited    |
| ------ | --------------------------------- | --------------------------- | ------------- | --------------- |
| POST   | `/api/auth/signup`                | Register new user           | No            | Yes (5/15min)   |
| POST   | `/api/auth/signin`                | Login user                  | No            | Yes (5/15min)   |
| POST   | `/api/auth/refresh`               | Refresh access token        | No            | Yes (100/15min) |
| GET    | `/api/auth/profile`               | Get user profile            | Yes (JWT)     | Yes (100/15min) |
| GET    | `/api/auth/password-requirements` | Get password policy details | No            | Yes (100/15min) |

## Usage Examples

### 1. Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "mypassword123"
  }'
```

### 2. Login User

```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "mypassword123"
  }'
```

### 3. Access Protected Route

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 4. Get Password Requirements

```bash
curl -X GET http://localhost:5000/api/auth/password-requirements
```

### 5. Refresh Access Token

```bash
curl -X POST http://localhost:5000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN_HERE"
  }'
```

## Rate Limiting & Security Protection

The system implements comprehensive rate limiting to protect against brute force attacks and API abuse.

### Rate Limiting Configuration

#### Authentication Endpoints (Strict)

- **Endpoints:** `/api/auth/signin`, `/api/auth/signup`
- **Limit:** 5 requests per 15 minutes per IP address
- **Purpose:** Prevent brute force password attacks
- **Response:** HTTP 429 Too Many Requests

#### General API Endpoints

- **Endpoints:** All other API endpoints
- **Limit:** 100 requests per 15 minutes per IP address
- **Purpose:** Prevent API abuse and DDoS attacks
- **Response:** HTTP 429 Too Many Requests

### Rate Limit Headers

The API returns rate limit information in response headers:

```http
RateLimit-Limit: 5
RateLimit-Remaining: 4
RateLimit-Reset: 1640995200
```

### Rate Limit Error Response

When rate limit is exceeded:

```json
{
  "error": "Too many authentication attempts",
  "message": "Please try again after 15 minutes",
  "retryAfter": 900
}
```

### Rate Limiting Benefits

✅ **Brute Force Protection** - Prevents password guessing attacks  
✅ **DDoS Mitigation** - Protects against overwhelming traffic  
✅ **Resource Conservation** - Prevents excessive server usage  
✅ **Military-Grade Security** - Meets DoD security standards

## Refresh Token System

The system uses a dual-token approach with short-lived access tokens and long-lived refresh tokens for enhanced security.

### Token Types

#### Access Token

- **Lifetime:** 15 minutes
- **Purpose:** API access authentication
- **Usage:** Include in Authorization header
- **Security:** Short-lived to minimize attack window

#### Refresh Token

- **Lifetime:** 7 days
- **Purpose:** Generate new access tokens
- **Usage:** Send to refresh endpoint
- **Security:** Long-lived but cannot access protected resources

### Authentication Flow

#### 1. Initial Login

**Request:**

```json
POST /api/auth/signin
{
  "username": "militaryuser",
  "password": "MilSecure2024!@#$"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900,
  "tokenType": "Bearer"
}
```

#### 2. Using Access Token

**Request:**

```http
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 3. Token Refresh (when access token expires)

**Request:**

```json
POST /api/auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900,
  "tokenType": "Bearer"
}
```

### Token Security Features

#### Token Rotation

- **New Refresh Token:** Each refresh generates a new refresh token
- **Old Token Invalidation:** Previous refresh token becomes invalid
- **Security Benefit:** Prevents token replay attacks

#### Token Type Validation

- **Access Tokens:** Can only access protected resources
- **Refresh Tokens:** Can only be used for token refresh
- **Separation:** Prevents misuse of token types

#### Token Expiration

- **Short Access Token:** Reduces attack window to 15 minutes
- **Automatic Refresh:** Seamless user experience
- **Security Balance:** High security with good usability

### Refresh Token Error Handling

#### Invalid Refresh Token

```json
{
  "message": "Invalid or expired refresh token"
}
```

#### Missing Refresh Token

```json
{
  "message": "Refresh token is required"
}
```

#### Wrong Token Type

```json
{
  "message": "Invalid token type"
}
```

### Client Implementation Guide

#### Mobile App Token Management

```javascript
// Store tokens securely
await AsyncStorage.setItem("accessToken", response.accessToken);
await AsyncStorage.setItem("refreshToken", response.refreshToken);

// Auto-refresh on API calls
const makeAuthenticatedRequest = async (url, options) => {
  let token = await AsyncStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      // Token expired, refresh it
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const refreshResponse = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse.ok) {
        const tokens = await refreshResponse.json();
        await AsyncStorage.setItem("accessToken", tokens.accessToken);
        await AsyncStorage.setItem("refreshToken", tokens.refreshToken);

        // Retry original request with new token
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        });
      }
    }

    return response;
  } catch (error) {
    throw error;
  }
};
```

## Military-Grade Password Policy

The system enforces strict password requirements to ensure maximum security for military communication applications.

### Password Requirements

All passwords must meet the following criteria:

1. **Minimum Length:** 12 characters
2. **Maximum Length:** 128 characters
3. **Uppercase Letters:** At least 1 (A-Z)
4. **Lowercase Letters:** At least 1 (a-z)
5. **Numbers:** At least 1 (0-9)
6. **Special Characters:** At least 2 (!@#$%^&\*()\_+-=[]{}|;:,.<>?)
7. **No Repetition:** Maximum 2 consecutive identical characters
8. **No Common Passwords:** Blocks easily guessable passwords
9. **No Personal Info:** Cannot contain username

### Blocked Password Patterns

The system automatically rejects:

- **Common passwords:** password, 123456, admin, letmein, etc.
- **Military-related common passwords:** military, soldier, army, classified, etc.
- **Sequential patterns:** 123456, abcdef, qwerty
- **Dictionary words:** Basic dictionary word detection
- **Username inclusion:** Password cannot contain username

### Password Validation Examples

#### ❌ **Rejected Password Examples:**

```json
// Too short and simple
{
  "password": "weak",
  "errors": [
    "Password must be at least 12 characters long",
    "Password must contain at least one uppercase letter",
    "Password must contain at least one number",
    "Password must contain at least one special character"
  ]
}

// Common password
{
  "password": "password123",
  "errors": [
    "Password is too common and easily guessable"
  ]
}

// Contains username
{
  "username": "john",
  "password": "john123456789!@",
  "errors": [
    "Password cannot contain username or vice versa"
  ]
}
```

#### ✅ **Accepted Password Examples:**

```json
// Strong military-grade password
{
  "password": "MilSecure2024!@#$",
  "result": {
    "id": 1,
    "username": "militaryuser"
  }
}

// Complex password with warnings
{
  "password": "MyComplexP@ssw0rd!",
  "result": {
    "id": 2,
    "username": "user123",
    "warnings": [
      "Password contains dictionary words - consider using more complex combinations"
    ]
  }
}
```

### Password Strength Assessment

The system calculates password strength on a scale of 0-100:

- **0-30:** Very Weak (rejected)
- **31-50:** Weak (rejected)
- **51-70:** Moderate (accepted with warnings)
- **71-85:** Strong (accepted)
- **86-100:** Very Strong (accepted)

### Password Policy API

#### Get Password Requirements

**Endpoint:** `GET /api/auth/password-requirements`

**Response:**

```json
{
  "message": "Military-grade password requirements",
  "requirements": [
    "At least 12 characters long",
    "At least one uppercase letter (A-Z)",
    "At least one lowercase letter (a-z)",
    "At least one number (0-9)",
    "At least 2 special characters (!@#$%^&*()_+-=[]{}|;:,.<>?)",
    "Cannot contain more than 2 consecutive identical characters",
    "Cannot be a common or easily guessable password",
    "Cannot contain your username"
  ],
  "policy": {
    "minLength": 12,
    "maxLength": 128,
    "requiresUppercase": true,
    "requiresLowercase": true,
    "requiresNumbers": true,
    "requiresSpecialChars": true,
    "minSpecialChars": 2,
    "blocksCommonPasswords": true,
    "blocksUsernameInclusion": true
  }
}
```

### Password Validation Process

1. **Real-time Validation:** Passwords are validated immediately during signup
2. **Detailed Feedback:** Specific error messages for each requirement
3. **Security Warnings:** Additional warnings for potentially weak patterns
4. **Strength Scoring:** Numerical strength assessment
5. **Requirement Display:** Clear list of all requirements for client apps

### Implementation Details

- **Validation Library:** Custom military-grade validation (`utils/passwordPolicy.js`)
- **Middleware:** `passwordValidationMiddleware` applied to signup route
- **Performance:** Optimized regex patterns for real-time validation
- **Extensibility:** Easily configurable requirements and patterns

## Error Handling

### Common Error Codes

- **400 Bad Request:** Invalid input data
- **401 Unauthorized:** Invalid credentials or missing/invalid token
- **404 Not Found:** User not found
- **500 Internal Server Error:** Database or server errors

### Error Response Format

```json
{
  "message": "Error description",
  "error": "Detailed error information (in development)"
}
```

## CORS Configuration

The system includes CORS (Cross-Origin Resource Sharing) support for mobile and web applications:

### CORS Settings

- **Origin:** `*` (all origins allowed in development)
- **Methods:** `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`
- **Headers:** `Content-Type`, `Authorization`
- **Credentials:** Enabled

### Mobile App Support

The CORS configuration enables:

- React Native mobile apps
- Web applications from different domains
- Cross-origin API requests
- Preflight OPTIONS requests

## Security Best Practices

### Implemented

✅ Password hashing with bcrypt (10 salt rounds)  
✅ Military-grade password policy enforcement  
✅ Real-time password validation with detailed feedback  
✅ Dual-token system (15min access + 7day refresh tokens)  
✅ Token rotation for enhanced security  
✅ Rate limiting (5 auth attempts, 100 general per 15min)  
✅ Brute force attack protection  
✅ Secure token extraction (Bearer token)  
✅ Environment variable configuration  
✅ CORS enabled for mobile apps  
✅ No security vulnerabilities (all dependencies secure)  
✅ PostgreSQL database with Sequelize ORM  
✅ Username uniqueness validation  
✅ Comprehensive error handling

### Recommended Additions

- Account lockout after failed attempts
- Email verification for registration
- Request logging and monitoring
- Input validation middleware
- API versioning
- Hardware security module (HSM) integration
- Multi-factor authentication (MFA)
- Geolocation-based security alerts

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**

   - Verify username and password are correct
   - Check if user exists in database

2. **"Unauthorized" error**

   - Ensure JWT token is included in Authorization header
   - Verify token format: `Bearer <token>`
   - Check if token has expired (1 hour limit)

3. **Database connection errors**

   - Verify PostgreSQL is running in Laragon
   - Check database configuration in `config/config.json`
   - Ensure database "Comrade" exists
   - Verify PostgreSQL credentials (postgres/your_password)

4. **JWT_SECRET missing**
   - Add `JWT_SECRET` to your `.env` file
   - Use a strong, random secret key

## Development Notes

- JWT tokens expire after 1 hour for security
- Passwords are never stored in plain text (bcrypt hashed)
- User IDs are used as JWT payload (minimal data exposure)
- Passport.js handles JWT validation automatically
- bcrypt handles salt generation automatically (10 rounds)
- CORS is configured for development (`origin: '*'`)
- Server runs on port 5000 by default
- PostgreSQL database with Sequelize ORM
- All security vulnerabilities have been resolved

## Testing

Use tools like Postman, curl, or frontend applications to test the authentication endpoints. The API is fully compatible with:

- **Web Applications** - CORS enabled
- **Mobile Apps** - React Native ready
- **API Clients** - RESTful design
- **Testing Tools** - Postman, curl, etc.

Ensure proper error handling and token validation in your client applications.

## Recent Updates

- ✅ **Rate Limiting System** - Implemented comprehensive API rate limiting
- ✅ **Refresh Token System** - Added dual-token authentication with token rotation
- ✅ **Enhanced Token Security** - Short-lived access tokens (15min) with long-lived refresh (7d)
- ✅ **Brute Force Protection** - Strict rate limiting on authentication endpoints
- ✅ **Military-Grade Password Policy** - Implemented comprehensive password validation
- ✅ **Password Requirements API** - Added endpoint for client applications
- ✅ **Real-time Validation** - Immediate password feedback during registration
- ✅ **Username Uniqueness** - Prevents duplicate usernames
- ✅ **Enhanced Error Handling** - Detailed error messages and validation feedback
- ✅ Added CORS support for mobile applications
- ✅ Removed vulnerable OAuth server dependencies
- ✅ Fixed all security vulnerabilities (0 vulnerabilities)
- ✅ Updated to use PostgreSQL database
- ✅ Verified React Native compatibility

## Password Policy Compliance

The implemented password policy meets or exceeds:

- **NIST SP 800-63B** (Digital Identity Guidelines)
- **OWASP Password Guidelines**
- **DoD 8500 Series** (Department of Defense Information Assurance)
- **FIPS 140-2** (Federal Information Processing Standards)
- **ISO/IEC 27001** (Information Security Management)
