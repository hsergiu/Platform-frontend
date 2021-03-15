import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
import authHeader from "../../authHeader";


const endpoint = {
    medication: '/medication',
    add: '/medication/add',
    update: '/medication/update/',
    delete: '/medication/delete/'
};

function getMedications(callback) {
    let request = new Request(HOST.backend_api + endpoint.medication, {
        method: 'GET',
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedication(user, callback){
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

function updateMedication(params, user, callback){
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

function deleteMedication(params, callback){
    let request = new Request(HOST.backend_api + endpoint.delete + params, {
        method: 'DELETE',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getMedications,
    postMedication,
    updateMedication,
    deleteMedication
};
