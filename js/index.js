$(function() {
	$(".footers").load("footer.html");
	$(".header").load("header.html", function() {
//		搜索下拉提示相关商品
		$("#bt").bind("input property", function() {
			$.getJSON("https://suggest.taobao.com/sug?code=utf-8&q=" + $("#bt").val() + "&callback=?", function(data) {
				var str = "";
				var data = data.result;
				data.forEach(function(item) {
					str += "<li>" + item[0] + "</li>"
					$(".search").show().html(str);
				});
			});
		});
		$(".search").on("mouseover", "li", function() {
			$(this).css({
				"background": "#ccc"
			}).siblings().css({
				"background": "#fff"
			});
		});
		$(".search").on("click", "li", function() {
			var str = $(this).html();
			$("#bt").val(str);
			$(".search").css("display", "none");
		});
		/*倒计时*/
		function time() {
			$time = $("#time-1");
			$img = $time.children();
			setInterval(function() {
				$oDate = new Date();
				$now = new Date("2018-04-14 12:00:00");
				$time = $now.getTime() - $oDate.getTime();
				$h = Math.floor(($time % (24 * 3600 * 1000)) / (3600 * 1000));
				$m = Math.floor(($time % (24 * 3600 * 1000)) % (3600 * 1000) / (60 * 1000));
				$s = Math.floor(($time % (24 * 3600 * 1000)) % (3600 * 1000) % (60 * 1000) / 1000);
				$arr = [
					parseInt($h / 10), $h % 10,
					parseInt($m / 10), $m % 10,
					parseInt($s / 10), $s % 10,
				];
				for(var i = 0; i < $arr.length; i++) {
					$img[i].src = "../img/" + $arr[i] + ".png";
				}
			}, 1000);
		}
		time();
		
	//cookie操作
	function getCookie(name) {
		var str = document.cookie;
		var arr = str.split("; ");
		for(var i = 0; i < arr.length; i++) {
			var arr1 = arr[i].split("=");
			if(arr1[0] === name) {
				return arr1[1];
			}
		}
	}

	function setCookie(name, val, day) {
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + day);
		document.cookie = name + "=" + val + ";expires=" + oDate + ";path=/";
	}

	function removeCookie(name) {
		setCookie(name, 1, -1);
	}
	
	var cookie = getCookie("nam");
	cookie = JSON.parse(cookie);//将字符串转化为对象
	var a =0;
	for(var i in cookie){
		a+=cookie[i];
		
	}
	console.log($(".coun"))
	$(".coun").html(a)
	});
	//加载限时抢购商品
	$.getJSON("https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00725585&callback=?", function(data) {
		var data = data.DATA.data[0].skuData;
		var str = '';
		for(var i = 0; i < 5; i++) {
			str += "<li data-url=" + data[i].skuId + "><a href='#'><img src=" + data[i].image + "><p>" + data[i].name + "</p><p><span>￥" + parseInt(data[i].pPrice).toFixed(2) + "</span><del>￥" + parseInt(data[i].pcpPrice).toFixed(2) + "</del></p>"
			$(".time-2").html(str);
		}
		//楼层滚动自动高亮
		var $Li = $("#floorNav li");
		var $lou = $(".lou-1");
		var flag = true;
		$(window).scroll(function() {
			if(flag) {
				var scrollTop = $(this).scrollTop();
				if(scrollTop > 650) {
					$("#floorNav").fadeIn();
				} else {
					$("#floorNav").fadeOut();
				}
				$lou.each(function(index) {
					if(scrollTop > $(this).offset().top - $(this).outerHeight() / 2) {
						$Li.eq(index).addClass("hover").siblings().removeClass("hover");
					}
				});
			}
		});
		//:not去除所有与给定选择器匹配的元素，li:not(:last)去除最后一个
		//eg：$("input:not(:checked)")
		$("#floorNav li:not(:last)").click(function() {
			flag = false;
			var index = $(this).index();
			$(this).addClass("hover").siblings().removeClass("hover");
			$("body,html").animate({
				"scrollTop": $lou.eq(index).offset().top
			}, function() {
				flag = true;
			});
		});
		$("#floorNav li:last").click(function() {
			$("body,html").animate({
				"scrollTop": 0
			});
		});

		$("#shopping").on("click", "li", function() {
			var $id = $(this).attr("data-url");
			window.location.href = "page.html?" + $id;
		});
	});
});