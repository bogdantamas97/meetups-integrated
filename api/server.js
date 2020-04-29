const PORT=8000;
const express = require('./node_modules/express');
const bodyparser = require('./node_modules/body-parser');
const loginRoutes = require('./routes/loginRoutes');

var cors = require('./node_modules/cors/lib');
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cors());
app.use("/",loginRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
