function loadCurrencies(){
	var xhr = new XMLHttpRequest();
	var limit = '?limit=100';
  
	xhr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/' + limit, true);

	// optional
	// xhr.onprogress = function(){
	// 	console.log('READYSTATE: ', xhr.readyState);
	// }

	xhr.onerror = function(){
		console.log('Request Error...');
	}


	xhr.onload = function(){
		// console.log('READYSTATE: ', xhr.readyState);
		if (this.status == 200) {
			var currencies = JSON.parse(this.responseText);
			var output = '';

			for(var i in currencies){
				output += 
				`<ul>
					<li>Name: ${currencies[i].name}</li>
					<li>Symbol: ${currencies[i].symbol}</li>
					<li>Rank: ${currencies[i].rank}</li>
					<li>Price: $${currencies[i].price_usd}</li>
					<li>Market Cap: $${currencies[i].market_cap_usd}</li>
					<li>Change in 24h: ${currencies[i].percent_change_24h}%</li>
				</ul>`;
			}

			document.getElementById('priceContainer').innerHTML = output;

			// console.log(this.responseText);
			
		} else if (this.status == 404) {
			console.log('Not Found');
		}
	}

	// sends request
	xhr.send();
}

function globalData(){
	var xhr = new XMLHttpRequest();
  
	xhr.open('GET', 'https://api.coinmarketcap.com/v1/global/', true);

	xhr.onerror = function(){
		console.log('Request Error...');
	}


	xhr.onload = function(){
		if (this.status == 200) {
			var data = JSON.parse(this.responseText);
			var output = '';

				output += 
				`<ul>
					<li>Market Cap: $${data.total_market_cap_usd}</li>
					<li>total 24h volume usd: $${data.total_24h_volume_usd}</li>
					<li>bitcoin percentage of market cap: ${data.bitcoin_percentage_of_market_cap}%</li>
					<li>active currencies: ${data.active_currencies}</li>
					<li>active assets: ${data.active_assets}</li>
					<li>active markets: ${data.active_markets}</li>
				</ul>`;

			document.getElementById('globalData').innerHTML = output;
			
		} else if (this.status == 404) {
			console.log('Not Found');
		}
	}

	// sends request
	xhr.send();
}

loadCurrencies();
globalData();