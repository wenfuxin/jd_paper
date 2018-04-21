$(function() {
	$(".product").load("product.html", function() {
		var $lou = $("lou-1");
		var a = [
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

		function kou(b) {
			var str = "";
			$.getJSON(a[b], function(data) {
				var data = data.DATA.data[0].skuData;
				for(var j = 0; j < data.length; j++) {
					str += '<li data-url=' + data[j].skuId + '><a href="#"><img src=' + data[j].image + '></a><p class="xs">' + data[j].name + '</p><span>￥' + parseInt(data[j].pPrice).toFixed(2) + '</span><a href="#" class="gwc">加入购物车</a></li>'
					$(".loutop" + (b + 2) + " ul").html(str);
					console.log($(".loutop" + (b + 2) + " ul"))
				}
			});
		}
		for(var i = 0; i < 17; i++) {
			kou(i);
		}
	});
	//加载超值量版商品
	$.getJSON("https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00725321&callback=?", function(data) {
		var str = "";
		var data = data.DATA.data[0].skuData;
		for(var i = 0; i < data.length; i++) {
			str += '<li data-url=' + data[i].skuId + '><div class="louc-2"><a href=""></a><a href="#"><img src=' + data[i].image + '></a><div class="ri"><a href="">' + data[i].name + '</a><p>超值限量版定制款</p></div></div><div class="louc-t"><div class="louc-top"><p>量版价：<span>￥' + parseInt(data[i].pPrice).toFixed(2) + '</span></p></div><a href=""><span>加入购物车</span></a></div></li>'
			$(".louc-1 ul").html(str);
		}
	});
	//量版第二栏
	$.getJSON("https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00718507&callback=?", function(data) {
		var str = ""
		var data = data.DATA.data[0].skuData;
		for(var i = 0; i < data.length; i++) {
			str += '<li data-url=' + data[i].skuId + '><a href="##"><img src=' + data[i].image + ' class="imgs"/><p>' + data[i].name + '</p><p><span>￥209.00</span><a href="#"><img src="../img/gw1.jpg" alt="" /></a></p></a></li>'
			$(".loutop ul").html(str);
		}
	});
	//品牌特卖1楼
	$.getJSON("https://ai.jd.com/General?app=Bi&action=get_ad&groupId=00368891&callback=?", function(data) {
		var str = "";
		var data = data.DATA.adData;
		for(var i = 0; i < data.length; i++) {
			str += '<li data-url=' + data[i].skuId + '><a href="##"><img src=' + data[i].pictureUrl + '></a></li>'
			$(".lou1 ul").html(str);
		}
	});
	//品牌特卖2楼
	$.getJSON("https://ai.jd.com/General?app=Bi&action=get_ad&groupId=00368892&callback=?", function(data) {
		var str = "";
		var data = data.DATA.adData;
		for(var i = 0; i < data.length; i++) {
			str += '<li data-url=' + data[i].skuId + '><a href="##"><img src=' + data[i].pictureUrl + '></a></li>'
			$(".loutop1 ul").html(str);
		}
	});
});