const http = require('http');
const { CLIENTS_URL } = require('../properties/application.properties');


function getClients(req, res) {


    if (req.decoded.user) {

        const user = req.decoded.user;

        if (typeof user.role !== "undefined" && (user.role === "user" || user.role === "admin")) {

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
                if (response) {
                    res.status(200).send(JSON.parse(response));
                } else {
                    res.status(404).send({ message: "Error: No results" });
                }
            }).catch((error) => {
                res.status(500).send({ message: error })
            });

        } else {
            res.status(403).send({ message: `Error: You don't have permission to access this resource` });
        }

    } else {
        res.status(404).send({ message: `Error: you must authenticate to access this resource` });
    }

}

//Get user data filtered by user id -> Can be accessed by users with role "users" and "admin"
function getClientById(req, res) {

    clientId = req.params.id;

    if (req.decoded.user) {

        const user = req.decoded.user;

        if (typeof user.role !== "undefined" && (user.role === "user" || user.role === "admin")) {

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
                if (response) {
                    const client = JSON.parse(response).clients.find(it => it.id === clientId);
                    if (client) {
                        res.status(200).send(client);
                    } else {
                        res.status(404).send({ message: `Error: No user with id '${clientId}'` });
                    }
                } else {
                    res.status(404).send({ message: `Error: No results` });
                }
            }).catch((error) => {
                res.status(500).send({ message: error })
            });
        } else {
            res.status(403).send({ message: `Error: You don't have permission to access this resource` });
        }

    } else {
        res.status(404).send({ message: `Error: you must authenticate to access this resource` });
    }

}


//Get user data filtered by user name -> Can be accessed by users with role "users" and "admin"
function getClientByUsername(req, res) {

    const clientUsername = req.params.username;

    if (req.decoded.user) {

        const user = req.decoded.user;

        if (typeof user.role !== "undefined" && (user.role === "user" || user.role === "admin")) {

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

                if (response) {

                    const client = JSON.parse(response).clients.find(it => it.name === clientUsername)

                    if (client) {
                        res.status(200).send(client);
                    } else {
                        res.status(404).send({ message: `Error: No user with id '${clientUsername}' not found` });
                    }

                } else {
                    res.status(404).send({ message: `Error: No results` });
                }

            }).catch((error) => {
                res.status(500).send({ message: error })
            });

        } else {
            res.status(403).send({ message: `Error: You don't have permission to access this resource` });
        }

    } else {
        res.status(404).send({ message: `Error: you must authenticate to access this resource` });
    }


}


module.exports = {
    getClients,
    getClientById,
    getClientByUsername
}