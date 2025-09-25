# Seeder Documentation

## Overview

This document provides comprehensive information about the database seeder system for the Comrade backend application. Seeders are used to populate the database with initial data, particularly for creating admin users and test data.

## Table of Contents

1. [What are Seeders?](#what-are-seeders)
2. [Available Seeders](#available-seeders)
3. [Running Seeders](#running-seeders)
4. [Seeder Commands](#seeder-commands)
5. [Security Considerations](#security-considerations)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## What are Seeders?

Seeders are scripts that populate your database with initial data. They are particularly useful for:

- Creating admin users
- Adding test data
- Setting up default configurations
- Populating lookup tables

In our Comrade application, seeders are used to create initial user accounts with proper password hashing.

## Available Seeders

### 1. Admin User Seeder (`20250122000000-create-admin-user.js`)

**Purpose**: Creates the primary admin user for the system.

**Created User**:

- **Username**: `admin`
- **Password**: `admin123` (hashed with bcrypt)
- **Role**: System Administrator

**Features**:

- Password is hashed using bcrypt with 10 salt rounds
- Includes proper timestamps (createdAt, updatedAt)
- Can be rolled back to remove the admin user

### 2. Additional Users Seeder (`20250122000001-create-additional-users.js`)

**Purpose**: Creates additional test users with different roles.

**Created Users**:

- **admin**: `admin123` (duplicate from first seeder)
- **commander**: `commander123`
- **soldier**: `soldier123`

**Features**:

- Multiple users for testing different access levels
- All passwords properly hashed
- Bulk operations for efficiency

## Running Seeders

### Prerequisites

1. **Database Setup**: Ensure your database is created and migrations are run
2. **Dependencies**: Make sure all npm packages are installed
3. **Environment**: Verify your database configuration in `config/config.json`

### Step-by-Step Process

1. **Navigate to Backend Directory**:

   ```bash
   cd /Applications/XAMPP/xamppfiles/htdocs/Capstone/com-rade-backend
   ```

2. **Run Migrations** (if not already done):

   ```bash
   npm run migrate
   ```

3. **Run Seeders**:

   ```bash
   # Run all seeders
   npm run seed

   # Or run specific seeders
   npm run seed:admin
   npm run seed:users
   ```

## Seeder Commands

### Available Scripts

| Command              | Description                 | Usage                |
| -------------------- | --------------------------- | -------------------- |
| `npm run seed`       | Run all seeders             | `npm run seed`       |
| `npm run seed:undo`  | Undo all seeders            | `npm run seed:undo`  |
| `npm run seed:admin` | Run only admin seeder       | `npm run seed:admin` |
| `npm run seed:users` | Run additional users seeder | `npm run seed:users` |

### Manual Seeder Commands

```bash
# Run all seeders
npx sequelize-cli db:seed:all

# Run specific seeder
npx sequelize-cli db:seed --seed 20250122000000-create-admin-user.js

# Undo all seeders
npx sequelize-cli db:seed:undo:all

# Undo specific seeder
npx sequelize-cli db:seed:undo --seed 20250122000000-create-admin-user.js
```

## Security Considerations

### Password Security

- **Hashing**: All passwords are hashed using bcrypt
- **Salt Rounds**: 10 rounds for optimal security/performance balance
- **No Plain Text**: Passwords are never stored in plain text

### Example Password Hashing

```javascript
import bcrypt from "bcrypt";

// Hash a password
const hashedPassword = await bcrypt.hash("admin123", 10);
// Result: $2b$10$UKscvs/hvaf0g...

// Verify a password
const isValid = await bcrypt.compare("admin123", hashedPassword);
// Result: true
```

### Database Security

- **Table Names**: Uses lowercase table names (`users` not `Users`)
- **Timestamps**: Automatic createdAt/updatedAt timestamps
- **Rollback**: All seeders can be safely rolled back

## Troubleshooting

### Common Issues

#### 1. "relation 'Users' does not exist"

**Problem**: Seeder tries to insert into `Users` table but it's named `users`.

**Solution**: Ensure seeder uses lowercase table name:

```javascript
await queryInterface.bulkInsert("users", [...]);
```

#### 2. "No migrations were executed"

**Problem**: Database schema is already up to date.

**Solution**: This is normal. Run the seeder directly:

```bash
npm run seed:admin
```

#### 3. "Password: Permission denied"

**Problem**: PostgreSQL authentication issues.

**Solution**: Check your database configuration in `config/config.json`:

```json
{
  "development": {
    "username": "postgres",
    "password": "your_password",
    "database": "Comrade",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

### Verification Commands

Check if seeders worked correctly:

```bash
# Check database tables
psql -U postgres -d Comrade -c "\dt"

# Check users
psql -U postgres -d Comrade -c "SELECT id, username, password FROM users;"
```

## Best Practices

### 1. Seeder Naming Convention

- Use timestamp prefix: `YYYYMMDDHHMMSS-description.js`
- Descriptive names: `create-admin-user.js`
- Consistent naming: `create-`, `update-`, `delete-`

### 2. Data Integrity

- Always include `createdAt` and `updatedAt` timestamps
- Use proper data types
- Include rollback functionality

### 3. Security

- Never commit plain text passwords
- Always hash passwords with bcrypt
- Use environment variables for sensitive data

### 4. Testing

- Test seeders in development environment first
- Verify data after seeding
- Test rollback functionality

## File Structure

```
com-rade-backend/
├── seeders/
│   ├── 20250122000000-create-admin-user.js
│   └── 20250122000001-create-additional-users.js
├── config/
│   └── config.json
├── package.json
└── SEEDER_DOCUMENTATION.md
```

## Example Usage

### Creating a New Seeder

1. **Generate seeder file**:

   ```bash
   npx sequelize-cli seed:generate --name create-test-data
   ```

2. **Edit the seeder**:

   ```javascript
   "use strict";
   import bcrypt from "bcrypt";

   export default {
     async up(queryInterface, Sequelize) {
       // Your seeding logic here
     },

     async down(queryInterface, Sequelize) {
       // Your rollback logic here
     },
   };
   ```

3. **Run the seeder**:
   ```bash
   npm run seed
   ```

## Database Schema

### Users Table Structure

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);
```

## Environment Variables

Required environment variables for seeding:

```env
PGUSER=postgres
PGHOST=127.0.0.1
PGDATABASE=Comrade
PGPASSWORD=your_password
DBPORT=5432
```

## Support

For issues or questions regarding seeders:

1. Check this documentation
2. Review the troubleshooting section
3. Verify your database configuration
4. Check the Sequelize CLI documentation

## Version History

- **v1.0.0** (2025-01-22): Initial seeder implementation
  - Admin user seeder
  - Additional users seeder
  - Basic security implementation

---

**Last Updated**: January 22, 2025  
**Author**: Comrade Development Team  
**Version**: 1.0.0
