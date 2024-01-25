require('dotenv').config()
const core = {};
// const smtpTransport = require('nodemailer-smtp-transport')
const ejs = require('ejs');

core.uuid = require('uuid');

core.env = process.env

core.axios = require("axios");

core.jwt = require('jsonwebtoken')
core.CryptoJS = require("crypto-js")

const moment = require('moment')
core.moment = require('moment')

core.bodyParser = require('body-parser');

core.baseUrlJAJA = 'https://jaja.id/backend/'

core.baseUrl = 'http://103.235.73.11:2030/'

core.getPagination = (limit, querypage) => {
    let offset = limit * (querypage == 0 || !querypage ? 0 : querypage - 1)
    limit = !querypage ? null : limit
    offset = !querypage ? null : offset

    return { limit, offset };
}

core.rupiah = (number) => {
    var reverse = number.toString().split("").reverse().join(""),
        ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return "Rp " + ribuan;
}

core.sumArray = (input) => {
    if (toString.call(input) !== "[object Array]") {
        return false;
    }

    var total = 0;
    for (var i = 0; i < input.length; i++) {
        if (isNaN(input[i])) {
            continue;
        }
        total += Number(input[i]);
    }
    return total;
}

core.slug = (string) => {
    return string.toString().toLowerCase().replace(/\s+/g, '-');
}

core.dbConnect = () => {
    const dbConfig = require("./db.config");
    const Sequelize = require("sequelize");

    return new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        quoteIdentifiers: false,
        define: {
            timestamps: false,
            underscored: true,
            paranoid: false,
        },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        timezone: '+07:00',
        logging: true
    });
}

core.dateFormatStandar = (date) => {
    return moment(date).locale("id").format('DD MMMM YYYY')
}

core.userAgent = require('express-useragent')

core.models = () => {
    const initModels = require("../models/init-models");
    const models = initModels(core.dbConnect());

    return models;
}

core.multer = require('multer')

module.exports = core;