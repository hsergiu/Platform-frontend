import React from 'react';
import validate from "./validators/doctor-validators";
import Button from "react-bootstrap/Button";
import * as API_PATIENT from "../api/patient-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import * as API_CAREGIVER from "../api/caregiver-api";



class PatientUpdateForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            selectedPatient: this.props.selectedPatient,

            patientData: [],
            caregiverData: [],

            formControls: {
                username: {
                    value: '',
                    placeholder: 'Username..',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 5,
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Password..',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 5,
                        isRequired: true
                    }
                },
                birthdate: {
                    value: '',
                    placeholder: 'Birthdate..',
                    valid: false,
                    touched: false,
                },
                gender: {
                    value: '',
                    placeholder: 'Gender..',
                    valid: false,
                    touched: false,
                },
                address: {
                    value: '',
                    placeholder: 'Address..',
                    valid: false,
                    touched: false,
                },
                medicalRecord: {
                    value: '',
                    placeholder: 'Medical record..',
                    valid: false,
                    touched: false,
                },
                caregiver: {
                    value: '',
                    placeholder: 'Caregiver..',
                    valid: false,
                    touched: false,
                },
            }
        };

        this.fetchCaregivers();
        this.fetchPatients();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    fetchPatients() {
        return API_PATIENT.getPatients((result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({patientData:result});
            }
        });
    }

    fetchCaregivers() {
        return API_CAREGIVER.getCaregivers((result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({caregiverData:result});
            }
        });
    }

    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    updatePatient(id, patient) {
        return API_PATIENT.updatePatient(id, patient, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated patient with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let patient = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            birthdate: this.state.formControls.birthdate.value,
            gender: this.state.formControls.gender.value,
            address: this.state.formControls.address.value,
            medicalRecord: this.state.formControls.medicalRecord.value,
            caregiver: this.state.formControls.caregiver.value
        };
        let selectedId = null;
        this.state.caregiverData.map(caregiver => {if(caregiver.username === patient.caregiver) patient.caregiver = caregiver;});
        this.state.patientData.map(patient => {if(patient.username === this.state.selectedPatient) selectedId = patient.id;})

        this.updatePatient(selectedId, patient);
    }

    render() {
        return (
            <div>

                <FormGroup id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                    <div className={"error-message row"}> * Username must have at least 5 characters </div>}
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                    <div className={"error-message row"}> * Password must have at least 5 characters </div>}
                </FormGroup>

                <FormGroup id='birthdate'>
                    <Label for='birthdateField'> Birthdate: </Label>

                    <Input name='birthdate' type = 'date' id='birthdateField' placeholder={this.state.formControls.birthdate.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.birthdate.value}
                           touched={this.state.formControls.birthdate.touched? 1 : 0}
                           valid={this.state.formControls.birthdate.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='gender'>
                    <Label for='genderField'> Gender: </Label>
                    <Input name='gender' type = 'select' id='genderField' placeholder={this.state.formControls.gender.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.gender.value}
                           touched={this.state.formControls.gender.touched? 1 : 0}
                           valid={this.state.formControls.gender.valid}
                           required>
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                    </Input>
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='medicalRecord'>
                    <Label for='medicalRecordField'> Medical record: </Label>
                    <Input name='medicalRecord' id='medicalRecordField' placeholder={this.state.formControls.medicalRecord.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.medicalRecord.value}
                           touched={this.state.formControls.medicalRecord.touched? 1 : 0}
                           valid={this.state.formControls.medicalRecord.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='caregiver'>
                    <Label for='caregiverField'> Caregiver: </Label>
                    <Input name='caregiver' type = 'select' id='caregiverField' placeholder={this.state.formControls.caregiver.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.caregiver.value}
                           touched={this.state.formControls.caregiver.touched? 1 : 0}
                           valid={this.state.formControls.caregiver.valid}
                           required>
                        <option></option>
                        {this.state.caregiverData.map(caregiver => <option key = {caregiver.id}>{caregiver.username}</option>)}
                    </Input>
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default PatientUpdateForm;
