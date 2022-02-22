import {Component} from "react";
import {GetIconSort} from "../helperFunctions/GetIconSort";

export default class TableHeader extends Component {
    render() {

        const { columns, onSort, sortColumn } = this.props;

        return(
            <thead>
            <tr>
                <th>#</th>
                { columns.map( column =>
                    <th
                        className="clickable"
                        key={column.path}
                        onClick={() => onSort(column.path)}
                    >
                        {column.label} {GetIconSort(column, sortColumn)}
                    </th>
                )}
            </tr>
            </thead>
        );
    };
}