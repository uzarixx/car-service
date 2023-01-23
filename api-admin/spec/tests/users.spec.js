"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var jet_validator_1 = require("jet-validator");
var jet_logger_1 = __importDefault(require("jet-logger"));
var server_1 = __importDefault(require("@src/server"));
var user_repo_1 = __importDefault(require("@src/repos/user-repo"));
var User_1 = __importDefault(require("@src/models/User"));
var user_routes_1 = __importDefault(require("@src/routes/user-routes"));
var HttpStatusCodes_1 = __importDefault(require("@src/declarations/major/HttpStatusCodes"));
var login_agent_1 = __importDefault(require("../support/login-agent"));
var user_service_1 = require("@src/services/user-service");
// **** Variables **** //
// Misc
var paths = user_routes_1.default.paths, usersPath = ('/api' + paths.basePath), getUsersPath = "".concat(usersPath).concat(paths.get), addUsersPath = "".concat(usersPath).concat(paths.add), updateUserPath = "".concat(usersPath).concat(paths.update), deleteUserPath = "".concat(usersPath).concat(paths.delete);
// Dummy users for GET req
var dummyGetAllUsers = [
    User_1.default.new('Sean Maxwell', 'sean.maxwell@gmail.com'),
    User_1.default.new('John Smith', 'john.smith@gmail.com'),
    User_1.default.new('Gordan Freeman', 'gordan.freeman@gmail.com'),
];
// Dummy update user
var dummyUserData = {
    user: User_1.default.new('Gordan Freeman', 'gordan.freeman@gmail.com'),
};
// Test messages
var msgs = {
    getUsersSuccess: 'should return a JSON object with all the users and a ' +
        "status code of \"".concat(HttpStatusCodes_1.default.OK, "\" if the request was successful."),
    getUsersBad: 'should return a JSON object containing an error message ' +
        "and a status code of \"".concat(HttpStatusCodes_1.default.BAD_REQUEST, "\" if the request ") +
        'was unsuccessful.',
    addUserSuccess: 'should return a status code of ' +
        "\"".concat(HttpStatusCodes_1.default.CREATED, "\" if the request was successful."),
    addUserFailedMissingParam: 'should return a JSON object with an error ' +
        "message of \"".concat(jet_validator_1.defaultErrMsg, "\" and a status code of ") +
        "\"".concat(HttpStatusCodes_1.default.BAD_REQUEST, "\" if the user param was missing."),
    addUserFallbackErr: 'should return a JSON object with an error message ' +
        "and a status code of \"".concat(HttpStatusCodes_1.default.BAD_REQUEST, "\" if the request ") +
        'was unsuccessful.',
    updateSuccess: "should return a status code of \"".concat(HttpStatusCodes_1.default.OK, "\" if ") +
        'the request was successful.',
    updateParamMissing: 'should return a JSON object with an error message ' +
        "of \"".concat(jet_validator_1.defaultErrMsg, "\" and a status code of ") +
        "\"".concat(HttpStatusCodes_1.default.BAD_REQUEST, "\" if the user param was missing."),
    updateUserNotFound: 'should return a JSON object with the error message ' +
        "of \"".concat(user_service_1.userNotFoundErr, "\" and a status code of ") +
        "\"".concat(HttpStatusCodes_1.default.NOT_FOUND, "\" if the id was not found."),
    updateFallbackErr: 'should return a JSON object with an error message ' +
        "and a status code of \"".concat(HttpStatusCodes_1.default.BAD_REQUEST, "\" if the request ") +
        'was unsuccessful.',
    deleteSuccessful: "should return a status code of \"".concat(HttpStatusCodes_1.default.OK, "\" ") +
        'if the request was successful.',
    deleteUserNotFound: 'should return a JSON object with the error message ' +
        "of \"".concat(user_service_1.userNotFoundErr, "\" and a status code of ") +
        "\"".concat(HttpStatusCodes_1.default.NOT_FOUND, "\" if the id was not found."),
    deleteFallbackErr: 'should return a JSON object with an error message ' +
        "and a status code of \"".concat(HttpStatusCodes_1.default.BAD_REQUEST, "\" if the request ") +
        'was unsuccessful.',
};
// **** Tests **** //
describe('user-router', function () {
    var agent;
    var jwtCookie;
    // Run before all tests
    beforeAll(function (done) {
        agent = supertest_1.default.agent(server_1.default);
        login_agent_1.default.login(agent, function (cookie) {
            jwtCookie = cookie;
            done();
        });
    });
    // Test get users
    describe("\"GET:".concat(getUsersPath, "\""), function () {
        var callApi = function () {
            return agent.get(getUsersPath)
                .set('Cookie', jwtCookie);
        };
        // Get all users
        it(msgs.getUsersSuccess, function (done) {
            var ret = Promise.resolve(__spreadArray([], dummyGetAllUsers, true));
            spyOn(user_repo_1.default, 'getAll').and.returnValue(ret);
            // Call API
            callApi().end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.OK);
                // Caste instance-objects to 'User' objects
                var respUsers = res.body.users;
                var retUsers = respUsers.map(function (user) { return User_1.default.copy(user); });
                expect(retUsers).toEqual(dummyGetAllUsers);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        // Get all users bad
        it(msgs.getUsersBad, function (done) {
            var errMsg = 'Could not fetch users.';
            spyOn(user_repo_1.default, 'getAll').and.throwError(errMsg);
            // Call API
            callApi()
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });
    // Test add user
    describe("\"POST:".concat(addUsersPath, "\""), function () {
        // Consts
        var callApi = function (reqBody) {
            return agent.post(addUsersPath)
                .set('Cookie', jwtCookie)
                .type('form').send(reqBody);
        };
        // Test add user success
        it(msgs.addUserSuccess, function (done) {
            spyOn(user_repo_1.default, 'add').and.returnValue(Promise.resolve());
            callApi(dummyUserData)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.CREATED);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        // Test add user failed due to missing param
        it(msgs.addUserFailedMissingParam, function (done) {
            callApi({})
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.BAD_REQUEST);
                expect(res.body.error).toBe(jet_validator_1.defaultErrMsg);
                done();
            });
        });
        // Default error
        it(msgs.addUserFallbackErr, function (done) {
            var errMsg = 'Could not add user.';
            spyOn(user_repo_1.default, 'add').and.throwError(errMsg);
            // Call API
            callApi(dummyUserData)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });
    // Test update users
    describe("\"PUT:".concat(updateUserPath, "\""), function () {
        var callApi = function (reqBody) {
            return agent.put(updateUserPath)
                .set('Cookie', jwtCookie)
                .type('form').send(reqBody);
        };
        // Test updating a user success
        it(msgs.updateSuccess, function (done) {
            spyOn(user_repo_1.default, 'update').and.returnValue(Promise.resolve());
            spyOn(user_repo_1.default, 'persists').and.returnValue(Promise.resolve(true));
            // Call api
            callApi(dummyUserData)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        // Test updating a user failed because a param was missing
        it(msgs.updateParamMissing, function (done) {
            callApi({})
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.BAD_REQUEST);
                expect(res.body.error).toBe(jet_validator_1.defaultErrMsg);
                done();
            });
        });
        // Update user not found
        it(msgs.updateUserNotFound, function (done) {
            callApi(dummyUserData)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.NOT_FOUND);
                expect(res.body.error).toBe(user_service_1.userNotFoundErr);
                done();
            });
        });
        // Update fallback error
        it(msgs.updateFallbackErr, function (done) {
            var updateErrMsg = 'Could not update user.';
            spyOn(user_repo_1.default, 'persists').and.returnValue(Promise.resolve(true));
            spyOn(user_repo_1.default, 'update').and.throwError(updateErrMsg);
            // Call API
            callApi(dummyUserData)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.BAD_REQUEST);
                expect(res.body.error).toBe(updateErrMsg);
                done();
            });
        });
    });
    // Test delete user
    describe("\"DELETE:".concat(deleteUserPath, "\""), function () {
        var callApi = function (id) {
            var path = deleteUserPath.replace(':id', id.toString());
            return agent.delete(path)
                .set('Cookie', jwtCookie);
        };
        // Delete user successful
        it(msgs.deleteSuccessful, function (done) {
            spyOn(user_repo_1.default, 'delete').and.returnValue(Promise.resolve());
            spyOn(user_repo_1.default, 'persists').and.returnValue(Promise.resolve(true));
            // Call api
            callApi(5)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        // Delete, user not found error
        it(msgs.deleteUserNotFound, function (done) {
            callApi(-1)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.NOT_FOUND);
                expect(res.body.error).toBe(user_service_1.userNotFoundErr);
                done();
            });
        });
        // Delete, not a valid number error
        it(msgs.deleteUserNotFound, function (done) {
            callApi('horse')
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.BAD_REQUEST);
                expect(res.body.error).toBe(jet_validator_1.defaultErrMsg);
                done();
            });
        });
        // Delete user fallback error
        it(msgs.deleteFallbackErr, function (done) {
            spyOn(user_repo_1.default, 'persists').and.returnValue(Promise.resolve(true));
            var deleteErrMsg = 'Could not delete user.';
            spyOn(user_repo_1.default, 'delete').and.throwError(deleteErrMsg);
            // Call API
            callApi(1)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.BAD_REQUEST);
                expect(res.body.error).toBe(deleteErrMsg);
                done();
            });
        });
    });
});
