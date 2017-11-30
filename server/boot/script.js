module.exports = function(app) {
  var Role = app.models.Role;
  var users = app.models.Usuario;
  var listud= null;
  var idLista=null;
  
  Role.registerResolver('Comprado', function(role, context, cb) {
    // Q: Is the current request accessing a Project?
    if (context.modelName !== 'Productos') {
      // A: No. This role is only for projects: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    //Q: Is the user logged in? (there will be an accessToken with an ID if so)
    var userId = context.accessToken.userId;
    if (!userId) {
      //A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the current logged-in user associated with this Project?
    // Step 1: lookup the requested project
    context.model.findById(context.modelId, function(err, producto) {
      // A: The datastore produced an error! Pass error to callback
      if(err) return cb(err);
      // A: There's no project by this ID! Pass error to callback
      if(!producto) return cb(new Error("Producto no encontrado"));

      users.findById(userId, function (err, usuario) {
            listud = usuario.listaFamiliarId;
            idLista=producto.listaFamiliarId;
            
            
            if(idLista === listud){
               
                return cb(null, true);
            }else{
               
                return cb(null, false);
                
            }
         ;
      });      
      
    });
   
  });
};
