import _ from "lodash";

export const renderTable = (data, column) => {
    if(column.content) return column.content(data);

    return _.get(data, column.path);
};