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
				`<ul class="global_data-list">
					<li>Market Cap: $${data.total_market_cap_usd}</li>
					<li>Total 24h Volume USD: $${data.total_24h_volume_usd}</li>
					<li>Bitcoin Percentage Of Market Cap: ${data.bitcoin_percentage_of_market_cap}%</li>
					<li>Currencies: ${data.active_currencies}</li>
					<li>Assets: ${data.active_assets}</li>
					<li>Markets: ${data.active_markets}</li>
				</ul>`;

			document.getElementById('globalData').innerHTML = output;
			
		} else if (this.status == 404) {
			console.log('Not Found');
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
			var output = '';

			for(var i in currencies){			
				output += 
				`<tr>
				 	<th scope="row">${currencies[i].rank}</th>
					<td><a href="${currencies[i].name}">${currencies[i].name}</a></td>
					<td>$${currencies[i].price_usd}</td>
					<td>$${currencies[i].market_cap_usd}</td>
					<td>${currencies[i].total_supply} ${currencies[i].symbol}</td>
					<td class="coin-percent">${currencies[i].percent_change_24h}%</td>
		 		</tr>`;
			}

			document.getElementById('info').insertAdjacentHTML('beforeend', output);

		} else if (this.status == 404) {
			console.log('Not Found');
		}
	}

	xhr.send();
}

loadCurrencies();
globalData();