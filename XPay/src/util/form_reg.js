const reg = function(formData, that) {
    var form = {};
    for (var k in formData) {
        var item = formData[k];
        if (item.value === "" && item.tips) {
            that.$toast($t(item.tips));
            return false;
        }
        if (item.reg && !item.reg.test(item.value)) {
            that.$toast($t(item.regTips));
            return false;
        }
    }
    for (var kk in formData) {
        form[kk] = formData[kk].value;
    }
    return form;
}

export {
    reg
}