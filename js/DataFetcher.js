export const dataFetcher = async (tokenName) => {
	try {
		// fetching the data from API
		const response = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenName}`);
		if (!response.ok) throw new Error("Server Down !!"); // checking if response is ok

		const data = await response.json();

		return data;
	} catch (err) {
		console.error(err);
	}
};
