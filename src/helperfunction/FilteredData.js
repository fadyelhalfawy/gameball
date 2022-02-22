export let filteredData = (allData, searchQuery, number) => {
    let data = allData;

    if (searchQuery && number === 0) data = allData.filter(d => d.name.toLowerCase().startsWith(searchQuery.toLowerCase()));

    else if (searchQuery && number === 1) data = allData.filter(d => d.sender.toLowerCase().startsWith(searchQuery.toLowerCase()));

    return data;
};