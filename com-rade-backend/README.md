# Comrade Backend

A secure backend API for the Comrade military communication platform built with Node.js, Express, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone and navigate to backend directory**:

   ```bash
   cd /Applications/XAMPP/xamppfiles/htdocs/Capstone/com-rade-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up database**:

   ```bash
   # Run migrations
   npm run migrate

   # Create admin user
   npm run seed:admin
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

## 📋 Available Scripts

### Database Management

```bash
npm run migrate          # Run database migrations
npm run migrate:undo     # Undo last migration
npm run migrate:undo:all # Undo all migrations
```

### Seeder Management

```bash
npm run seed             # Run all seeders
npm run seed:undo        # Undo all seeders
npm run seed:admin       # Create admin user
npm run seed:users       # Create additional users
```

## 🗄️ Database Schema

### Users Table

- `id` - Primary key (auto-increment)
- `username` - User's username (string)
- `password` - Hashed password (string)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## 👤 Default Users

After running seeders, you'll have these users available:

| Username    | Password       | Role                 |
| ----------- | -------------- | -------------------- |
| `admin`     | `admin123`     | System Administrator |
| `commander` | `commander123` | Commander            |
| `soldier`   | `soldier123`   | Soldier              |

## 🔐 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Protection against brute force
- **CORS**: Cross-origin resource sharing configured
- **Input Validation**: Data validation and sanitization

## 📁 Project Structure

```
com-rade-backend/
├── config/
│   ├── config.json          # Database configuration
│   └── passport.js          # Passport.js configuration
├── migrations/
│   └── 20250919164536-create-user.js
├── models/
│   ├── index.js            # Sequelize models
│   └── user.js             # User model
├── routes/
│   └── auth.js             # Authentication routes
├── seeders/
│   ├── 20250122000000-create-admin-user.js
│   └── 20250122000001-create-additional-users.js
├── utils/
│   ├── auth.js             # Authentication utilities
│   └── passwordPolicy.js   # Password policy validation
├── index.js                # Main server file
├── database.js             # Database connection
└── package.json            # Dependencies and scripts
```

## 🛠️ Configuration

### Database Configuration

Edit `config/config.json`:

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

### Environment Variables

Create a `.env` file:

```env
PGUSER=postgres
PGHOST=127.0.0.1
PGDATABASE=Comrade
PGPASSWORD=your_password
DBPORT=5432
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## 📚 Documentation

- [Seeder Documentation](./SEEDER_DOCUMENTATION.md) - Comprehensive seeder guide
- [Seeder Quick Reference](./SEEDER_QUICK_REFERENCE.md) - Quick command reference
- [Auth Documentation](./AUTH_DOCUMENTATION.md) - Authentication system guide

## 🔧 Development

### Adding New Models

1. **Create migration**:

   ```bash
   npx sequelize-cli migration:generate --name create-new-model
   ```

2. **Create model**:

   ```bash
   npx sequelize-cli model:generate --name NewModel --attributes name:string
   ```

3. **Run migration**:
   ```bash
   npm run migrate
   ```

### Adding New Seeders

1. **Generate seeder**:

   ```bash
   npx sequelize-cli seed:generate --name create-new-data
   ```

2. **Edit seeder file** in `seeders/` directory

3. **Run seeder**:
   ```bash
   npm run seed
   ```

## 🧪 Testing

### Database Testing

```bash
# Check if database is connected
node ForCheckingDatabaseConnected.js

# View database tables
psql -U postgres -d Comrade -c "\dt"

# Check users
psql -U postgres -d Comrade -c "SELECT * FROM users;"
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Check PostgreSQL is running
   - Verify credentials in `config/config.json`
   - Ensure database exists

2. **Migration Errors**

   - Check if database exists
   - Verify user permissions
   - Run migrations in order

3. **Seeder Errors**
   - Ensure migrations are run first
   - Check table names (use lowercase)
   - Verify bcrypt import

### Getting Help

1. Check the documentation files
2. Review error messages carefully
3. Verify your configuration
4. Check database connectivity

## 📄 License

This project is part of the Comrade military communication platform.

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper documentation
3. Test your changes
4. Update relevant documentation

---

**Last Updated**: January 22, 2025  
**Version**: 1.0.0
