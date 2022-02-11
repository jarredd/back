const Usuario = require("../model/usuario.model.js");

exports.createVerificarC = (req, res) => {
    // Validate request
    var statur=0;
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
    }
    const usuario = new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        rfc: req.body.rfc,
        passwordd: req.body.passwordd,
        direccion: req.body.direccion || "",
        telefono: req.body.telefono || "",
        website: req.body.website || ""
    });
 
    Usuario.verificarCorreo(usuario,(err,data)=>{
        if (err) {
            res.status(500).send({
                message:err.message || "0"
            });
            
        }else{
            res.send(data);
        }
    })
};

exports.createVerificarRfc = (req, res) => {
    // Validate request
    var statur=0;
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
    }
    const usuario = new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        rfc: req.body.rfc,
        passwordd: req.body.passwordd,
        direccion: req.body.direccion || "",
        telefono: req.body.telefono || "",
        website: req.body.website || ""
    });
 
    Usuario.verificarRfc(usuario,(err,data)=>{
        if (err) {
            res.status(500).send({
                message:err.message || "0"
            });
            
        }else{
            res.send(data);
        }
    })
};

exports.create = (req, res) => {
    // Validate request
    var statur=0;
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
    }
    const usuario = new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        rfc: req.body.rfc,
        passwordd: req.body.passwordd,
        direccion: req.body.direccion || "",
        telefono: req.body.telefono || "",
        website: req.body.website || ""
    });
    Usuario.create(usuario, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al guardar."
            });
        else res.send(data);
    });
    
};

exports.findAll = (req, res) => {
    const nombre = req.query.title;
    Usuario.getAll(nombre, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving usuarios."
            });
        else res.send(data);
    });
};

exports.findCorreo = (req, res) => {
    console.log("correo "+req.body.correo +" "+req.body.passwordd);
    Usuario.findCorreID(req.body.correo, req.body.passwordd, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "error de id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
exports.findOne = (req, res) => {
    Usuario.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `no funciona id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "error de id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Usuario.updateById(
        req.params.id,
        new Usuario(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No funciona con id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "error al actualizar with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.updatePasswordd = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Usuario.updateByPass(
        req.params.id,
        new Usuario(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No funciona con id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "error al actualizar with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.updateOnlyPass = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Usuario.updateOnlyPass(
        req.params.id,
        new Usuario(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No funciona con id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "error al actualizar with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Usuario.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `no se elimino id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "no funciona 500 id " + req.params.id
                });
            }
        } else res.send({ message: `Usuario eliminado!` });
    });
};