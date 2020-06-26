const http = require('http');
const { POLICIES_URL } = require('../properties/application.properties');


function getPolicies(req, res) {

    if (req.decoded.user) {

        const user = req.decoded.user;

        if (typeof user.role !== "undefined" && (user.role === "user" || user.role === "admin")) {

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
                if (typeof response !== "undefined") {
                    res.status(200).send(JSON.parse(response));
                } else {
                    res.status(404).send({ message: "Error: No results" });
                }
            }).catch((error) => {
                res.status(500).send({ message: error });
            });

        } else {
            res.status(403).send({ message: `Error: You don't have permission to access this resource` });
        }

    } else {
        res.status(404).send({ message: `Error: you must authenticate to access this resource` });
    }

}

//Get the list of policies linked to a user id -> Can be accessed by users with role "admin" and by the own user
function getPoliciesByClientId(req, res) {

    const clientId = req.params.clientId;
    console.log(req.decoded.user.id);
    if (req.decoded.user) {

        const user = req.decoded.user;

        if (typeof user.role !== "undefined" && (user.id === clientId || user.role === "admin")) {

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
                if (response) {

                    const policies = JSON.parse(response).policies.find(it => it.clientId === clientId);

                    if (policies) {
                        res.status(200).send(policies);
                    } else {
                        res.status(404).send({ message: `Error: No policies assigned to user with id '${clientId}'` });
                    }

                } else {
                    res.status(404).send({ message: `Error: No results` });
                }
            }).catch((error) => {
                res.status(500).send({ message: error });
            });

        } else {
            res.status(403).send({ message: `Error: You don't have permission to access this resource` });
        }

    } else {
        res.status(404).send({ message: `Error: you must authenticate to access this resource` });
    }

}


module.exports = {
    getPolicies,
    getPoliciesByClientId
}