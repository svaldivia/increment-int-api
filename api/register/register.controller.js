'use strict';

const mongoose = require('mongoose');
const User = require('../../models/user.model');
const uuidV4 = require('uuid/v4');

function registerUser(req, res) {
    let apikey = uuidV4();

    var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        apikey: apikey
    });

    // TODO: Handle as a promise?
    newUser.save(function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200)
            .send({
                apikey:apikey
            });
    });
}

module.exports = {
    registerUser: registerUser
};
