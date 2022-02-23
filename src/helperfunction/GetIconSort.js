import React from "react";
import { FaSortAlphaDown, FaSortAlphaUpAlt } from "react-icons/fa";

export const getIconSort = (column, sortColumn) => {
    if(column.path !== sortColumn.path) return null;

    if(sortColumn.order === 'asc') return <FaSortAlphaDown />

    return <FaSortAlphaUpAlt />
}