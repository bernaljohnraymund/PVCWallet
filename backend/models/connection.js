let mongoose = require('mongoose');

const DB_PROTOCOL       = process.env.DB_PROTOCOL;
const DB_USER           = process.env.DB_USER;
const DB_PASS           = process.env.DB_PASSWORD;
const DB_HOST           = process.env.DB_HOST;
const DB_PORT           = process.env.DB_PORT || 27017;
const DB_NAME           = process.env.DB_NAME;
const mongoUri          = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

const LOCAL_DB_PROTOCOL = process.env.LOCAL_DB_PROTOCOL;
const LOCAL_DB_USER     = process.env.LOCAL_DB_USER;
const LOCAL_DB_PASS     = process.env.LOCAL_DB_PASSWORD;
const LOCAL_DB_HOST     = process.env.LOCAL_DB_HOST;
const LOCAL_DB_PORT     = process.env.LOCAL_DB_PORT || 27017;
const LOCAL_DB_NAME     = process.env.LOCAL_DB_NAME;
const localMongoUri     = `${LOCAL_DB_PROTOCOL}://${LOCAL_DB_USER}:${LOCAL_DB_PASS}@${LOCAL_DB_HOST}/${LOCAL_DB_NAME}?authSource=admin`;
mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then((a) => {
    console.log('database connection created');
}).catch( err => {
    console.log(err)
})
mongoose.pluralize(null)


module.exports = mongoose;