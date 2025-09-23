# Seeder Quick Reference Guide

## 🚀 Quick Start

```bash
# Navigate to backend directory
cd /Applications/XAMPP/xamppfiles/htdocs/Capstone/com-rade-backend

# Run migrations (if needed)
npm run migrate

# Create admin user
npm run seed:admin

# Create additional users
npm run seed:users

# Run all seeders
npm run seed
```

## 📋 Available Commands

| Command              | Description             | Example              |
| -------------------- | ----------------------- | -------------------- |
| `npm run seed`       | Run all seeders         | `npm run seed`       |
| `npm run seed:undo`  | Undo all seeders        | `npm run seed:undo`  |
| `npm run seed:admin` | Create admin user only  | `npm run seed:admin` |
| `npm run seed:users` | Create additional users | `npm run seed:users` |

## 👤 Created Users

### Admin User

- **Username**: `admin`
- **Password**: `admin123`
- **Role**: System Administrator

### Additional Users

- **commander**: `commander123`
- **soldier**: `soldier123`

## 🔐 Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ No plain text passwords stored
- ✅ Proper timestamps included
- ✅ Rollback functionality available

## 🛠️ Troubleshooting

### Check if users were created

```bash
# Using Node.js script
node -e "
import('./models/index.js').then(async (db) => {
  const users = await db.User.findAll();
  console.log('Users:', users.map(u => ({ id: u.id, username: u.username })));
  process.exit(0);
});
"
```

### Reset and reseed

```bash
# Undo all seeders
npm run seed:undo

# Run all seeders again
npm run seed
```

## 📁 File Locations

- **Seeders**: `seeders/` directory
- **Config**: `config/config.json`
- **Documentation**: `SEEDER_DOCUMENTATION.md`

## ⚡ Common Tasks

### Create new seeder

```bash
npx sequelize-cli seed:generate --name create-new-data
```

### Check seeder status

```bash
npx sequelize-cli db:seed:status
```

### Run specific seeder

```bash
npx sequelize-cli db:seed --seed filename.js
```

---

**Need help?** Check the full documentation in `SEEDER_DOCUMENTATION.md`
