// getting token from parameter
const token = document.currentScript.getAttribute("data-token");
//valid token's array
const validTokenList = ["bitcoin", "ethereum", "tether", "usd-coin"];

//Adding listener to first load the whole DOM elements
document.addEventListener("DOMContentLoaded", () => {
	// if token not specified
	if (!token) throw new Error("Token is not specified");
	//if invalid token name provided
	else if (!validTokenList.includes(token)) throw new Error("Invalid token specified");

	//fetching token data
	fetchTokenData();
});

//data fetching
const fetchTokenData = async () => {
	try {
		// fetching the data from API
		const response = await fetch(`https://api.coingecko.com/api/v3/coins/${token}`);
		if (!response.ok) throw new Error("Server Down !!"); // checking if response is ok

		const data = await response.json();

		//showing data inside a div
		tokenDataShower(data);
	} catch (err) {
		console.error(err);
	}
};

//showing token info
const tokenDataShower = (tokenData) => {
	//selecting the div to show the data
	const tokenDataDiv = document.getElementById("token-data-viewer");

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
