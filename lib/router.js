const Router = require('express').Router;
const methods = require('methods');
const util = require('util');

function metaRouter(io) {
    this.io = io;
    this.Router = new Router();
}


methods.forEach((method)=>{
    metaRouter.prototype[method] = function(){
        const args = Array.prototype.slice.call(arguments);
        args[0] = args[0]+':'+method;
        if (args[0].charAt(0)==='/') args[0] = args[0].substring(1);
        this.io.route(...args);
        return this.Router[method](...arguments);
    }
})



module.exports  = metaRouter;