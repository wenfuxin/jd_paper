$(function() {
	var url = location.href;
	var $id = url.split("?")[1];
	var str = "";
	$(".header").load("header1.html",function(){	
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
	//加载购物车数量	
	var cookie = getCookie("nam");
	cookie = JSON.parse(cookie);
	var a =0;
	for(var i in cookie){
		a+=cookie[i];
		
	}
	$(".coun").html(a);	
	
	});
	$(".page-footer").load("footer.html");
	$(".box8").on("mousemove", ".min", function() {
		var url = $(this).attr("data-url");
		$(this).css({
			"border": "2px solid red"
		}).siblings().css({
			"border": "2px solid #fff"
		});
		$(".samll").show();
		$(".box12").show();
		$(".middele").attr({
			"src": url
		});
		$(".maxmiddle").attr({
			"src": url
		});
		$(this).mouseout(function() {
			$(".samll").hide();
			$(".box12").hide();
		});
	});
	//加		
	$(".box8").on("mousedown", ".add", function() {
		var sum = $(".tex").val();
		sum++;
		$(".tex").val(sum);
	});
	//减
	$(".box8").on("mousedown", ".sub", function() {
		var sum = $(".tex").val();
		sum--;
		if(sum <= 1) {
			sum = 1
		}
		$(".tex").val(sum);
	});
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
	//加入购物车	
	$(".box8").on("click", "button", function() {
		if(getCookie("nam")) {
			var obj = JSON.parse(getCookie("nam"));
		} else {
			var obj = {};
		}
		var sum = parseInt($(".tex").val());
		var sum1 = $(".box9").attr("data-url");
		if(obj[sum1]) {
			obj[sum1] += sum
		} else {
			obj[sum1] = sum
		}
		setCookie("nam", JSON.stringify(obj), 7)
		location.href = "shoppcart.html?" + sum1 + "?"
	});


	function add() {
		var str = "";
		var a = [
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00725585&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00725321&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00718507&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717303&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717307&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717320&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717324&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717449&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717308&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717326&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717317&callback=?",
			"https://www.3.cn/bup/index_new.php?app=Bi&action=get_sku&groupId=00717328&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717331&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717365&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717366&callback=?",
			"https://www.3.cn/bup/index_new.php?app=Bi&action=get_sku&groupId=00717396&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717442&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717443&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717445&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717447&callback=?"
		]
		for(var i = 0; i < a.length; i++) {
			$.getJSON(a[i], function(data) {
				data = data.DATA.data[0].skuData;
				for(var i in data) {
					if(data[i].skuId == $id) {
						str = "";
						str += '<div class="box9" data-url=' + data[i].skuId + '><div class="samll"></div><img src=' + data[i].image + ' class="middele"></div><div class="box10"><img src="../img/105.png" class="min" data-url="../img/105.png"><img src=' + data[i].image + ' class="min" data-url=' + data[i].image + '><img src=' + data[i].image + ' class="min" data-url=' + data[i].image + '><img src=' + data[i].image + ' class="min" data-url=' + data[i].image + '></div><div class="box11"><h1>' + data[i].name + '</h1><h2>京东自营，好货嗨翻天~~~~~~~~~</h2><dl class="dls"><dt>优惠价：</dt><dd><strong>¥' + parseInt(data[i].pcpPrice).toFixed(2) + ' &nbsp;</strong></dd></dl><dl class="selector"><dt class="selector_title">白条分期：</dt> <dd><ul><li class="change"><a href="##">不分期</a></li><li> <a href="##">￥6.73起×3期</a></li><li><a href="#">￥3.42起×6期</a></li><li> <a href="##">￥1.76起×12期</a></li><li> <a href="##">￥0.93起×24期</a></li><li><a href="##">￥0.75起x36期</a></li></ul></dd></dl><div class="box13"><span>数&nbsp;&nbsp;量:</span><input type="button" value="-" class="sub"><input type="text" value="1" class="tex"><input type="button" value="+" class="add"><button>加入购物车</button></div><p>服务承诺： 精选食材  品质保证   五星服务  贴心宅配</p></div><div class="box12"><img src=' + data[i].image + ' class="maxmiddle" ></div>'
					}
				}
				//商品放大镜效果
				$("#list").html(str);
				$(".box9").mouseover(function(e) {
					$(".samll").show();
					$(".box12").show();
					$(window).mousemove(function(e) {
						var scrolltop = $(window).scrollTop();
						var l = e.clientX - $(".middele").offset().left - $(".samll").outerWidth() / 2;
						var t = e.clientY - $(".middele").offset().top - $(".samll").outerHeight() / 2 + scrolltop;
						if(l <= 0) {
							l = 0;
						}
						if(t < 0) {
							t = 0;
						}
						if(l >= $(".middele").outerWidth() - $(".samll").outerWidth()) {
							l = $(".middele").outerWidth() - $(".samll").outerWidth();
						}
						if(t >= $(".middele").outerHeight() - $(".samll").outerHeight()) {
							t = $(".middele").outerHeight() - $(".samll").outerHeight();
						}
						$(".samll").css({
							"left": l,
							"top": t
						})
						$(".maxmiddle").css({
							"left": -l * 2,
							"top": -t * 2
						})
					});
				});
				$(".box9").mouseout(function() {
					$(".samll").hide();//小图
					$(".box12").hide();//透明度
				});
			});
		}
	}
	add();
});