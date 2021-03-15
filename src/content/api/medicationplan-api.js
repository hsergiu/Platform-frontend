import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
import authHeader from "../../authHeader";


const endpoint = {
    medicationplan: '/medicationplan',
    add: '/medicationplan/add',
    update: '/medicationplan/update/',
    delete: '/medicationplan/delete/'
};

function getMedicationPlans(callback) {
    let request = new Request(HOST.backend_api + endpoint.medicationplan, {
        method: 'GET',
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedicationPlan(plan, callback){
    let request = new Request(HOST.backend_api + endpoint.add, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan)
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log(plan);

    RestApiClient.performRequest(request, callback);
}

function updateMedicationPlan(params, plan, callback){
    let request = new Request(HOST.backend_api + endpoint.update + params, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan)
    });
    request.headers.append('Authorization', authHeader().Authorization.valueOf());
    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteMedicationPlan(params, callback){
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
    getMedicationPlans,
    postMedicationPlan,
    updateMedicationPlan,
    deleteMedicationPlan
};
