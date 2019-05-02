export function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp)
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    var hour = a.getHours()
    var min = a.getMinutes()
    var sec = a.getSeconds()
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    return time
}

export function Enum(data) {
    Object.keys(data).forEach(key => data[data[key]] = key);
    Object.freeze(data)
    return data;
}

export function eventify(arr, action, callback) {
    let old_action = arr[action];
    arr[action] = (...elem) => { old_action.call(arr, ...elem); callback(...elem); }
    if(!("clear" in arr)) arr.clear = [];
    arr.clear.push(action);
}

export function eventify_clear(arr) {
    if(!("clear" in arr)) return;
    arr.clear.forEach(action=>{delete arr[action];})
    delete arr.clear;
}

export function array_remove(array, item){
    var index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
}