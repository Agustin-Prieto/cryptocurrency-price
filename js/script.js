function loadApi(){
	var xhr = new XMLHttpRequest();
	var limit = '?limit=100';
  
	xhr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/' + limit, true);

	// optional
	// xhr.onprogress = function(){
	// 	console.log('READYSTATE: ', xhr.readyState);
	// }

	xhr.onerror = function(){
		console.log('Reques Error...');
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

loadApi();