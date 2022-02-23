export const createKey = (data, column) => {
    return data._id + (column.path || column.key);
};