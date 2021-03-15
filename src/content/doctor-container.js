import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';

import * as API_PATIENT from "./api/patient-api"
import * as API_CAREGIVER from "./api/caregiver-api"
import * as API_MEDICATION from "./api/medication-api"
import PatientTable from "./components/patient-table";
import CaregiverTable from "./components/caregiver-table";
import MedicationTable from "./components/medication-table";
import PatientForm from "./components/patient-form";
import PatientUpdateForm from "./components/patientUpdate-form";
import CaregiverForm from "./components/caregiver-form";
import CaregiverUpdateForm from "./components/caregiverUpdate-form";
import MedicationForm from "./components/medication-form";
import MedicationUpdateForm from "./components/medicationUpdate-form";
import CreateMedicationPlanForm from "./components/medicationplan-form";

import SockJsClient from 'react-stomp';
import {HOST} from '../commons/hosts';

class DoctorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleFormAddPatient = this.toggleFormAddPatient.bind(this);
        this.toggleFormUpdatePatient = this.toggleFormUpdatePatient.bind(this);

        this.toggleFormAddCaregiver = this.toggleFormAddCaregiver.bind(this);
        this.toggleFormUpdateCaregiver = this.toggleFormUpdateCaregiver.bind(this);

        this.toggleFormAddMedication = this.toggleFormAddMedication.bind(this);
        this.toggleFormUpdateMedication = this.toggleFormUpdateMedication.bind(this);

        this.deletePatient = this.deletePatient.bind(this);

        this.deleteCaregiver = this.deleteCaregiver.bind(this);

        this.deleteMedication = this.deleteMedication.bind(this);

        this.toggleFormCreateMedicationPlan = this.toggleFormCreateMedicationPlan.bind(this);

        this.reload = this.reload.bind(this);
        this.state = {
            selectedAddPatient: false,
            selectedUpdatePatient: false,

            selectedPatient: null,
            patientId: null,

            selectedCaregiver: null,
            caregiverId: null,

            selectedMedication: null,
            medicationId: null,

            selectedAddCaregiver: false,
            selectedUpdateCaregiver: false,

            selectedAddMedication: false,
            selectedUpdateMedication: false,

            selectedCreateMedicationPlan: false,

            collapseForm: false,
            tableDataPatient: [],
            tableDataCaregiver: [],
            tableDataMedication: [],

            isLoadedPatient: false,
            isLoadedCaregiver: false,
            isLoadedMedication: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchPatients();
        this.fetchCaregivers();
        this.fetchMedication();
    }

    fetchPatients() {
        return API_PATIENT.getPatients((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableDataPatient: result,
                    isLoadedPatient: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    fetchCaregivers() {
        return API_CAREGIVER.getCaregivers((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableDataCaregiver: result,
                    isLoadedCaregiver: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    fetchMedication() {
        return API_MEDICATION.getMedications((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableDataMedication: result,
                    isLoadedMedication: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleFormAddPatient() {
        this.setState({selectedAddPatient: !this.state.selectedAddPatient});
    }

    toggleFormUpdatePatient() {
        if(this.state.selectedPatient) {
            this.setState({selectedUpdatePatient: !this.state.selectedUpdatePatient});
        } else alert("Make a selection");
    }

    toggleFormAddCaregiver() {
        this.setState({selectedAddCaregiver: !this.state.selectedAddCaregiver});
    }

    toggleFormUpdateCaregiver() {
        if(this.state.selectedCaregiver) {
            this.setState({selectedUpdateCaregiver: !this.state.selectedUpdateCaregiver});
        } else alert("Make a selection");
    }

    toggleFormAddMedication() {
        this.setState({selectedAddMedication: !this.state.selectedAddMedication});
    }

    toggleFormUpdateMedication() {
        if(this.state.selectedMedication) {
            this.setState({selectedUpdateMedication: !this.state.selectedUpdateMedication});
        } else alert("Make a selection");
    }

    toggleFormCreateMedicationPlan() {
        if(this.state.patientId) {
            this.setState({selectedCreateMedicationPlan: !this.state.selectedCreateMedicationPlan});
        } else alert("Make a selection");
    }
    reload() {
        this.setState({
            isLoadedPatient: false,
            isLoadedCaregiver: false,
            isLoadedMedication: false
        });
        this.fetchPatients();
        this.fetchCaregivers();
        this.fetchMedication();
    }

    deletePatient() {
        if(this.state.patientId) {
            return API_PATIENT.deletePatient(this.state.patientId, (result, status, error) => {
                if (result !== null && (status === 200 || status === 201)) {
                    console.log("Successfully inserted patient with id: " + result);
                    this.reload();
                } else {
                    this.setState(({
                        errorStatus: status,
                        error: error
                    }));
                }
            });
        }
        else alert("Make a selection");
    }

    deleteCaregiver() {
        if(this.state.caregiverId) {
            return API_CAREGIVER.deleteCaregiver(this.state.caregiverId, (result, status, error) => {
                if (result !== null && (status === 200 || status === 201)) {
                    console.log("Successfully inserted patient with id: " + result);
                    this.reload();
                } else {
                    this.setState(({
                        errorStatus: status,
                        error: error
                    }));
                }
            });
        }
        else alert("Make a selection");
    }

    deleteMedication() {
        if(this.state.medicationId) {
            return API_MEDICATION.deleteMedication(this.state.medicationId, (result, status, error) => {
                if (result !== null && (status === 200 || status === 201)) {
                    console.log("Successfully inserted patient with id: " + result);
                    this.reload();
                } else {
                    this.setState(({
                        errorStatus: status,
                        error: error
                    }));
                }
            });
        }
        else alert("Make a selection");
    }

    TdPropsPatient = (state, rowInfo, column, instance) => {
        if(rowInfo) {
            return {
                onClick: (e, handleOriginal) => {
                    this.setState({selectedPatient: rowInfo.original.username, patientId: rowInfo.original.id})
                    if (handleOriginal) {
                        handleOriginal();
                    }
                },
                style: {
                    background: rowInfo.original.username === this.state.selectedPatient ? '#8ab1d9' : 'white',
                    color: rowInfo.original.username === this.state.selectedPatient ? 'white' : 'black'
                }
            };
        }
        else return {};
    };

    TdPropsCaregiver = (state, rowInfo, column, instance) => {
        if(rowInfo) {
            return {
                onClick: (e, handleOriginal) => {
                    this.setState({selectedCaregiver: rowInfo.original.username, caregiverId: rowInfo.original.id})
                    if (handleOriginal) {
                        handleOriginal();
                    }
                },
                style: {
                    background: rowInfo.original.username === this.state.selectedCaregiver ? '#8ab1d9' : 'white',
                    color: rowInfo.original.username === this.state.selectedCaregiver ? 'white' : 'black'
                }
            };
        }
        else return {};
    };

    TdPropsMedication = (state, rowInfo, column, instance) => {
        if(rowInfo) {
            return {
                onClick: (e, handleOriginal) => {
                    this.setState({selectedMedication: rowInfo.original.name, medicationId: rowInfo.original.id})
                    if (handleOriginal) {
                        handleOriginal();
                    }
                },
                style: {
                    background: rowInfo.original.name === this.state.selectedMedication ? '#8ab1d9' : 'white',
                    color: rowInfo.original.name === this.state.selectedMedication ? 'white' : 'black'
                }
            };
        }
        else return {};
    };

    render() {
        return (
            <div>
                <SockJsClient url={HOST.backend_api + "/socket"} topics={['/topic']}
                              onMessage={(msg) => {
                                  alert(msg);
                              }}
                              ref={ (client) => { this.clientRef = client }} />
                <CardHeader>
                    <strong> Patient Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                    <Col md={{offset: 0 }} style={{padding: '8px', marginLeft: 7}}>

                            <Button color="primary" onClick={this.toggleFormAddPatient}>Add patient </Button>

                    </Col>
                    <Col md={{offset: 0 }} style={{padding: '8px', marginLeft: 7}}>

                            <Button color="info" onClick={this.toggleFormUpdatePatient}>Update patient </Button>

                    </Col>
                        <Col md={{offset: 0 }} style={{padding: '8px', marginLeft: 7}}>

                            <Button color="danger" onClick={this.deletePatient}>Delete patient </Button>

                        </Col>
                        <Col md={{offset: 0 }} style={{padding: '8px', marginLeft: 7}}>

                            <Button color="secondary" onClick={this.toggleFormCreateMedicationPlan}>Create medication plan </Button>

                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={{size: '12', offset: 0}}>
                            {this.state.isLoadedPatient && <PatientTable tableData = {this.state.tableDataPatient} TdPropsFunction = {this.TdPropsPatient}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selectedAddPatient} toggle={this.toggleFormAddPatient}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormAddPatient}> Add patient: </ModalHeader>
                    <ModalBody>
                        <PatientForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdatePatient} toggle={this.toggleFormUpdatePatient}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdatePatient}> Update patient: </ModalHeader>
                    <ModalBody>
                        <PatientUpdateForm reloadHandler={this.reload} selectedPatient={this.state.selectedPatient}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedCreateMedicationPlan} toggle={this.toggleFormCreateMedicationPlan}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormCreateMedicationPlan}> Create medication plan: </ModalHeader>
                    <ModalBody>
                        <CreateMedicationPlanForm reloadHandler={this.reload} selectedPatient={this.state.selectedPatient}/>
                    </ModalBody>
                </Modal>


                <CardHeader>
                    <strong> Caregiver Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col md={{offset: 0 }} style={{padding: '8px', marginLeft: 7}}>

                            <Button color="primary" onClick={this.toggleFormAddCaregiver}>Add caregiver </Button>

                        </Col>
                        <Col md={{offset: 0 }} style={{padding: '8px', marginLeft: 7}}>

                            <Button color="info" onClick={this.toggleFormUpdateCaregiver}>Update caregiver </Button>

                        </Col>
                        <Col md={{offset: 0 }} style={{padding: '8px', marginLeft: 7}}>

                            <Button color="danger" onClick={this.deleteCaregiver}>Delete caregiver </Button>

                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={{size: '12', offset: 0}}>
                            {this.state.isLoadedCaregiver && <CaregiverTable tableData = {this.state.tableDataCaregiver} TdPropsFunction = {this.TdPropsCaregiver}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selectedAddCaregiver} toggle={this.toggleFormAddCaregiver}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormAddCaregiver}> Add caregiver: </ModalHeader>
                    <ModalBody>
                        <CaregiverForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdateCaregiver} toggle={this.toggleFormUpdateCaregiver}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdateCaregiver}> Update caregiver: </ModalHeader>
                    <ModalBody>
                        <CaregiverUpdateForm reloadHandler={this.reload} selectedCaregiver={this.state.selectedCaregiver}/>
                    </ModalBody>
                </Modal>


                <CardHeader>
                    <strong> Medication Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col md={{offset: 0 }} style={{padding: '8px', marginLeft: 7}}>

                            <Button color="primary" onClick={this.toggleFormAddMedication}>Add medication </Button>

                        </Col>
                        <Col md={{offset: 0 }} style={{padding: '8px', marginLeft: 7}}>

                            <Button color="info" onClick={this.toggleFormUpdateMedication}>Update medication </Button>

                        </Col>
                        <Col md={{offset: 0 }} style={{padding: '8px', marginLeft: 7}}>

                            <Button color="danger" onClick={this.deleteMedication}>Delete medication </Button>

                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={{size: '12', offset: 0}}>
                            {this.state.isLoadedMedication && <MedicationTable tableData = {this.state.tableDataMedication} TdPropsFunction = {this.TdPropsMedication}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selectedAddMedication} toggle={this.toggleFormAddMedication}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormAddMedication}> Add medication: </ModalHeader>
                    <ModalBody>
                        <MedicationForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdateMedication} toggle={this.toggleFormUpdateMedication}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdateMedication}> Update medication: </ModalHeader>
                    <ModalBody>
                        <MedicationUpdateForm reloadHandler={this.reload} selectedMedication={this.state.selectedMedication}/>
                    </ModalBody>
                </Modal>
            </div>
        )

    }
}


export default DoctorContainer;
