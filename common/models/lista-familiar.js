'use strict';

module.exports = function(ListaFamiliar) {
  ListaFamiliar.beforeRemote('create', function(context, ListaFamiliar, next) {
    context.args.data.Owner =context.req.accessToken.userId
    
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
        })
    });
	
};
