import {Component} from "react";
import {renderTable} from "../helperfunction/RenderTable";
import {createKey} from "../helperfunction/CreateKey";

export default class TableBody extends Component {

    render() {
        const { data, columns } = this.props;

        return(
            <tbody>
            {data.map((d, index) => (
                <tr key={d._id}>
                    <td>{index + 1}</td>
                    {columns.map(column =>
                        <td key={createKey(d, column)}>
                            { renderTable(d, column) }
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        );
    };
}
