create table usuarios(
    usuario_id int AUTO_INCREMENT PRIMARY key,
    usuario_nombre varchar(50),
    usuario_correo varchar(50),
    usuario_rfc varchar (15),
    usuario_password varchar (50),
    usuario_direccion varchar(100),
    usuario_telefono varchar(15),
    usuario_website varchar(250)
);
insert into usuarios values (DEFAULT,"prueba2","jhh@gmail.com.mx","HEHJ97081Q2S",md5('123'),'','','' );