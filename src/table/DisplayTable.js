import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export const DisplayTable = ({ data, columns, onSort, sortColumn }) => {

    return(
        <table className="table table-dark">
            <TableHeader
                columns={columns}
                onSort={onSort}
                sortColumn={sortColumn}
            />

            <TableBody
                data={data}
                columns={columns}
            />
        </table>
    );
}