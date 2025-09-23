# Seeder System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Comrade Backend System                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   Migrations    │    │    Seeders      │                │
│  │                 │    │                 │                │
│  │ • Create Tables │    │ • Populate Data │                │
│  │ • Schema Changes│    │ • Admin Users   │                │
│  │ • Indexes       │    │ • Test Data     │                │
│  └─────────────────┘    └─────────────────┘                │
│           │                       │                         │
│           └───────────┬───────────┘                         │
│                       │                                     │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                PostgreSQL Database                      │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐   │ │
│  │  │                users table                      │   │ │
│  │  │                                                 │   │ │
│  │  │  id │ username │ password │ createdAt │ updatedAt │   │ │
│  │  │  1  │ admin    │ $2b$10...│ 2025-01-22│ 2025-01-22│   │ │
│  │  │  2  │ commander│ $2b$10...│ 2025-01-22│ 2025-01-22│   │ │
│  │  │  3  │ soldier  │ $2b$10...│ 2025-01-22│ 2025-01-22│   │ │
│  │  └─────────────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Seeder Flow

```
1. npm run seed:admin
   │
   ▼
2. Load seeder file
   │
   ▼
3. Hash password with bcrypt
   │
   ▼
4. Insert into users table
   │
   ▼
5. Verify insertion
   │
   ▼
6. Success confirmation
```

## File Structure

```
com-rade-backend/
├── seeders/
│   ├── 20250122000000-create-admin-user.js
│   │   ├── up() function
│   │   │   ├── Hash password
│   │   │   ├── Insert admin user
│   │   │   └── Add timestamps
│   │   └── down() function
│   │       └── Remove admin user
│   │
│   └── 20250122000001-create-additional-users.js
│       ├── up() function
│       │   ├── Hash multiple passwords
│       │   ├── Insert multiple users
│       │   └── Add timestamps
│       └── down() function
│           └── Remove all seeded users
│
├── package.json
│   └── scripts section
│       ├── "seed": "sequelize-cli db:seed:all"
│       ├── "seed:undo": "sequelize-cli db:seed:undo:all"
│       ├── "seed:admin": "sequelize-cli db:seed --seed 20250122000000-create-admin-user.js"
│       └── "seed:users": "sequelize-cli db:seed --seed 20250122000001-create-additional-users.js"
│
└── config/
    └── config.json
        └── Database configuration
```

## Security Architecture

```
Password Input: "admin123"
        │
        ▼
┌─────────────────┐
│   bcrypt.hash() │ ← Salt rounds: 10
└─────────────────┘
        │
        ▼
Hashed Output: "$2b$10$UKscvs/hvaf0g..."
        │
        ▼
┌─────────────────┐
│   Database      │ ← Stored securely
│   (users table) │
└─────────────────┘
```

## Command Execution Flow

```
User Command: npm run seed:admin
        │
        ▼
┌─────────────────┐
│   package.json  │ ← Script lookup
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ sequelize-cli   │ ← CLI execution
│ db:seed         │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│   Seeder File   │ ← File execution
│   (up function) │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│   Database      │ ← Data insertion
│   Operation     │
└─────────────────┘
```

## Data Flow

```
1. Seeder Execution
   │
   ▼
2. Password Hashing
   │
   ▼
3. Data Preparation
   │
   ▼
4. Database Insert
   │
   ▼
5. Verification
   │
   ▼
6. Success Response
```

## Error Handling

```
Error Occurrence
        │
        ▼
┌─────────────────┐
│   Error Log     │ ← Detailed error message
└─────────────────┘
        │
        ▼
┌─────────────────┐
│   Rollback      │ ← Automatic cleanup
│   (if needed)   │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│   User          │ ← Error notification
│   Notification  │
└─────────────────┘
```

## Dependencies

```
Seeder System
        │
        ├── bcrypt (password hashing)
        ├── sequelize-cli (CLI tool)
        ├── pg (PostgreSQL driver)
        └── dotenv (environment variables)
```

## Environment Integration

```
Development Environment
        │
        ├── config/config.json
        ├── .env file
        ├── PostgreSQL database
        └── Node.js runtime
```

---

This architecture ensures secure, reliable, and maintainable database seeding for the Comrade backend system.
