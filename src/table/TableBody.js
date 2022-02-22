import {Component} from "react";
import {RenderTable} from "../helperFunctions/RenderTable";

export default class TableBody extends Component {

    render() {
        const { data, columns } = this.props;

        return(
            <tbody>
            {data.map((d, index) => (
                <tr key={d._id}>
                    <td>{index + 1}</td>
                    {columns.map(column =>
                        <td key={column.path}>
                            { RenderTable(d, column) }
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        );
    };
}
