import { dataFetcher } from "./DataFetcher.js";
import { tokenDataShower } from "./TokenDataInfoShower.js";

//checking if previously The Script tag was executed
if (!document.scriptPreEvaluated) {
	document.scriptPreEvaluated = true; // Only for the first time of Script execution, eventListener will be added
	document.addEventListener("DOMContentLoaded", () => {
		// getting the list of all of my scripts.
		const tokenScripts = document.querySelectorAll('script[src="./js/CoinGecko-fetch-main.js"]');

		//listing all the valid tokens for further validation
		const validTokens = ["bitcoin", "ethereum", "tether", "usd-coin"];

		// Looping over it one by one
		tokenScripts.forEach(async (script) => {
			// getting the token name
			try {
				const tokenName = script.getAttribute("data-token");
				//fetching the tokenInfo

				//checking if token name not provided or wrong provided
				if (!tokenName) throw new Error("Provide a Token Name");
				else if (!validTokens.includes(tokenName)) throw new Error("Provide a valid token Name");

				const TokenData = await dataFetcher(tokenName);
				//showing the token info into corresponding divs
				tokenDataShower(TokenData);
			} catch (err) {
				console.error(err);
			}
		});
	});
}
