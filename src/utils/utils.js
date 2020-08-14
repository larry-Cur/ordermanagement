export let getDate = (time) => {
    // function getnum(num){
    //     return num < 10 ? "0" + num : num;
    // };
    let t = (typeof time  == 'string' ? new Date(time) : time)
    return (
        t.getFullYear() +
        "-" +
        ((t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : t(t.getMonth() + 1))+
        "-" +
        (t.getDate() < 10 ? '0' + t.getDate() : t.getDate()) +
        " " +
        (t.getHours() < 10 ? '0' + t.getHours() : t.getHours()) +
        ":" +
        (t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()) +
        ":" +
        (t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds())
    );
};
export let getHoursDate = (time) => {
    // function getnum(num){
    //     return num < 10 ? "0" + num : num;
    // };
    var t = new Date(time);
    return (
        (t.getHours() < 10 ? '0' + t.getHours() : t.getHours()) +
        ":" +
        (t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()) +
        ":" +
        (t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds())

    );
};

export let getYearDate = (time) => {
    // function getnum(num){
    //     return num < 10 ? "0" + num : num;
    // };
    var t = new Date(time);
    return (
        ((t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1)) +
        "-" +
        (t.getDate() < 10 ? '0' + t.getDate() : t.getDate()) 
        

    );
};