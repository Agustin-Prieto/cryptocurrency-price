var imprData = function(data){
	var output = '';
			output += 
			`<ul class="global_data-list">
				<li>Market Cap: $${data.total_market_cap_usd}</li>
				<li>Total 24h Volume USD: $${data.total_24h_volume_usd}</li>
				<li>Bitcoin Percentage Of Market Cap: ${data.bitcoin_percentage_of_market_cap}%</li>
				<li>Currencies: ${data.active_currencies}</li>
				<li>Assets: ${data.active_assets}</li>
				<li>Markets: ${data.active_markets}</li>
			</ul>`;

			document.getElementById('globalData').innerHTML = output;
}

var imprCurr = function(curr){
	var output = '';

		for(var i in curr){			
			output += 
			`<tr>
			 	<th scope="row">${curr[i].rank}</th>
				<td><a href="html/${curr[i].name}.html">${curr[i].name}</a></td>
				<td>$${curr[i].price_usd}</td>
				<td>$${curr[i].market_cap_usd}</td>
				<td>${curr[i].total_supply} ${curr[i].symbol}</td>
				<td class="coin-percent">${curr[i].percent_change_24h}%</td>
		 	</tr>`;
		}

			document.getElementById('info').insertAdjacentHTML('beforeend', output);
}

var notFound = function(){
	var output = '';
	output += 
	`
		<h1>Site Not Found</h1>
	`;
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
			imprData(data);
			
		} else if (this.status == 404) {
			notFound();
		}
	}

	xhr.send();
}

function loadCurrencies(){
	var xhr = new XMLHttpRequest();
	var limit = '?limit=100';
  
	xhr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/' + limit, true);

	xhr.onerror = function(){
		console.log('Request Error...');
	}


	xhr.onload = function(){
		if (this.status == 200) {
			var currencies = JSON.parse(this.responseText);

			imprCurr(currencies);
		} else if (this.status == 404) {
			notFound();
		}
	}

	xhr.send();
}

loadCurrencies();
globalData();