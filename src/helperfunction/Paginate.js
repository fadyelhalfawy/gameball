import _ from "lodash";

export let Paginate = (data, pageSize, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    return _(data)
        .slice(startIndex)
        .take(pageSize)
        .value();
};