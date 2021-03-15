import React from "react";
import moment from "moment";
import ReactTable from "react-table-6";


const columns = [
    {
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'Password',
        accessor: 'password',
    },
    {
        id: 'birthdate',
        Header: 'BirthDate',
        accessor: (obj) => (moment(obj.birthdate).format("DD/MM/YYYY")),
    },
    {
        Header: 'Gender',
        accessor: 'gender',
    },
    {
        Header: 'Address',
        accessor: 'address',
    }
];

const filters = [
    {
        accessor: 'username',
    }
];

class CaregiverTable extends React.Component {

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

export default CaregiverTable;