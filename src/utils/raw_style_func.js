export default function (className, index) {
    // 定义滚动条
    let theStyle = document.getElementsByClassName(className)[index].style;
    theStyle.backgroundColor = 'rgba(255,255,255,0.6)';
    theStyle.color = 'white';
    theStyle.borderRight = '1px solid rgba(204, 196, 153, 0.5)'
    // 定义滚动条，重要！！！
    // document.styleSheets[0].addRule('.' + className + '__body::-webkit-scrollbar', 'display:none')
    document.styleSheets[0].addRule(
        '.' + className + '::-webkit-scrollbar',
        'background-color: rgba(0, 0, 0, 0.1); width: 10px')
    document.styleSheets[0].addRule(
        '.' + className + '::-webkit-scrollbar-track',
        '-webkit-box-shadow: inset 0 0 6px rgba(50, 50, 50, 0.8);')
    document.styleSheets[0].addRule(
        '.' + className + '::-webkit-scrollbar-thumb',
        'background-color: rgba(204, 196, 153, 0.2);' +
        'border-radius: 10px;' +
        '-webkit-box-shadow: inset 0 0 6px rgba(204, 196, 153, 0.3);')
}