'use strict';

module.exports = function (Productos) {
    /**
     * 
     * @param {object} context 
     * @param {Function(Error, array)} callback
     */

    Productos.LimparProductos = function (context, callback) {
        var productosComprados;
        var IdUser = context.req.accessToken.userId;
        var Usuario = Productos.app.models.Usuario;
        var listaFamiliarid;
        Usuario.findById(IdUser, function (err, Objeto) {
            console.log(Objeto);
            listaFamiliarid = Objeto.listaFamiliarId;

            Productos.updateAll({listaFamiliarId: listaFamiliarid}, {comprar: '0'}, function (err) {

                Productos.find({where: {listaFamiliarId: listaFamiliarid}}, function (err, productosComprados) {

                    callback(null, productosComprados);

                });

            });

        });
    };
    /**
     * Le pasaremos el id de un prodecto 
     * @param {object} contexto id del producto
     * @param {Function(Error, array)} callback
     */

    Productos.prototype.productoComprado = function (contexto, callback) {
        var Allprotuctos;
        var producto=this;
        
        
        if( producto.comprar===false){
            //console.log("1");
            producto.comprar=true;
        }else{
            //console.log("2");
            producto.comprar=false;
        }
            //console.log(producto.comprar);
           producto.save(function (err) {
               //console.log("3");
               Productos.find({where: {listaFamiliarId: producto.listaFamiliarId}}, function(err, Allprotuctos ){
                    callback(null, Allprotuctos);
               });
           });
        
       
    };



};
