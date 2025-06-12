async function extractData(api) {
    const response = await fetch(api);
    return await response.json();
};