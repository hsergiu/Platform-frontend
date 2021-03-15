import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
import authHeader from "../../authHeader";

const endpoint = {
    caregiver: '/caregiver',
    add: '/caregiver/add',
    update: '/caregiver/update/',
    delete: '/caregiver/delete/'
};

function getCaregivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver, {
        method: 'GET'
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postCaregiver(user, callback){
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

function updateCaregiver(params, user, callback){
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

function deleteCaregiver(params, callback){
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
    getCaregivers,
    postCaregiver,
    updateCaregiver,
    deleteCaregiver
};
