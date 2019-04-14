'use strict';

const PersonRepository = require('../repositories/personRepository');

var redis = require('redis');

//var client = redis.createClient();
var client = redis.createClient(6379, 'redis')

exports.get = (req, res) => {

    client.get('allpersons', function (err, reply) {

        if (reply) {
            console.log('redis');
            res.send(reply)
        } else {
            console.log('db');

            PersonRepository.getAll()
                .then((person) => {
                    client.set('allpersons', JSON.stringify(person));
                    client.expire('allpersons', 10);
                    res.status(200).send(person);
                }).catch(err => res.status(500).send(err))
        }
    });

};

exports.getById = (req, res) => {
    const _id = req.params.id;

    PersonRepository.getById(_id)
        .then((person) => {
            res.status(200).send(person);
        }).catch(err => res.status(500).send(err))
};

exports.post = (req, res) => {
    const vm = req.body;

    PersonRepository.create(vm)
        .then((person) => {
            res.status(200).send(person);
        }).catch(err => res.status(500).send(err))
};
