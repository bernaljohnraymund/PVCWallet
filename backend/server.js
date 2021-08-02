const express = require('express');
const app = express();

app.listen({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT || 4000,
})