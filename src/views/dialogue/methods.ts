import moment from "moment";

export function getCurrentDateTimestamp() {
    let date_time = new Date();

    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    let hours = date_time.getHours();
    let minutes = date_time.getMinutes();
    let seconds = date_time.getSeconds();

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}

export function getCurrentDateTimestampInDatepickerFormat() {
    return moment().utc().format("YYYY-MM-DDTHH:mm:ss") + "Z";

    // '2023-01-01T15:43:00.000Z'
}