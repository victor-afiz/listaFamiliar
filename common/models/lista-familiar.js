'use strict';

module.exports = function(ListaFamiliar) {
  ListaFamiliar.beforeRemote('create', function(context, ListaFamiliar, next) {
    context.args.data.Owner =context.req.accessToken.userId
    
    next();
  });
};
