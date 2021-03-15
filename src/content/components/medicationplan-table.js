import React from "react";
import Table from "../../commons/tables/table";

const columns = [
    {
        Header: 'Intake Interval',
        accessor: 'intakeinterval',
    },
    {
        Header: 'Period',
        accessor: 'period',
    },
    {
        id: 'medications',
        Header: 'Medications',
        accessor: (cell) => (
                cell.medications.map(med=>med.name + " ")
        )
    },
];

const filters = [
];

class MedicationPlanTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default MedicationPlanTable;