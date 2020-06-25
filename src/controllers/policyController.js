var Policie = require('../models/policy');
const http = require('http');
const { POLICIES_URL } = require('../properties/application.properties');


function getPolicies(req, res) {

    let request_call = new Promise((resolve, reject) => {
        http.get(POLICIES_URL, (response) => {
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
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });

}

//Get the list of policies linked to a user id -> Can be accessed by users with role "admin" and by the own user
function getPoliciesByClientId(req, res) {

    const clientId = req.params.clientId;

    let request_call = new Promise((resolve, reject) => {
        http.get(POLICIES_URL, (response) => {
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
            
            const policies = JSON.parse(response).policies.find(it => it.clientId === clientId);

            if (policies) {
                res.status(200).send(policies);
            } else {
                res.status(404).send({ message: `No policies assigned to user with id '${clientId}'` });
            }
            
        } else {
            res.status(404).send({ message: `No results` });
        }
    }).catch((error) => {
        console.log(error);
    });

}


module.exports = {
    getPolicies,
    getPoliciesByClientId
}