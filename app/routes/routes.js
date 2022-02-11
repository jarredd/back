module.exports = app => {
    const usuarios = require("../controller/usuario.controller.js");

    var router = require("express").Router();
    // Create a new  usuario
    router.post("/", usuarios.create);
    router.post("/correo", usuarios.createVerificarC);
    router.post("/rfc", usuarios.createVerificarRfc);
    // Retrieve all usuario
    router.get("/", usuarios.findAll);
    // Retrieve all published usuario
    //router.get("/published", usuarios.findAllPublished);
    router.post("/iniciar", usuarios.findCorreo)
    // Retrieve a single Tutorial with id
    router.get("/:id", usuarios.findOne);
    // Update a Tutorial with id
    router.put("/:id", usuarios.update);
    router.put("/pas/:id", usuarios.updatePasswordd);
    router.put("/passwordd/:id", usuarios.updateOnlyPass)
    // Delete a Tutorial with id
    router.delete("/:id", usuarios.delete);
    // Delete all Tutorials
    //router.delete("/", usuarios.deleteAll);}
    
    app.use('/api/usuarios', router);
  };