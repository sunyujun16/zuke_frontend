export default {
    parseToDate: function (timestamp) {
        let strings = new Date(timestamp).toLocaleString().split(' ')[0].split('/');
        let timeString = new Date(timestamp).toLocaleString().split(' ')[1];
        let year = strings[0],
            month = strings[1].length === 2 ? strings[1] : '0' + strings[1],
            day = strings[2].length === 2 ? strings[2] : '0' + strings[2]
        let timeList = timeString.slice(2, timeString.length + 1).split(':')
        let apm = timeString.slice(0, 2)
        timeList[0] = apm === '下午' ? Number.parseInt(timeList[0]) + 12 : timeList[0]
        // console.log(timeList)
        return year + '-' + month + '-' + day + ' ' + timeList[0] + ':' + timeList[2]
    }
}