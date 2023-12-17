/**
 * @param {string} inputvalue
 * @returns {string}
 */
function link_anti_qqgj(inputvalue){
    console.log('link_anti_qqgj');
    // 除首尾空白符
    inputvalue = inputvalue.trim()
    // 检测协议头
    let protocol__re = /:([\/\\]{1,2})/;
    let protocol__ = protocol__re.exec(inputvalue);
    if (!protocol__) {
        inputvalue = 'http://' + inputvalue;
    }else if (protocol__[0].length === 1) {
        inputvalue = inputvalue.replace(protocol__re, '://');
    }
    // 创建URL
    let url = new URL(inputvalue);
    // 主机名转换后不能包含% 这样可以把含有空格的踢出去
    if (url.host.includes('%')) throw "url host includes '%'";
    // 输出用的URL
    let outurl = {
        hostname: url.hostname
            .replace(/\./g , '。') // 处理域名或IPv4
            .replace(/:/g , '：') // 处理IPv6
        ,path: url.href.slice(url.origin.length)
            .replace(/\.(?=[a-zA-Z]{2})/g , '\n.') // 处理路径里可能被识别为域名后缀的内容
            //.replace(/(?<=([0-9]{1,3}\.){2}([0-9]{1,3}))\.(?=[0-9]{1,3})/g , '\n.') // 处理路径里可能被识别为IPv4的内容
            //.replace(/(?<=(:|[a-fA-F0-9])):(?=([a-fA-F0-9]))/g , '\n:') // 处理路径里可能被识别为IPv6的内容
            .replace(/(?<=:):(?=[a-fA-F0-9])/g , '\n:') // 处理路径里可能被识别为缩写IPv6的内容
        ,href: ''
    }
    // 处理路径里可能被识别为IPv4的内容
    let re = /([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]+)/g ;
    while (true) {
        let i = re.exec(outurl.path); // 匹配
        //console.log(i);
        if (!i) break; // 没有任何匹配则终止循环
        let istr = i[0]; // 匹配的内容转字符串
        let do_it = true; // 是否进行替换操作
        // 检查匹配内容是否符合Q群管家识别的IPv4数字范围
        for (let j of i.slice(2)){
            // @ts-ignore
            j = +j;
            // @ts-ignore
            if(j > 255 || !Number.isSafeInteger(j)){
                do_it = false;
                break;
            }
        }
        //console.log(re.lastIndex);
        if (do_it) { //确定替换
            // 在最后一个点前面加上换行符
            outurl.path = outurl.path.replace(istr, i.slice(1,4).join('.')+'\n.'+i[4]) ;
        } else { //无需替换
            // 将光标移动到第一块数字结束的位置，防止漏网之鱼
            re.lastIndex -= (i[0].length - i[1].length) ;
        }
    }
    // 处理路径里可能被识别为完整IPv6的内容
    re = /(([0-9a-fA-F]{1,4})(:[0-9a-fA-F]{1,4}){6})(:[0-9a-fA-F]{1,4})/g ;
    while (true) {
        let i = re.exec(outurl.path); // 匹配
        //console.log(i);
        if (!i) break; // 没有任何匹配则终止循环
        let istr = i[0].toString(); // 匹配的内容转字符串
        // 在最后一个:前面加上换行符
        outurl.path = outurl.path.replace(istr, i[1]+'\n'+i[4]) ;
    }
    // 如果原来有协议头，那么加上协议头
    if (protocol__) {
        outurl.href = url.protocol + '/';
    }
    outurl.href += outurl.hostname;
    // 如果有端口号那么加上端口号
    if (url.port){
        outurl.href += ':' + url.port;
    }
    // 如果输入的时候不含路径，跳过路径添加
    if (!(outurl.path==='/' && !/(\/|\\)$/.test(inputvalue))) {
        outurl.href += outurl.path;
    }
    return outurl.href;
}
