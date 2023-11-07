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

const fetchTokenData = async () => {
	try {
		// fetching the data from API
		const response = await fetch(`https://api.coingecko.com/api/v3/coins/${token}`);
		if (!response.ok) throw new Error("Server Down !!"); // checking if response is ok

		const data = await response.json();

		//showing data inside a div
		tokenDataShower(data);
	} catch (err) {
		console.log(err);
	}
};

const tokenDataShower = (tokenData) => {
	//selecting the div to show the data
	const tokenDataDiv = document.getElementById("token-data-viewer");

	//token properties array
	const tokenProperties = [{ RANK: tokenData.market_cap_rank }, { MARKET_CAP: tokenData.market_data.market_cap.usd }, { TOTAL_VOLUME: tokenData.market_data.total_volume.usd }];

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
