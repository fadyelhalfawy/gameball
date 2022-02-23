import _ from "lodash";
import {Paginate} from "./Paginate";
import {filteredData} from "./FilteredData";

export const getPageData = (data, pageSize, currentPage, sortColumn, searchQuery, number) => {
    const dataFiltered = filteredData(data, searchQuery, number);

    const allData = _.orderBy(dataFiltered, [sortColumn.path], [sortColumn.order]);

    const dataPaginate = Paginate(allData, pageSize, currentPage);

    return ({ length: dataFiltered.length, dataPaginate });
}
