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
        this.io.route(...args);
        return this.Router[method](...arguments);
    }
})



module.exports  = metaRouter;