//@ts-check
/// <reference types="./type.d.ts" />

import { link_anti_qqgj } from "./link_anti_qqgj.js";

console.log('https://example.com/index.html#?a=114:514:1919::810&b=xxx:xxx::xxx&c=2400:3200:baba::1&d=FF01:0:0:0:0FFF01::0:0:1101:FFF01:FFF01:0:0:0:FFF01:0FFF01::0:0:F:FF01:0:0:0:0:0:0:1101&e=FF01:0:0:0:0:0:0:1101&f=111.111.111.111.1112.111.111.111.444.444.444.444.11.1.1.1.256.256.256.256.1.1.1.1.123.1234.567.890')

// 函数，用于生成
function generate() {
    //console.log('outputlink input');
    self.inputdescription.disabled = !self.checkbox_need_description.checked;
    try {
        self.outputlink.value = link_anti_qqgj(self.inputlink.value, self.checkbox_need_description.checked, self.inputdescription.value);
    } catch (e) {
        console.error(e);
        self.outputlink.value = '生成失败！' + e;
    }
}

// 监视输入框的输入
self.inputlink.addEventListener('input', generate);
self.inputdescription.addEventListener('input', generate);
self.checkbox_need_description.addEventListener('click', generate);

// 触发生成
generate();

// 鼠标选择输出框时自动全选
self.outputlink.addEventListener('focus', () => self.outputlink.select())

// 复制按钮
self.btnCopy.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(self.outputlink.value)
    } catch (e) {
        console.error(e)
        alert("复制失败！\n" + e)
    }
})
