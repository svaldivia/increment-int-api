'use strict';

const mongoose = require('mongoose');
const User = require('../../models/user.model');

function loginUser(req, res) {

    if (!req.body || !req.body.email || !req.body.password ) {
        return res.status(400).send("Body provided is not complete");
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(500).send("Something went wrong with our database :(");
        } else if (user === null) {
            return res.status(404).send("User does not exist  ¯\\_(ツ)_/¯");
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send("Something went wrong with our database :(");
            } else if (!isMatch) {
                return res.status(401).send("Password in incorrect 🐒");
            }

            return res.status(200)
                .send({
                    apikey: user.apikey
                });
        })

    });
}

module.exports = {
    loginUser: loginUser
};
