const { json } = require('express');
const fs = require('fs');
const fileName = "./assets/users.json";

let usersRepo = {
    get: function (resolve, reject) {
        fs.readFile(fileName, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(data));
            }
        });
    },
    getById: function (id, resolve, reject) {
        fs.readFile(fileName, (error, data) => {
            if (error) {
                reject(error);
            } else {
                let user = JSON.parse(data).find((u) => u.id == id);
                resolve(user);
            }
        });
    },
    search: function (searchObjcet, resolve, reject) {
        fs.readFile(fileName, (error, data) => {
            if (error) {
                reject(error);
            } else {
                let users = JSON.parse(data);
                if (searchObjcet) {
                    users = users.filter(user => (searchObjcet.id ? user.id == searchObjcet.id : true) &&
                        (searchObjcet.name ? user.name.toLowerCase().indexOf(searchObjcet.name.toLowerCase()) >= 0 : true)

                    );
                }
                resolve(users);
            }
        });
    },


    insert: function (newData, resolve, reject) {

        fs.readFile(fileName, (error, data) => {
            if (error) {
                reject(error)
            }
            else {
                let users = JSON.parse(data)
                users.push(newData)
                fs.writeFile(fileName, JSON.stringify(users), (err => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(newData)
                    }
                }))


            }


        })

    },
    update: function (newData, id, resolve, reject) {
        fs.readFile(fileName, (error, data) => {
            if (error) {
                reject(error);
            } else {
                let users = JSON.parse(data);
                let user = users.find((u) => u.id == id);
                if (user) {
                    Object.assign(user, newData);
                    fs.writeFile(fileName, JSON.stringify(users), (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(newData);
                        }
                    });
                } else {
                    // User with the given ID was not found
                    reject(new Error(`User with ID ${id} not found!`));
                }
            }
        });
    },
    delete: function ( id, resolve, reject) {
        fs.readFile(fileName, (error, data) => {
            if (error) {
                reject(error);
            } else {
                let users = JSON.parse(data);
                let user = users.find((u) => u.id == id);
                let index = users.indexOf(user)

                if (index!=-1) {
                   users.splice(index,1)
                    fs.writeFile(fileName, JSON.stringify(users), (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(users);
                        }
                    });
                } else {
                    // User with the given ID was not found
                    reject(new Error(`User with ID ${id} not found!`));
                }
            }
        });
    }


};

module.exports = usersRepo;
