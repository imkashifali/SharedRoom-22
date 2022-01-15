const express = require("express");
const app = express();

const DbFile = require("./db");
const roomRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingRoute = require("./routes/bookingRoute");


app.use(express.json());

app.use("/api/rooms", roomRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Node Server Running Successfuly ${port}`);
});
