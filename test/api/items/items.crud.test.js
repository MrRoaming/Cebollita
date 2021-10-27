import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payloads from "../../../src/resources/payloads.items.json";
import logger from "../../../utils/loggers";

const itemsURI = endpoints.items;
let itemByIdURI = endpoints.itemById;
let rootItemByIdURI = endpoints.rootItemById;
let id = '';
let postId = '';

describe ("Items CRUD Tests", ()=> {

    beforeAll(()=> {
        return HttpRequestManager.makeRequest('POST', itemsURI, payloads.ItemById.POST)
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch('OK');
            expect(response.data).not.toEqual(errors.Authentication);
            id = response.data.Id;
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 20000)

    afterAll(()=> {
        return HttpRequestManager.makeRequest('DELETE', itemByIdURI.replace('{id}', postId))
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch('OK');
            expect(response.data).not.toEqual(errors.Authentication);
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 20000)

    test('Verify that a 200 OK status code results when a GET request to “/items.json” endpoint is executed.', () => {
        return HttpRequestManager.makeRequest('GET', itemsURI)
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch('OK');
            expect(response.data).not.toEqual(errors.Authentication);
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 20000)
    
    test('Verify that a 200 OK status code results when a POST request to “/items.json” endpoint is executed.', () => {
        return HttpRequestManager.makeRequest('POST', itemsURI, payloads.ItemById.POST)
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch('OK');
            expect(response.data).not.toEqual(errors.Authentication);
            postId = response.data.Id;
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 20000)
    
    test('Verify that a 200 OK status code results when a PUT request to “/items/{id}.json” endpoint is executed.', () => {
        return HttpRequestManager.makeRequest('PUT', itemByIdURI.replace('{id}', id), payloads.ItemById.PUT)
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch('OK');
            expect(response.data).not.toEqual(errors.Authentication);
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 20000)
    
    test('Verify that a 200 OK status code results when a DELETE request to “/items/{id}.json” endpoint is executed.', () => {
        return HttpRequestManager.makeRequest('DELETE', itemByIdURI.replace('{id}', id))
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch('OK');
            expect(response.data).not.toEqual(errors.Authentication);
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 20000)

    test('Verify that a 200 OK status code results when a GET request to “/items/{id}/RootItem.json” endpoint is executed.', () => {
        return HttpRequestManager.makeRequest('GET', rootItemByIdURI.replace('{id}', id))
        .then(function(response){
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch('OK');
            expect(response.data).not.toEqual(errors.Authentication);
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        })
    }, 20000)
})
