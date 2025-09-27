const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ connected: true, time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ connected: false, error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `✅ Server running on port http://localhost:${
      process.env.PORT || 5000
    }/api/health`
  );
});
