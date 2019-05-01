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

// export function eventify(arr, callback) {
//     let old_push = arr.push;
//     arr.push = elem => { old_push.call(arr, elem); callback(elem); }
// }

// export function remove_eventify(arr){
//     delete arr.push
// }