
// 发送get 请求，获取 当前位置IP
$.getJSON('https://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random(), function(data) {
	// 获取当前城市
	var city = data.Isp.slice(data.Isp.indexOf('省') + 1, data.Isp.indexOf('市') + 1);
	// 发送get 请求， 获取天气情况
	$.getJSON('http://api.map.baidu.com/telematics/v3/weather?callback=?', {
		location: '福州',
		output: 'json',
		ak: 'iw5m2G7ayDow8ofDdDGVUMB3',
		mcode: 'com.BaiduWeather'
	}, function(data) {
		console.log(data);
		// 先取出 result
		var result = data.results[0];
		// 把城市显示在页面上
		$('header').text(result.currentCity);
		// 取出 pm25
		var pm25 = result.pm25;
		// 获取当天天气状况
		var today = result.weather_data[0];
		$('main .icon').css('background-image', 'url(' + today.dayPictureUrl + ')');
		$('main .temper').text(today.temperature);
		$('main .weather').text(today.weather);
		$('mian .wind').text(today.wind);
		var nowTempr = today.date.substr(today.date.indexOf('：') + 1);
		nowTempr = nowTempr.replace(')', '');
		$('main .current').text('实时温度' + nowTempr + '，空气指数' + pm25 + '，' + getpm25String(pm25));

		// 后三天天气状况
		var sections = $('footer section');
		for(var i = 1; i < result.weather_data.length; i++) {
			// 取出显示的 section
			var section = sections[i - 1];
			// 在取出对应的天气
			var weather = result.weather_data[i];
			// 显示
			$('.week', section).text(weather.date);
			$('.icon', section).css('background-image', 'url(' + weather.dayPictureUrl + ')');
			$('.temper', section).text(weather.temperature);
			$('.weather', section).text(weather.weather);
			$('.wind', section).text(weather.wind);
		}
	})
});
// 根据 pm25 得到空气状况： 优、良、差、严重
function getpm25String(pm25) {
	if(pm25 <= 50) {
		return '优';
	} else if(pm25 <= 100) {
		return '良';
	} else if(pm25 <= 200) {
		return '轻度污染';
	} else if(pm25 <= 300) {
		return '中毒污染';
	} else if(pm25 <= 400) {
		return '重度污染';
	} else if(pm25 <= 500) {
		return '严重污染'
	} else {
		return '专家说：来场大风是治理雾霾的最佳方案';
	}
}