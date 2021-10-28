import HttpRequestManager from "../../../src/common/api/http.request.manager";
import errors from "../../../src/resources/errors.json";
import endPoints from "../../../src/resources/endpoints.json";
import payloads from "../../../src/resources/payloads.json";
import loggers from "../../../utils/loggers";
const projectsURI = endPoints.projects;
let projectByIdURI = endPoints.projectById;

describe("negative test", () => {
    test('Verify that shows the required error with a wrong ID when  GET of a proyect by ID the request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "GET",
            projectByIdURI.replace("{id}", "2")
        )
            .then(function (response) {
                expect(response.data).toEqual(errors.ThereIsNoProyect);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that shows the required error with a wrong auth when  GET of a proyect by ID the request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "GET",
            projectByIdURI.replace("{id}", "3951526"),
            null,
            false
        )
            .then(function (response) {
                expect(response.data).toEqual(errors.Authentication);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that shows the required error with an empty name when  POST the request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "POST",
            projectsURI,
            payloads.ProjectById.MissingContent
        )
            .then(function (response) {
                expect(response.data).toEqual(errors.ShortNameProject);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that shows the required error with an unvalid authentication when  POST the request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "POST",
            projectsURI,
            payloads.ProjectById.POST,
            false
        )
            .then(function (response) {
                expect(response.data).toEqual(errors.Authentication);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that shows the required error with an empty value in a PUT request when "/projects/{id}.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "PUT",
            projectByIdURI.replace("{id}", ""),
            payloads.ProjectById.PUT
        )
            .then(function (response) {
                console.log(response.data);
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that shows the required error with an alphabetic character value in a PUT request when "/projects/{id}.json" endpoint is executed', () => {
        return HttpRequestManager.makeRequest(
            "PUT",
            projectByIdURI.replace("{id}", "a"),
            payloads.ProjectById.PUT
        )
            .then(function (response) {
                console.log(response.data);
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that shows the required error with an alphanumeric character value in a PUT request when "/projects/{id}.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "PUT",
            projectByIdURI.replace("{id}", "12*S"),
            payloads.ProjectById.PUT
        )
            .then(function (response) {
                console.log(response.data);
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that end point shouldnt accept a number bigger than 14 the required error with an alphanumeric character value in a PUT request when "/projects/{id}.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "PUT",
            projectByIdURI.replace("{id}", "16"),
            payloads.ProjectById.PUT
        )
            .then(function (response) {
                console.log(response.data);
                expect(response.status).not.toBe(200);
                expect(response.statusText).not.toMatch("OK");
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that end point shouldnt accept negative numbers in a PUT request when "/projects/{id}.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "PUT",
            projectByIdURI.replace("{id}", "-5"),
            payloads.ProjectById.PUT.EmptyContent
        )
            .then(function (response) {
                console.log(response.data);
                expect(response.status).not.toBe(200);
                expect(response.statusText).not.toMatch("OK");
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that shows the required error with a non valid ID when DELETE request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "DELETE",
            projectByIdURI.replace("{id}", "2")
        )
            .then(function (response) {
                expect(response.data).toEqual(errors.InvalidID);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that shows the required error with a alfabetic value ID when DELETE request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "DELETE",
            projectByIdURI.replace("{id}", "a")
        )
            .then(function (response) {
                expect(response.data).toEqual(errors.InvalidID);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);

    test('Verify that shows the required error with an invalid authentication when DELETE request "/projects.json" endpoint is executed ', () => {
        return HttpRequestManager.makeRequest(
            "DELETE",
            projectByIdURI.replace("{id}", "3951526"),
            null,
            false
        )
            .then(function (response) {
                expect(response.data).toEqual(errors.Authentication);
            })
            .catch(function (error) {
                loggers.error(error);
                throw error;
            });
    }, 20000);
});