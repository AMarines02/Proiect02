const express = require('express')
const app = express()
app.use('/', express.static('public'))
app.listen(8080)

const Sequelize = require('sequelize')

const sequelize = new Sequelize('directorFilme', 'root', '', {
    dialect: "mysql",
    host: "localhost"
})
sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
})

const Utilizatori = sequelize.define('utilizatori', {
    idUtilizator:{ type :Sequelize.INTEGER,primaryKey:true},
    nume: Sequelize.STRING,
    parola: Sequelize.STRING,
    email:Sequelize.STRING,
    username:Sequelize.STRING
})

const Genuri=sequelize.define('genuri',{
    codGen:{ type: Sequelize.INTEGER,primaryKey:true},
    denumire:Sequelize.STRING,
    
})

const Film = sequelize.define('film',{
    codFilm:{type:Sequelize.INTEGER, primaryKey:true},
    titlu:Sequelize.STRING,
    durata:Sequelize.INTEGER,
    an:Sequelize.INTEGER,
})

const RandGenuri=sequelize.define('randgenuri',{
    idRg:{ type:Sequelize.INTEGER,primaryKey:true},
    idGen:{ type:Sequelize.INTEGER,
             references:{
                 model:Genuri,
                 key:'codGen',
                   deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
             }
    },
    idFilm:{ type:Sequelize.INTEGER,
             references:{
                 model:Film,
                 key:'codFilm',
                   deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
             }
    },
})
const FilmeFavorite=sequelize.define('filmefavorite',{
    idFf:{type:Sequelize.INTEGER,primaryKey:true},
    codFilm:{ type:Sequelize.INTEGER,
             references:{
                 model:Film,
                 key:'codFilm',
                   deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
             }
    },
    codUtilizator:{ type:Sequelize.INTEGER,
             references:{
                 model:Utilizatori,
                 key:'idUtilizator',
                   deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
             }
    },
})
app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

app.use(express.json())
app.use(express.urlencoded())

//definire endpoint POST /messages
app.post('/utilizatori', (request, response) => {
    Utilizatori.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.post('/genuri', (request, response) => {
    Genuri.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.post('/film', (request, response) => {
    Film.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})
app.post('/randgenuri', (request, response) => {
    RandGenuri.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})
app.post('/filmefavorite', (request, response) => {
    FilmeFavorite.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})


app.get('/utilizatori', (request, response) => {
    Utilizatori.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/utilizatori/:id', (request, response) => {
    Utilizatori.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})

app.get('/utilizatori', (request, response) => {
    Utilizatori.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/utilizatori/:idUtilizator', (request, response) => {
    Utilizatori.findById(request.params.idUtilizator).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})
app.get('/genuri', (request, response) => {
    Genuri.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/genuri/:codGen', (request, response) => {
    Genuri.findById(request.params.codGen).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})




app.get('/film', (request, response) => {
    Film.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/film/:codFilm', (request, response) => {
    Film.findById(request.params.codFilm).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})

app.get('/randgenuri', (request, response) => {
    RandGenuri.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/randgenuri/:idRg', (request, response) => {
    RandGenuri.findById(request.params.idRg).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})

app.put('/utilizatori/:idUtilizator', (request, response) => {
    Utilizatori.findById(request.params.idUtilizator).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/genuri/:codGen', (request, response) => {
    Genuri.findById(request.params.codGen).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/film/:codFilm', (request, response) => {
    Film.findById(request.params.codFilm).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/randgenuri/:idRg', (request, response) => {
    RandGenuri.findById(request.params.idRg).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/filmefavorite/:idFf', (request, response) => {
    FilmeFavorite.findById(request.params.idFf).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.get('/filmefavorite', (request, response) => {
    FilmeFavorite.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/filmefavorite/:idFf', (request, response) => {
    Utilizatori.findById(request.params.idFf).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})

app.delete('/utilizatori/:idUtilizator', (request, response) => {
    Utilizatori.findById(request.params.idUtilizator).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})
app.delete('/genuri/:codGen', (request, response) => {
    Genuri.findById(request.params.idGen).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/film/:codFilm', (request, response) => {
    Film.findById(request.params.codFilm).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/randgenuri/:idRg', (request, response) => {
    RandGenuri.findById(request.params.idRg).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/filmefavorite/:idFf', (request, response) => {
    FilmeFavorite.findById(request.params.idFf).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})


