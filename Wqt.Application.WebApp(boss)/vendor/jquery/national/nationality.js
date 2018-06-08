var nationality = {

    data: []

    strData: String,

    input: Object,

    list: Object,

    //功能描述：初始化

    init: function (option) {

    },

    //功能描述：选项设置

    setOption: function (option) {

    },

    //功能描述：绑定事件

    setEvent: function () {

    },

    //功能描述：绑定数据

    setData: function () {

    },

    //功能描述：搜索

    doSearch: function (key) {

        if (!key || key == "") return ["CN|China|中国大陆", "HK|Hong Kong|中国香港", "MO|Macau|中国澳门", "TW|Taiwan|中国台湾"];

        var search = [];

        for (var i = 0; i < this.data.length; i++) {

            if (this.data[i].id.indexOf(key) >= 0 || this.data[i].en.indexOf(key) >= 0 || this.data[i].cn.indexOf(key) >= 0) {

                search.push(this.data[i]);

            }

        }

        return search;

    },

    //功能描述：设置列表

    setList: function (fvalue) {

    },

    //功能描述：绑定列表事件

    setListEvent: function () {

    },

    //功能描述：设置单项值

    setValue: function (item, hide) {

    },

    //功能描述：校验数据

    chkValue: function () {

    },

    //功能描述：鼠标事件

    setKeyDownEvent: function (event) {

    }

}