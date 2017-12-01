'use strict';

module.exports = function(Productos) {
        /**
      * 
      * @param {object} context 
      * @param {Function(Error, array)} callback
      */

     Productos.LimparProductos = function(context, callback) {
       var productosComprados;
       var IdUser = context.req.accessToken.userId;
       var Usuario=Productos.app.models.Usuario;
       var listaFamiliarid;
            Usuario.findById(IdUser,function (err, Objeto){
                console.log(Objeto);
                listaFamiliarid=Objeto.listaFamiliarId;
                    
                Productos.updateAll({listaFamiliarId:listaFamiliarid},{comprar: '0'},function(err) {
                    
                    Productos.find({where: {listaFamiliarId: listaFamiliarid}},function(err, productosComprados){
                       
                        callback(null, productosComprados);
                        
                    });
                    
                });    
                
             });
     };
     
};
