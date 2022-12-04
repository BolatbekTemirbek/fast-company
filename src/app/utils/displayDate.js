export function displayDate(data) {
    const date = new Date(parseInt(data));
    const dateNow = new Date();
    const yearDif = dateNow.getFullYear() - date.getFullYear();
    if (yearDif === 0) {
        const dayDif = dateNow.getDate() - date.getDate();
        if (dayDif === 0) {
            const hourDif = dateNow.getHours() - date.getHours();
            if (hourDif === 0) {
                const minutesDif = dateNow.getMinutes() - date.getMinutes();
                if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
                if (minutesDif >= 5 && minutesDif < 10) return "5 минуту назад";
                if (minutesDif >= 10 && minutesDif < 30) {
                    return "10 минуту назад";
                }

                return "30 минут назад";
            }
            return `${date.getHours()}:${date.getMinutes()}`;
        }
        return `${date.getDay()}${date.toLocaleString("default", {
            month: "long"
        })}`;
    }
    return (
        date.getFullYear() +
        "." +
        date.toLocaleString("default", {
            month: "long"
        }) +
        "." +
        date.getDate()
    );
    // if (minut < 5) {
    //     return "1 минуту назад";
    // }
    // if (minut < 10 && minut > 5) {
    //     return "5 минуту назад";
    // }
    // if (minut > 10 && minut < 30) {
    //     return "10 минуту назад";
    // }
    // if (minut > 30 && minut < 60) {
    //     return "30 минут назад";
    // }
    // createdDate.setTime(createAt);

    // if (createdDate.getHours() && !createdDate.getDay()) {
    //     return `${createdDate.getHours()}.${createdDate.getMinutes()}`;
    // }
    // if (createdDate.getDay() && !createdDate.getFullYear()) {
    //     return `${createdDate.getDay()}.${createdDate.getMonth()}`;
    // }
    // if (createdDate.getFullYear()) {
    //     return `${createdDate.getDay()}.${createdDate.getMonth()}.${createdDate.getFullYear()}`;
    // }
}
