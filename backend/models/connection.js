let mongoose = require('mongoose');

const DB_PROTOCOL       = process.env.DB_PROTOCOL;
const DB_USER           = process.env.DB_USER;
const DB_PASS           = process.env.DB_PASSWORD;
const DB_HOST           = process.env.DB_HOST;
const DB_PORT           = process.env.DB_PORT || 27017;
const DB_NAME           = process.env.DB_NAME;
const mongoUri          = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

mongoose = mongoose.createConnection(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

module.exports = mongoose;