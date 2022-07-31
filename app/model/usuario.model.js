const sql = require("./db.js");

const Usuario = function (usuario) {
    this.nombre = usuario.nombre;
    this.correo = usuario.correo;
    this.rfc = usuario.rfc;
    this.passwordd = usuario.passwordd;
    this.direccion = usuario.direccion;
    this.telefono = usuario.telefono;
    this.website = usuario.website;
};
//es una prueba de git

Usuario.verificarCorreo =(newUsuario, result) =>{
    let coreoStatus ="";
    var status="";
    console.log("desde el modelo create"+ newUsuario.correo);
    sql.query(`SELECT * FROM usuarios where correo = "${newUsuario.correo}"`, (err, res) => {
        console.log( "res2 "+res )
       
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            status=0;
            console.log("found usuario: ", res[0]);
            coreoStatus=res[0].correo;
            result(null, res);
            return;
        }else{
            console.log("else");
            status=1;
        }
        // not found usuario with the id
        result({ kind: "not_found" }, null);
    });
}

Usuario.verificarRfc =(newUsuario, result) =>{
    let coreoStatus ="";
    var status="";
    console.log("desde el modelo +rfc"+ newUsuario.rfc);
    sql.query(`SELECT * FROM usuarios where rfc = "${newUsuario.rfc}"`, (err, res) => {
        console.log( "res2 "+res )
       
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            status=0;
            console.log("found usuario: ", res[0]);
            coreoStatus=res[0].correo;
            result(null, res);
            return;
        }else{
            console.log("else");
            status=1;
        }
        // not found usuario with the id
        result({ kind: "not_found" }, null);
    });
}
Usuario.create = (newUsuario, result) => {
    sql.query("INSERT INTO usuarios set ?", newUsuario, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Usuario creadp: ", { id: res.insertId, ...newUsuario });
        result(null, { id: res.insertId, ...newUsuario });

    });
    
};

Usuario.findById = (id, result) => {
    sql.query(`SELECT * FROM usuarios where id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found usuario: ", res[0]);
            console.log("corre model-> "+res[0].correo)
            result(null, res);
            return;
        }
        // not found usuario with the id
        result({ kind: "not_found" }, null);
    });
};
Usuario.findCorreID = (correo, passwordd, result) => {

    sql.query(`SELECT correo FROM usuarios where correo = "${correo}" and passwordd="${passwordd}" `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found usuario: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found usuario with the id
        result({ kind: "not_found" }, null);
    });
};


Usuario.getAll = (correo, result) => {
    let query = "SELECT * from usuarios";
    if (correo) {
        query += `where usuario_correo like ´%${correo} %'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("usuarios: ", res);
        result(null, res);
    });
};

Usuario.updateById = (id, usuario, result) => {

    console.log("ESTA EN 1  ");
    sql.query("UPDATE usuarios SET nombre=?, rfc=?, direccion=?, telefono=? ,website=? WHERE id=?",
        [usuario.nombre, usuario.rfc, usuario.direccion, usuario.telefono, usuario.website, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found usuario with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated usuario: ", { id: id, ...usuario });
            result(null, { id: id, ...usuario });
        }
    );

};


Usuario.updateByPass = (id, usuario, result) => {
    sql.query("UPDATE usuarios set nombre=?, rfc=?, passwordd=?, direccion=?, telefono=? ,website=? WHERE id=?",
        [usuario.nombre, usuario.rfc, usuario.passwordd, usuario.direccion, usuario.telefono, usuario.website, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found usuario with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated usuario: ", { id: id, ...usuario });
            result(null, { id: id, ...usuario });
        }
    );

};

Usuario.updateOnlyPass = (id, usuario, result) => {
    sql.query("UPDATE usuarios set  passwordd=? WHERE correo=? and rfc=?",
        [ usuario.passwordd, usuario.correo, usuario.rfc, ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found usuario with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated usuario: ", { id: id, ...usuario });
            result(null, { id: id, ...usuario });
        }
    );

};

Usuario.remove = (id, result) => {
    sql.query("DELETE FROM usuarios where id=?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found usuario with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted usuario: ", id);
        result(null, res);
    });
};
module.exports = Usuario;