'use strict';

module.exports = function (ListaFamiliar) {
    ListaFamiliar.beforeRemote('create', function (context, ListaFamiliar, next) {
        context.args.data.Owner = context.req.accessToken.userId

        next();
    });

    ListaFamiliar.afterRemote('create', function (context, listaFamiliar, next) {
        var app = ListaFamiliar.app;
        var Usuario = app.models.Usuario;
        var IdUser = context.req.accessToken.userId;

        Usuario.findById(IdUser, function (err, usr) {
            if (err)
                return cb(err);
            usr.listaFamiliarId = listaFamiliar.id;
            usr.save();
            next();
        });
    });
    //Creamos un metodo remoto para añador a la relacion entre Usuarios y lista el id de la lista al que el usuario
    //quiere pertenecer y el id del usuario.Todo esto se se guardara en la tabla solicitudes.
    ListaFamiliar.prototype.solicitar = function (context, callback) {
        var solicitar;
        // TODO
        var IdUser = context.req.accessToken.userId;
        var idlista = this.id;
        //
        
        // En esta linea vamos a insertar en la tabla Solicitud 
        this.Solicitud.add(IdUser,
                function (err) {
                    if (err)
                        callback(err);
                    solicitar = {
                        listaFamiliarId: idlista,
                        usuarioId: IdUser

                    };

                    callback(null, solicitar);
                });


    };
    


};
