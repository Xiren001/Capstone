export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM(
          "SYSTEM_ADMIN",
          "FIELD_COMMANDER",
          "UNIT_COMMANDER",
          "SOLDIER"
        ),
        allowNull: false,
        defaultValue: "SOLDIER",
      },
    },
    {
      tableName: "users", // Specify the correct table name
    }
  );

  User.associate = function (models) {
    // associations can be defined here
  };

  return User;
};
