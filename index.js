const express = require('express');
const app = express();
const cors = require('cors')
const router = express.Router();
const usersRepo = require('./repos/usersRepo');
app.use(cors())
app.use('/api', router);
app.use(express.json())


router.get('/', (req, res, next) => {
    usersRepo.get(data => {
        res.status(200).json({
            "status": 200,
            "statusText": "ok",
            "message": "user list",
            "data": data
        });
    }, error => {
        next(error);
    });
});
router.get('/search', (req, res, next) => {
    let searchObjcet = {
        "id": req.query.id,
        "name": req.query.name
    }



    // perform the search
    usersRepo.search(searchObjcet,
        data => {
            res.status(200).json({
                "status": 200,
                "statusText": "ok",
                "message": "the search result is complete!",
                "data": data
            });
        },
        error => {
            next(error);
        })
})



router.get('/:id', (req, res, next) => {
    usersRepo.getById(req.params.id, data => {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "ok",
                "message": "user list",
                "data": data
            });
        } else {
            res.status(400).json({
                "status": 400,
                "statusText": "not found",
                "message": "user by id:" + req.params.id + "doesn't exist!",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "user by id:" + req.params.id + "doesn't exist! "
                }
            });
        }
    }, error => {
        next(error);
    });
});


router.post('/', (req, res, next) => {
    usersRepo.insert(req.body, data => {
        res.status(201).json({
            "status": 201,
            "statusText": "created",
            "message": "new record added",
            "data": data
        });
    }, error => {
        next(error);
    });
});



router.put('/:id', (req, res, next) => {
    usersRepo.getById(req.params.id,
        data => {
            if (data) {

                usersRepo.update(req.body, req.params.id, data => {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "updated",
                        "message": "user information updated! ",
                        "data": data
                    })
                    
                },
                    err => {
                        console.log(err);
                    })

            } else {
                res.status(400).json({
                    "status": 400,
                    "statusText": "not found",
                    "message": "user by id:" + req.params.id + "doesn't exist!",
                    "error": {
                        "code": "NOT_FOUND",
                        "message": "user by id:" + req.params.id + "doesn't exist! "
                    }
                })

            }
        },
        error => {
            next(error)
        })

});
router.delete('/:id', (req, res, next) => {
    usersRepo.getById(req.params.id,
        data => {
            if (data) {

                usersRepo.delete( req.params.id, data => {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "deleted",
                        "message": "user information deleted! ",
                        "data": "user"+req.params.id +"deleted!"
                    })

                },
                    err => {
                        console.log(err);
                    })

            } else {
                res.status(400).json({
                    "status": 400,
                    "statusText": "not found",
                    "message": "user by id:" + req.params.id + "doesn't exist!",
                    "error": {
                        "code": "NOT_FOUND",
                        "message": "user by id:" + req.params.id + "doesn't exist! "
                    }
                })

            }
        },
        error => {
            next(error)
        })

});


function errorBuilder(err){
    return {
        "status": 500,
        "statusText": "Internal server error",
        "message": err.message,
        "error": {
            "errno":err.errno,
            "call":err.syscall,
            "code": "NOT_FOUND",
            "message": err.message
    }
}
}

app.use(function (err, req, res, next) {
    console.log(res.status(500).json(errorBuilder(err)));
   
    next(err)
})


app.use(function(err,req,res,next){
    res.status(500).json(errorBuilder(err))
})


app.listen(3000, () => console.log("server is running on port 3000"));
