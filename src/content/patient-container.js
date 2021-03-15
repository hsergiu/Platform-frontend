import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Card,
    CardHeader,
    Col,
    Row
} from 'reactstrap';

import * as API_MEDICATIONPLAN from "./api/medicationplan-api"
import MedicationPlanTable from "./components/medicationplan-table";




class PatientContainer extends React.Component {

    constructor(props) {
        super(props);

        this.reload = this.reload.bind(this);
        this.state = {

            collapseForm: false,
            tableDataMedicationPlans: [],

            isLoadedMedicationPlans: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchMedicationPlans();
    }

    fetchMedicationPlans() {
        return API_MEDICATIONPLAN.getMedicationPlans((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableDataMedicationPlans: result,
                    isLoadedMedicationPlans: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    reload() {
        this.setState({
            isLoadedMedicationPlans: false
        });
        this.fetchMedicationPlans();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Medication plans </strong>
                </CardHeader>
                <Card>
                    <Row>
                        <Col md={{size: '12', offset: 0}}>
                            {this.state.isLoadedMedicationPlans && <MedicationPlanTable tableData = {this.state.tableDataMedicationPlans}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

            </div>
        )

    }
}


export default PatientContainer;
