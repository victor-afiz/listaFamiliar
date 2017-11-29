'use strict';

module.exports = function (Usuario) {

    /*
     
     Crea la rama 'aceptarSolicitudes'.
     Debemos crear un punto de entrada PUT /Usuarios/{id}/aceptarSolicitud, al que le enviamos un identificador de usuario y, si ese usuario tiene alguna solicitud en la lista de la que es miembro el actualmente autenticado, esta solicitud será aprobada.
     El hecho de que una solicitud haya sido aprobada, significa que el registro de solicitud debe ser eliminado de la base de datos y la lista familiar que se había solicitado debe asociarse al usuario que la solicitó.
     Esta acción debe devolver un array con todos los miembros de la lista.
     Mezcla la rama 'aceptarSolicitudes' en la master.
     
     */

    Usuario.prototype.AceptarSolicitud = function (variable, callback) {
        var solicitud;
        // TODO
        var userid = variable.req.accessToken.userId;
        var listaUser = this;
        var listud = null;

        Usuario.findById(userid, function (err, usuario) {
            listud = usuario.listaFamiliarId;

            //Usuario.findById(idUser, function (err, usuario )

            console.log(listud);
            listaUser.Solicitud(function (err, listas) {
                var id = listas[0].id;

                if(listud===id){
                    //console.log(id);
                listaUser.listaFamiliarId = id;
                listaUser.save(function (err) {
                    solicitud = {
                        id: id,
                        listaUser
                    };
                    callback(null, solicitud);

                });
                }else{
                  solicitud = {
                        Mensaje: "No perteneces a esta lista"
                   };  
                   
                   callback(null, solicitud);
                }
                

            });
        });




    };


};
