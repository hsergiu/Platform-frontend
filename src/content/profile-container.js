import React from 'react';
import {
    Card,
    CardHeader,
    Row
} from 'reactstrap';

import * as API_PATIENT from "./api/patient-api";
import {Text} from "recharts";
import moment from "moment";




class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);

        this.reload = this.reload.bind(this);
        this.state = {

            collapseForm: false,

            username: null,
            birthdate: null,
            gender: null,
            address: null,
            medicalrecord: null,
            caregiver: null,

            cuser: this.props.cuser,

            isLoadedPatients: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        return API_PATIENT.getPatients((result, status, err) => {

            if (result !== null && status === 200) {
                let x = null;
                result.map((elem) => {if(elem.username === this.state.cuser) x = elem;})
                this.setState({
                    username: x.username,
                    birthdate: x.birthdate,
                    gender: x.gender,
                    address: x.address,
                    medicalrecord: x.medicalRecord,
                    caregiver: x.caregiver.username,
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
        this.fetch();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Profile: </strong>
                </CardHeader>
                <Card>
                    <Row>
                        <Text style={{ fontSize: 18 }}>
                            {"Username:  " + this.state.username}
                        </Text>
                    </Row>
                    <Row>
                        <Text style={{ fontSize: 18 }}>
                            {"Birthdate:  " + moment(this.state.birthdate).format("DD/MM/YYYY")}
                        </Text>
                    </Row>
                    <Row>
                        <Text style={{ fontSize: 18 }}>
                            {"Gender:  " + this.state.gender}
                        </Text>
                    </Row>
                    <Row>
                        <Text style={{ fontSize: 18 }}>
                            {"Address:  " + this.state.address}
                        </Text>
                    </Row>
                    <Row>
                        <Text style={{ fontSize: 18 }}>
                            {"Medical record:  " + this.state.medicalrecord}
                        </Text>
                    </Row>
                    <Row>
                        <Text style={{ fontSize: 18 }}>
                            {"Caregiver:  " + this.state.caregiver}
                        </Text>
                    </Row>

                </Card>

            </div>
        )

    }
}


export default ProfileContainer;
