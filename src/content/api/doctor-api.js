import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
import authHeader from "../../authHeader";


const endpoint = {
    doctor: '/doctor',
    add: '/doctor/add',
    update: '/doctor/update/',
    delete: '/doctor/delete/'
};

function getDoctors(callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor, {
        method: 'GET',
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postDoctor(user, callback){
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

function updateDoctor(params, user, callback){
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

function deleteDoctor(params, callback){
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
    getDoctors,
    postDoctor,
    updateDoctor,
    deleteDoctor
};
