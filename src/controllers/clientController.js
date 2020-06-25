const Client = require('../models/client');
const http = require('http');
const { CLIENTS_URL } = require('../properties/application.properties');


function getClients(req, res) {

    let request_call = new Promise((resolve, reject) => {
        http.get(CLIENTS_URL, (response) => {
            let chunks_of_data = [];

            response.on('data', (fragments) => {
                chunks_of_data.push(fragments);
            });

            response.on('end', () => {
                let response_body = Buffer.concat(chunks_of_data);
                resolve(response_body.toString());
            });

            response.on('error', (error) => {
                reject(error);
            });
        });
    });

    request_call.then((response) => {
        if (!response.empty) {
            res.status(200).send(JSON.parse(response));
        } else {
            res.status(404).send({ message: "No results" });
        }
    }).catch((error) => {
        res.status(500).send({ message: error })
    });

}

//Get user data filtered by user id -> Can be accessed by users with role "users" and "admin"
function getClientById(req, res) {

    clientId = req.params.id;

    let request_call = new Promise((resolve, reject) => {
        http.get(CLIENTS_URL, (response) => {
            let chunks_of_data = [];

            response.on('data', (fragments) => {
                chunks_of_data.push(fragments);
            });

            response.on('end', () => {
                let response_body = Buffer.concat(chunks_of_data);
                resolve(response_body.toString());
            });

            response.on('error', (error) => {
                reject(error);
            });
        });
    });

    request_call.then((response) => {
        if (!response.empty) {
            const client = JSON.parse(response).clients.find(it => it.id === clientId);
            if (client) {
                res.status(200).send(client);
            } else {
                res.status(404).send({ message: `No user with id '${clientId}'` });
            }
        } else {
            res.status(404).send({ message: `No results` });
        }
    }).catch((error) => {
        res.status(500).send({ message: error })
    });

}


//Get user data filtered by user name -> Can be accessed by users with role "users" and "admin"
function getClientByUsername(req, res) {

    const clientUsername = req.params.username;

    let request_call = new Promise((resolve, reject) => {
        http.get(CLIENTS_URL, (response) => {
            let chunks_of_data = [];

            response.on('data', (fragments) => {
                chunks_of_data.push(fragments);
            });

            response.on('end', () => {
                let response_body = Buffer.concat(chunks_of_data);
                resolve(response_body.toString());
            });

            response.on('error', (error) => {
                reject(error);
            });
        });
    });

    request_call.then((response) => {

        if (!response.empty) {

            const client = JSON.parse(response).clients.find(it => it.name === clientUsername)

            if (client) {
                res.status(200).send(client);
            } else {
                res.status(404).send({ message: `No user with id '${clientUsername}' not found` });
            }

        } else {
            res.status(404).send({ message: `No results` });
        }

    }).catch((error) => {
        res.status(500).send({ message: error })
    });

}


module.exports = {
    getClients,
    getClientById,
    getClientByUsername
}