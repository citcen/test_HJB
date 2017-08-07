
// 倒计时
function countDown(intDiff, hL, hR, mL, mR, cL, cR, callBack){
    var count = window.setInterval(function () {
        var day = 0,
            hour = 0,
            hourTwo = 0,
            minute = 0,
            second = 0;     //时间默认值
        if (intDiff > 0) {
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60));
            hourTwo = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hourTwo * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hourTwo * 60 * 60) - (minute * 60);
            if (hour <= 9) {

                hL.html("0");
                hR.html(hour);
            } else {
                hL.html(String(hour).substr(0, 1));
                hR.html(String(hour).substr(-1));
            }
            if (minute <= 9) {
                mL.html("0");
                mR.html(minute);
            } else {
                mL.html(String(minute).substr(0, 1));
                mR.html(String(minute).substr(-1));
            }
            if (second <= 9) {
                cL.html("0");
                cR.html(second);
            } else {
                cL.html(String(second).substr(0, 1));
                cR.html(String(second).substr(-1));
            }
        } else {
            clearInterval(count);
            callBack();
            hL.html(0);
            hR.html(0);
            mL.html(0);
            mR.html(0);
            cL.html(0);
            cR.html(0);
        }
        intDiff --;
    }, 1000);
}

$(function(){
    var containerTime = $("#container-time");       //倒计时容器
    var actStart = containerTime.find(".act-start");
    var actEnd = containerTime.find(".act-end");

    var fixedBtn = $("#fixed-button");
    var bgBuyBtn = fixedBtn.find(".btn-buy");
    var bgBuyMid = bgBuyBtn.find(".bgcolor-mid");
    var bgBuyTop = bgBuyBtn.find(".bgcolor-top");

    var hourL = $(".hour-l").eq(0);
    var hourR = $(".hour-r").eq(0);
    var minL = $(".min-l").eq(0);
    var minR = $(".min-r").eq(0);
    var secL = $(".sec-l").eq(0);
    var secR = $(".sec-r").eq(0);

    var myDate = new Date();                                //当前时间
    var years = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var strDay =  myDate.getDate();
    var hours = myDate.getHours();
    var nowTimeSec = Math.floor(myDate.getTime() / 1000);   //当前时间戳（秒）

    var btnAlink = "#";        //按钮跳转地址

    // 判断当前时间是否合适，并获取相应时间点
    function judgeTime() {
        if (strDay >= 4  && strDay <= 8) {      //日期大于4号小于等于8号
            if (strDay < 8 || (strDay == 8 && hours <= 15)) {       //8号15点前
                hours >= 9 ? btnOkClick() : btnNoClick();       //9.00-15.00按钮允许点击
                showTime();
                countDown(nextTime(nowTimeSec, years, month), hourL, hourR, minL, minR, secL, secR, btnOkClick);

            } else  hideTime();
        } else hideTime();
    }
    judgeTime();

    // 显示时间
    function showTime() {
        containerTime.removeClass("time-end").addClass("time-start");
        actStart.show();
        actEnd.hide();
        btnNoClick();
    }

    // 隐藏时间
    function hideTime() {
        containerTime.removeClass("time-start").addClass("time-end");
        actStart.hide();
        actEnd.show();
        btnNoClick();
    }

    // 按钮禁止点击
    function btnNoClick() {
        bgBuyBtn.css("background-color", "#e0e0e0");
        bgBuyMid.css("background-color", "#cdcdcd");
        bgBuyTop.css("background-color", "#b2b2b2").find(".btn-text").attr("href", "javascript:;");
    }

    // 允许按钮点击
    function btnOkClick() {
        bgBuyBtn.css("background-color", "#f20015");
        bgBuyMid.css("background-color", "#d50000");
        bgBuyTop.css("background-color", "#f40000").find(".btn-text").attr("href", btnAlink);
    }

    // 获取到下个倒计时的秒数
    function nextTime(nowTimeSec, years, month) {
        var nextTimeSec = Date.parse(years + "/" + month +"/8 9:00") / 1000;
        return nextTimeSec - nowTimeSec;
    }
});
