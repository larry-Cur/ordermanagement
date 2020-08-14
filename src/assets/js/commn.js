export default {
    getnum(num) {
        return num < 10 ? "0" + num : num;
    },
    getDate(time) {
        var t = new Date(time);
        return (
            t.getFullYear() +
            "-" +
            this.getnum(t.getMonth() + 1) +
            "-" +
            this.getnum(t.getDate()) +
            " " +
            this.getnum(t.getHours()) +
            ":" +
            this.getnum(t.getMinutes()) +
            ":" +
            this.getnum(t.getSeconds())
        );
    }
}