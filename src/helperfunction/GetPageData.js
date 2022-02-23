import _ from "lodash";
import {Paginate} from "./Paginate";
import {filteredData} from "./FilteredData";

export const getPageData = (data, pageSize, currentPage, sortColumn, searchQuery, number) => {
    const getData = filteredData(data, searchQuery, number);

    const allData = _.orderBy(getData, [sortColumn.path], [sortColumn.order]);

    const dataPaginate = Paginate(allData, pageSize, currentPage);

    return ({ length: data.length, dataPaginate });
}
