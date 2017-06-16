'use strict';

const mongoose = require('mongoose');
const User = require('../../models/user.model');

function getCurrentCount(req, res) {

    if (!req.headers.authorization) {
        return res.status(401).send("⚠️ No API Key provided ⚠️");
    }

    User.findOne({ apikey: req.headers.authorization }, (err, user) => {
        if (err) {
            return res.status(500).send("Something went wrong with our database :(");
        } else if (user === null) {
            return res.status(404).send("User does not exist with the provided API Key ¯\\_(ツ)_/¯");
        }

        return res.status(200)
            .send({
                count: user.count
            });
    });

}

function updateCurrentCount(req, res) {

    if (!req.headers.authorization) {
        return res.status(401).send("⚠️ No API Key provided ⚠️");
    }

    if (!req.body.count) {
        return res.status(400).send("New count not provided");
    }

    User.findOneAndUpdate({ apikey: req.headers.authorization }, { count: req.body.count }, { new: true }, (err, user) => {
        if (err) {
            return res.status(500).send("Something went wrong with our database :(");
        } else if (user === null) {
            return res.status(404).send("User does not exist with the provided API Key ¯\\_(ツ)_/¯");
        }

        return res.status(200)
        .send({
            count: user.count
        });
    });

}

function getNextCount(req, res) {

    if (!req.headers.authorization) {
        return res.status(401).send("⚠️ No API Key provided ⚠️");
    }

    User.findOne({ apikey: req.headers.authorization }, (err, user) => {
        if (err) {
            return res.status(500).send("Something went wrong with our database :(");
        } else if (user === null) {
            return res.status(404).send("User does not exist with the provided API Key ¯\\_(ツ)_/¯");
        }

        user.count += 1;
        user.save((err, user) => {
            if (err) {
                return res.status(500).send("Something went wrong with our database :(");
            }
        });

        return res.status(200)
            .send({
                count: user.count
            });
    });

}

module.exports = {
    getCurrentCount: getCurrentCount,
    updateCurrentCount: updateCurrentCount,
    getNextCount: getNextCount
}
