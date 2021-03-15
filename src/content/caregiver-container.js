import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Card,
    CardHeader,
    Col,
    Row
} from 'reactstrap';

import * as API_PATIENT from "./api/patient-api"
import PatientTable from "./components/patient-table";
import SockJsClient from 'react-stomp';
import {HOST} from '../commons/hosts';


class CaregiverContainer extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.state = {

            cuser: this.props.cuser,

            collapseForm: false,
            tableDataPatients: [],
            alert: null,
            isLoadedPatients: false,
            errorStatus: 0,
            error: null
        };

    }

    componentDidMount() {
        this.fetchPatients();
    }

    fetchPatients() {
        return API_PATIENT.getPatients((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableDataPatients: result,
                    isLoadedPatients: true
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
            isLoadedPatients: false
        });
        this.fetchPatients();
    }
    render() {
        return (
            <div>
                <SockJsClient url={HOST.backend_api + "/socket"} topics={['/queue/' + this.state.cuser]}
                              onMessage={(msg) => {
                                  alert(msg);
                              }}
                              ref={ (client) => { this.clientRef = client }} />
                <CardHeader>
                    <strong> Patients </strong>
                </CardHeader>
                <Card>
                    <Row>
                        <Col md={{size: '12', offset: 0}}>
                            {this.state.isLoadedPatients && <PatientTable tableData = {this.state.tableDataPatients}/>}
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


export default CaregiverContainer;
