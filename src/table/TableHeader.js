import {Component} from "react";
import {getIconSort} from "../helperfunction/GetIconSort";

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
                        key={column.path || column.key}
                        onClick={() => onSort(column.path)}
                    >
                        {column.label} {getIconSort(column, sortColumn)}
                    </th>
                )}
            </tr>
            </thead>
        );
    };
}