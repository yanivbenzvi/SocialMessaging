
function is_function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply)
}

function concat_functions(f1,f2){
    return (...params)=>{
        f1(...params);
        f2(...params);
    }
}

module.exports = { is_function , concat_functions}