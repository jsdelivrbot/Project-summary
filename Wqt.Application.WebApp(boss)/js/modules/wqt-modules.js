/*
* 创建者：Kaiser
* 时间：  2016-06-08
* 描述：  数据模型存放js，统一处理数据交互和后台
* */
angular.module("stater.modules", [])
    //我的账号信息
    .factory("UserInfo", ["$wqtLocals", function ($wqtLocals) {
        var userInfo = {
            userid: "",
            usercode: "",
            token: "",
            isLogin: false,
            isReg: false,
            isNews: false
        };
        return {
            get: function () {
                var newUserInfo = $wqtLocals.getObject("userInfo");
                if (newUserInfo.isLogin == undefined) {
                    userInfo.isLogin = false;
                    userInfo.isReg = false;
                    userInfo.token = "";
                    //userInfo.isNews = false;
                }
                $.extend(userInfo, userInfo, newUserInfo || {});
                return userInfo;
            },
            set: function (data, token, isLogin) {
                $.extend(userInfo, userInfo, data || {});
                userInfo.token = token;
                userInfo.isLogin = isLogin;

                $wqtLocals.setObject("userInfo", userInfo);
            },
            set1: function (data) {
                var newUserInfo = "";
                $.extend(newUserInfo, data || {});
                $wqtLocals.setObject("userInfo", newUserInfo);
            },
            set2: function (data) {
                var newUserInfo = $wqtLocals.getObject("userInfo");
                $.extend(newUserInfo, data || {});
                $wqtLocals.setObject("userInfo", newUserInfo);
            },

            clear: function () {
                userInfo.isLogin = false;
                userInfo.isReg = false;
                userInfo.isNews = false;
                userInfo.token = "";
                $wqtLocals.setObject("userInfo", {});
            }
        };
    }])
    .factory("CommonData", ["$wqtLocals", function ($wqtLocals) {
        var model = {

        };
        return {
            get: function () {
                var newmodel = $wqtLocals.getObject("commonData");
                console.log($wqtLocals);
                //console.log(commonData);
                $.extend(model, model, newmodel || {});
                return userInfo;
            },
            set: function (data) {
                //data.headicon = "img/logo.png";//(data.headicon == undefined ? userInfo.headicon : data.headicon);
                $.extend(model, model, data || {});

                $wqtLocals.setObject("commonData", model);
            },

            clear: function () {

                $wqtLocals.setObject("commonData", {});
            },
            model: model
        };

    }])
    .factory("ServiceApi", function () {

        var getBaseUrl = function (url) {
            //protocol 属性是一个可读可写的字符串，可设置或返回当前 URL 的协议,所有主要浏览器都支持 protocol 属性
            var ishttps = 'https:' == document.location.protocol ? true : false;

            if (ishttps) {
                url = 'https://' + url;
            } else {
                url = 'http://' + url;
            }
            return url;
        }
        var domain = getBaseUrl("api.wqt.com");
        var api = domain + "/wqt/api";
        return {
            Header: {
                UnreadMessage: api + "/Notice/GetUnreadMessageList"
            },
            MemberCenter: {
                Login: api + "/member/login",
                findpassbymail: api + "/member/findpassbymail",
                querysecretsecuritytext: api + "/member/querysecretsecuritytext",
                findpassbysecretsecurity: api + "/member/findpassbysecretsecurity",
                VerifyCode: api + "/Login/VerifyCode",
                LoginOut: api + "/member/loginout",
                UserInfo: api + "/member/GetMemberInfo",
                AreaList: api + "/area/list",
                Repwd: api + "/member/RePwd",
                ChangeMemberLevel: api + "/member/ApplyChangeMemberLevel",
                UserChangeLevelTips: api + "/member/UserChangeLevelTips",
                EditMember: api + "/member/editMemberInfo",
                getCountryList: api + "/area/getCountryList",
                ApplyIdentify: api + "/member/applyVerifyIndentity",
                applyreportcenter: api + "/member/applyreportcenter"
            },
            Finace: {
                Report: api + "/finanical/prizesummary",
                Bonus: api + "/finanical/prizelist",
                BonusJT: api + "/finanical/PrizelistJT",
                Ledger: api + "/finanical/financiallist",
                TransferAmount: api + "/finanical/querywalletamount",
                TransferList: api + "/finanical/transferlist",
                TransferSet: api + "/finanical/createtransferout",
                TransferUserCode: api + "/finanical/transferusercode",
                WithdrawCreatecashlist: api + "/finanical/createcashlist",
                WithdrawAmount: api + "/finanical/querywalletamount",
                WithdrawList: api + "/finanical/createcashlist",
                WithdrawSet: api + "/finanical/createtransferout",
                WithdrawSubmit: api + "/finanical/createcash",
                WithdrawBank: api + "/finanical/createnewuserbank",
                insidePay: api + "/finanical/createremittance",
                insidePaylist: api + "/finanical/remittancelist",
                insidePayDelete: api + "/finanical/DelRemittance",
                WithdrawBankList: api + "/member/getMemberInfo",
                ExchangeSet: api + "/finanical/exchangeSet",
                ExchangeList: api + "/finanical/exchangeList"
            },
            Transaction: {
                jfg_gmxq: api + "/help/BuyList",
                jfg_indexdate: api + "/traderecord/StockIndexInfo",
                GuadanBuyRecord: api + "/traderecord/GuadanBuyRecord",
                GuadanSellRecord: api + "/traderecord/GuadanSellRecord",
                CreateBuyRecord: api + "/traderecord/CreateBuyRecord",
                CreateSellRecord: api + "/traderecord/CreateSellRecord",
                TradeBuyList: api + "//traderecord/TradeBuyList",
                TradeSellList: api + "//traderecord/TradeSellList",
                CancelTrade: api + "/traderecord/CancelTrade",
                jfg_csxq: api + "/help/SellList",
                jfjy_index_detail: api + "/help/HelpIndexInfo",
                jfjy_index_sell: api + "/help/CreateSellTrade",
                jfjy_index_buylist: api + "/help/AllHelpList",
                jfjy_index_buy: api + "/help/ManualMatch",
                jfjy_csjl: api + "/help/SellList",
				jfjy_csjl_backout: api + "/help/HelpListCancel",
				HelpDetailCancel: api + "/help/HelpDetailCancel",
                ManualMatchCancel: api + "/help/ManualMatchCancel",
                jfjy_csjl_check: api + "/help/HelpMaList",
                jfjy_csjl_ConfirmBuy: api + "/help/SellerConfirm",
                jfjy_csjl_money: api + "/help/SellDetailList",
                jfjy_csjl_money_Tousu: api + "/help/Tousu",
                jfjy_gmjl: api + "/help/BuyList",
                jfjy_gmjl_voucher: api + "/help/BuyerPayment"
            },
            MarketManage: {
                TJlist: api + "/member/GetTJMemberList",
                Tree: api + "/member/getmemberazszt",

                UserCanChangeLevelList: api + "/member/UserCanChangeLevelList",

                GetMemberAzsztSync: api + "/member/GetMemberAzwltSync",
                GetMemberTjsztSync: api + "/member/GetMemberTjwltSync ",
                AZnet: api + "/member/getMemberAzwlt ",
                Tjwlt: api + "/member/getmembertjwlt ",
                Azwltgetdeital: api + "/member/azwlt/getdeital ",

                jhList: api + "/member/GetJiHuoMemberList",

                memberJiHuo: api + "/member/memberJiHuo",
                QueryUserCodeLike: api + "/member/QueryUserCodeLike",
                QueryYSUserList: api + "/member/QueryYSUserList"
            },
            UserReg: {
                reg: api + "/member/regbyuesr ",
                auto: api + "/Member/GetRandomUserCode",
                TjCode: api + "/member/GetJiHuoMemberList ",
                checkUse: api + "/member/checkusercanuse ",
                checkjd: api + "/member/checkjd ",
                checktj: api + "/member/checktj ",
                erweima: api + "/member/tglinkreg ",
                accountState: api + "/member/UserIdentityAudit ",
                placementJudge: api + "/member/checkjd",
                regbyuesrft: api + "/member/regbyuesrft",
                ftbyuesr: api + "/member/ftbyuesr",
                GetSecurityCode: api + "/Sms/GetSecurityCode",
                CheckVerifCode: api + "/Sms/CheckVerifCode"

            },
            News: {
                newslist: api + "/Notice/newslist",
                newsdetail: api + "/Notice/newsdetail",
                createmessage: api + "/Notice/createmessage",
                MessageInfo: api + "/Notice/MessageInfo",
                getallmessagelist: api + "/Notice/getallmessagelist",
                GetUnreadMessageList: api + "/Notice/GetUnreadMessageList",
                replymessage: api + "/Notice/replymessage"
            },
            shopping: {
                ProductList: api + "/mall/ProductList",
                ShopCateogry: api + "/mall/ShopCateogry",
                ProductDetail: api + "/mall/ProductDetail",
                AddShopCart: api + "/mall/AddShopCart",
                ShopCartInfo: api + "/mall/ShopCartInfo",
                EditShopCart: api + "/mall/EditShopCart",
                DeliveryAddressList: api + "/mall/DeliveryAddressList",
                ShopCartInfo: api + "/mall/ShopCartInfo",
                CreateOrder: api + "/mall/CreateOrder",
                OrderList: api + "/mall/OrderList",
                CreateDeliveryAddress: api + "/mall/CreateDeliveryAddress",
                DeliveryAddressList: api + "/mall/DeliveryAddressList",
                EditDeliveryAddress: api + "/mall/EditDeliveryAddress",
                SetDefaultAddress: api + "/mall/SetDefaultAddress ",
                DeleteDeliveryAddress: api + "/mall/DeleteDeliveryAddress ",
                shopping_sjrzSet: api + "/mall/shopenter/apply",
                shopping_sjrzList: api + "/mall/shopenter/applylist",
                shopping_sjghSet: api + "/mall/supplier/apply",
                shopping_sjghList: api + "/mall/supplier/applylist"
            },
            TeamCenter: {
                Azwlt: api + "/member/GetMemberAzwlt",
            },
            Protal: {
                home: api + "/portal",
                JiFenTrendChart: api + "/traderecord/jifen/TrendChart"
            }
        };

    })
