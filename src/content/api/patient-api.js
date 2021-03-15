import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
import authHeader from "../../authHeader";


const endpoint = {
    patient: '/patient',
    add: '/patient/add',
    update: '/patient/update/',
    delete: '/patient/delete/'
};

function getPatientById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + params.id, {
        method: 'GET'
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatients(callback) {
    let request = new Request(HOST.backend_api + endpoint.patient, {
        method: 'GET'
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postPatient(user, callback){
    let request = new Request(HOST.backend_api + endpoint.add, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function updatePatient(params, user, callback){
    let request = new Request(HOST.backend_api + endpoint.update + params, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deletePatient(params, callback){
    let request = new Request(HOST.backend_api + endpoint.delete + params, {
        method: 'DELETE',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getPatients,
    postPatient,
    updatePatient,
    deletePatient
};
