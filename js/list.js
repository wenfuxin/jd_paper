$(function() {
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
	cookie = JSON.parse(cookie);
	var a =0;
	for(var i in cookie){
		a+=cookie[i];
		
	}
	$(".coun").html(a);		
	});
	$(".list-footer").load("footer.html", function() {
		var url = location.href;
		var str = url.split("?");
		str1 = decodeURIComponent(str[1]);
		var bt = str1;
		add(bt);
		var btt = $("#bt").val();
		$("#bt").next().click(function() {
			add(btt);
		});

		function add(b) {
			var str = "";
			var con = 0;
			var a = [
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
					con++;
					data = data.DATA.data[0].skuData;
					for(var i = 0; i < data.length; i++) {
						if(data[i].name.indexOf(b) != -1) {
							str += '<li data-url=' + data[i].skuId + '><a href="#"><img src=' + data[i].image + '></a><p class="xs">' + data[i].name + '</p><span>￥' + parseInt(data[i].pPrice).toFixed(2) + '</span><a href="##" class="gwc">加入购物车</a></li>';
							$(".list-top3 ul").html(str);
						}
						if(con == a.length) {
							if(str.length !== 0) {
								$(".jieguo").html("<p><a href='##'>全部结果></a><a href='##'>" + b + "</a></p>").bind();
								$(".list-top4 div").html("<p>恭喜找到与<span>" + b + "</span>”相关的商品</p></div>");
								$(".list-top3 ul").html(str);
								$("#bt").attr({
									"placeholder": bt
								});
							} else {
								$(".list-top4 div").html("<p>汪~没有找到与“<span>" + b + "</span>”相关的商品</p></div>");
								$("#bt").attr({
									"placeholder": bt
								});
							}
						}
					}
				});
			}
		}
		$(".list-top3 ").on("click", "li", function() {
			var $id = $(this).attr("data-url");
			window.location.href = "page.html?" + $id;
		});
	});
});