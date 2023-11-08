//checking if previously The Script tag was executed
if (!document.scriptPreEvaluated) {
	document.scriptPreEvaluated = true; // Only for the first time of Script execution, eventListener will be added

	// adding listener to listen after DOM Rendered
	document.addEventListener("DOMContentLoaded", () => {
		//checking if The environmet is development or production
		// let scriptSrc;

		// // if (window.location.hostname === "127.0.0.1") {
		// // 	scriptSrc = "./js/CoinGecko-fetch-main.js"; // if localhost then ScriptSrc will be relative path
		// // } else {
		// // 	scriptSrc = "https://javascript-widget-coingecko-token.vercel.app/js/CoinGecko-fetch-main.js";
		// // }
		// console.log(scriptSrc);
		// getting the list of all of my scripts.
		const validTokens = ["bitcoin", "ethereum", "tether", "usd-coin"];

		const allTokenScripts = Array.from(document.getElementsByTagName("script"));

		const useFulTokenScripts = allTokenScripts.filter((script) => validTokens.includes(script.getAttribute("data-token")));

		//listing all the valid tokens for further validation

		// Looping over it one by one
		useFulTokenScripts.forEach((script) => {
			// getting the token name
			try {
				const tokenName = script.getAttribute("data-token");
				//fetching the tokenInfo

				//checking if token name not provided or wrong provided
				if (!tokenName) throw new Error("Provide a Token Name");
				else if (!validTokens.includes(tokenName)) throw new Error("Provide a valid token Name");

				//fetching Token info from API and then displaying info
				dataFetcher(tokenName);
			} catch (err) {
				console.error(err);
			}
		});
	});

	//Data Fetcher function
	const dataFetcher = async (tokenName) => {
		try {
			// fetching the data from API
			const response = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenName}`);
			if (!response.ok) throw new Error("Server Down !!"); // checking if response is ok

			const data = await response.json();

			//displaying fetched info from API
			tokenDataShower(data);
		} catch (err) {
			console.error(err);
		}
	};

	//showing token info
	const tokenDataShower = (tokenData) => {
		//selecting the div to show the data
		const tokenDataDiv = document.getElementById(tokenData.id);

		//changing number to billions
		const market_cap = numberToBillions(tokenData.market_data.market_cap.usd);
		const total_volume = numberToBillions(tokenData.market_data.total_volume.usd);

		//token properties array
		const tokenProperties = [{ RANK: tokenData.market_cap_rank }, { "MARKET CAP": `$${market_cap} USD` }, { "TOTAL VOLUME": `$${total_volume} USD` }];

		//populating the HTML containing token info
		tokenDataDiv.innerHTML = `<div class="token-div">
    <div class="token-name-div">
      <img src="${tokenData.image.small}" />
      <div>
        <p class="token-name" >${tokenData.name} (${tokenData.symbol})</p>
        <p class="token-price">${tokenData.market_data.current_price.usd} USD</p>
      </div>
      </div>
     <ul class="token-details">
        ${tokenProperties
					.map((property) => {
						const key = Object.keys(property)[0];

						return `
							<li class="token-listItem">
								<span class="token-key">${key}</span>
								<span class="token-value">${property[key]}</span>
							</li>`;
					})
					.join("")}
     </ul>
   </div>`;
	};

	//changing number to billions
	const numberToBillions = (value) => {
		const numberInBillions = value / 1000000000;
		const formattedNumber = numberInBillions.toFixed(2);

		return formattedNumber;
	};
}
