import db from "./models/index.js";
import dotenv from "dotenv";
dotenv.config();

async function viewDatabase() {
  try {
    console.log("🔍 Connecting to database...");

    // Test database connection
    await db.sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Get all users
    console.log("\n👥 Users in database:");
    const users = await db.User.findAll({
      attributes: ["id", "username", "createdAt", "updatedAt"], // Exclude password for security
    });

    if (users.length === 0) {
      console.log("📭 No users found in database.");
    } else {
      console.table(
        users.map((user) => ({
          ID: user.id,
          Username: user.username,
          Created: user.createdAt,
          Updated: user.updatedAt,
        }))
      );
    }

    // Show database info
    console.log("\n📊 Database Information:");
    console.log(`Database Name: ${db.sequelize.config.database}`);
    console.log(`Host: ${db.sequelize.config.host}`);
    console.log(`Dialect: ${db.sequelize.config.dialect}`);

    // Show table structure
    console.log("\n🏗️  Table Structure:");
    const tables = await db.sequelize.getQueryInterface().showAllTables();
    console.log("Tables:", tables);

    // Close connection
    await db.sequelize.close();
    console.log("\n✅ Database connection closed.");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

viewDatabase();
