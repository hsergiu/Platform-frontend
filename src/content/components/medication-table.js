import React from "react";
import Table from "../../commons/tables/table";
import ReactTable from "react-table-6";


const columns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'SideEffects',
        accessor: 'sideEffects',
    },
    {
        Header: 'Dosage',
        accessor: 'dosage',
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class MedicationTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            TdPropsFunction: this.props.TdPropsFunction
        };
    }

    render() {
        return (
            <ReactTable
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
                getTdProps={this.state.TdPropsFunction}
            />
        )
    }
}

export default MedicationTable;