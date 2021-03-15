import React from 'react';
import validate from "./validators/doctor-validators";
import Button from "react-bootstrap/Button";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import * as API_PATIENT from "../api/patient-api";
import * as API_MEDICATION from "../api/medication-api";
import * as API_MEDICATIONPLAN from "../api/medicationplan-api";



class CreateMedicationPlanForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            selectedPatient: this.props.selectedPatient,

            medicationData: [],
            patientData: [],

            formControls: {
                intakeinterval: {
                    value: '',
                    placeholder: 'Intake interval..',
                    valid: false,
                    touched: false,
                },
                period: {
                    value: '',
                    placeholder: 'Period..',
                    valid: false,
                    touched: false,
                },
                medication: {
                    value: [],
                    placeholder: 'Medication..',
                    valid: false,
                    touched: false,
                },
            }
        };
        this.fetchMedication();
        this.fetchPatients();
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    fetchMedication() {
        return API_MEDICATION.getMedications((result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({medicationData:result});
            }
        });
    }

    fetchPatients() {
        return API_PATIENT.getPatients((result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({patientData:result});
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

    handleSelect = event => {
        let opts = [], option;
        let controls = this.state.formControls;
        const name = event.target.name;
        const elem = controls[name];

        elem.touched = true;

        for (let i = 0, len = event.target.options.length; i < len; i++) {
            option = event.target.options[i];

            if (option.selected) {
                opts.push(option.value);
            }
        }

        if(opts.length > 0) {
            elem.valid = true;
        } else elem.valid = false;

        elem.value = opts;
        controls[name] = elem;

        let formIsValid = true;
        for (let updatedFormElementName in controls) {
            formIsValid = controls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({formControls: controls, formIsValid: formIsValid});
    }

    createMedicationPlan(medicationplan) {
        return API_MEDICATIONPLAN.postMedicationPlan(medicationplan, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully created medication plan with id: " + result);
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
        let medicationplan = {
            intakeinterval: this.state.formControls.intakeinterval.value,
            period: this.state.formControls.period.value,
            patient: this.state.selectedPatient,
            medications: this.state.formControls.medication.value,
        };
        this.state.patientData.map(data => {
            if(data.username === medicationplan.patient) {
            medicationplan.patient = data;
        }})
        this.state.medicationData.map(data => {
            let i = medicationplan.medications.findIndex((elem) => elem === data.name);
            medicationplan.medications[i] = data;
        })
        this.createMedicationPlan(medicationplan);
    }

    render() {
        return (
            <div>

                <FormGroup id='intakeinterval'>
                    <Label for='intakeintervalField'> Intake interval: </Label>
                    <Input name='intakeinterval' id='intakeintervalField' placeholder={this.state.formControls.intakeinterval.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.intakeinterval.value}
                           touched={this.state.formControls.intakeinterval.touched? 1 : 0}
                           valid={this.state.formControls.intakeinterval.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='period'>
                    <Label for='periodField'> Period: </Label>
                    <Input name='period' id='periodField' placeholder={this.state.formControls.period.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.period.value}
                           touched={this.state.formControls.period.touched? 1 : 0}
                           valid={this.state.formControls.period.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='medication'>
                    <Label for='medicationField'> Medication: </Label>
                    <Input name='medication' type = 'select' id='medicationField' placeholder={this.state.formControls.medication.placeholder}
                           onChange={this.handleSelect}
                           defaultValue={this.state.formControls.medication.value}
                           touched={this.state.formControls.medication.touched? 1 : 0}
                           valid={this.state.formControls.medication.valid}
                           required
                           multiple>
                        <option></option>
                        {this.state.medicationData.map(medication => <option key = {medication.id}>{medication.name}</option>)}
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

export default CreateMedicationPlanForm;
