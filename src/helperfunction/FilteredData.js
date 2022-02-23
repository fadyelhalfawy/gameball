export let filteredData = (allData, searchQuery, number) => {
    let data = allData;

    if (searchQuery && number === 0) data = allData.filter(d => d.user.name.toLowerCase().startsWith(searchQuery.toLowerCase()));

    else if (searchQuery && number === 1) data = allData.filter(d => d.comment.toLowerCase().startsWith(searchQuery.toLowerCase()));

    return data;
};