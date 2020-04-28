const PORT=8000;
const express = require('express');
const bodyparser = require('body-parser');
const topicsRoutes = require('./routes/topicsRoutes');

var cors = require('cors');
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cors());
app.use("/topics",topicsRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
