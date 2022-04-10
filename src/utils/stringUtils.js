export default {
    trimByLength(content, length){
        console.log('content: ',content,' -- length: ',length)
        if (!length) length = 10
        if (typeof length !== "number") {
            try {
                length = Number.parseInt(length)
            } catch (e){
                console.log('参数异常：length无法转换为number类型。')
            }
        }
        if (length === 0) return ''
        return content.length > length ? content.slice(0,length - 1) + '...' : content
    }
}