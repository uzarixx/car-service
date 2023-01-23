"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var jet_logger_1 = __importDefault(require("jet-logger"));
var server_1 = __importDefault(require("@src/server"));
var auth_routes_1 = __importDefault(require("@src/routes/auth-routes"));
var user_repo_1 = __importDefault(require("@src/repos/user-repo"));
var pwd_util_1 = __importDefault(require("@src/util/pwd-util"));
var EnvVars_1 = __importDefault(require("@src/declarations/major/EnvVars"));
var HttpStatusCodes_1 = __importDefault(require("@src/declarations/major/HttpStatusCodes"));
var User_1 = __importStar(require("@src/models/User"));
var auth_service_1 = require("@src/services/auth-service");
// **** Variables **** //
// Misc
var paths = auth_routes_1.default.paths, authPath = ('/api' + paths.basePath), loginPath = "".concat(authPath).concat(paths.login), logoutPath = "".concat(authPath).concat(paths.logout);
// Test message
var msgs = {
    goodLogin: 'should return a response with a status of ' +
        "\"".concat(HttpStatusCodes_1.default.OK, "\" and a cookie with a jwt if the login was ") +
        'successful.',
    emailNotFound: 'should return a response with a status of ' +
        "\"".concat(HttpStatusCodes_1.default.UNAUTHORIZED, "\" and a json with an error message if ") +
        'the email was not found.',
    pwdFailed: 'should return a response with a status of ' +
        "\"".concat(HttpStatusCodes_1.default.UNAUTHORIZED, "\" and a json with the error ") +
        "\"".concat(auth_service_1.errors.unauth, "\" if the password failed."),
    fallbackErr: 'should return a response with a status of ' +
        "\"".concat(HttpStatusCodes_1.default.BAD_REQUEST, "\" and a json with an error for all ") +
        'other bad responses.',
    goodLogout: "should return a response with a status of ".concat(HttpStatusCodes_1.default.OK),
};
// Login credentials
var loginCreds = {
    email: 'jsmith@gmail.com',
    password: 'Password@1',
};
// **** Tests **** //
describe('auth-router', function () {
    var agent;
    // Run before all tests
    beforeAll(function (done) {
        agent = supertest_1.default.agent(server_1.default);
        done();
    });
    // Test login
    describe("\"POST:".concat(loginPath, "\""), function () {
        var callApi = function (reqBody) {
            return agent.post(loginPath).type('form').send(reqBody);
        };
        // Good login
        it(msgs.goodLogin, function (done) {
            var role = User_1.UserRoles.Standard;
            var pwdHash = pwd_util_1.default.hashSync(loginCreds.password);
            var loginUser = User_1.default.new('john smith', loginCreds.email, role, pwdHash);
            spyOn(user_repo_1.default, 'getOne').and.returnValue(Promise.resolve(loginUser));
            // Call API
            callApi(loginCreds)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.OK);
                var cookie = res.headers['set-cookie'][0];
                expect(cookie).toContain(EnvVars_1.default.cookieProps.key);
                done();
            });
        });
        // Email not found error
        it(msgs.emailNotFound, function (done) {
            spyOn(user_repo_1.default, 'getOne').and.returnValue(Promise.resolve(null));
            callApi(loginCreds)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.UNAUTHORIZED);
                var errMsg = auth_service_1.errors.emailNotFound(loginCreds.email);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
        // Password failed
        it(msgs.pwdFailed, function (done) {
            var role = User_1.UserRoles.Standard;
            var pwdHash = pwd_util_1.default.hashSync('bad password');
            var loginUser = User_1.default.new('john smith', loginCreds.email, role, pwdHash);
            spyOn(user_repo_1.default, 'getOne').and.returnValue(Promise.resolve(loginUser));
            // Call API
            callApi(loginCreds)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.UNAUTHORIZED);
                expect(res.body.error).toBe(auth_service_1.errors.unauth);
                done();
            });
        });
        // Fallback error
        it(msgs.fallbackErr, function (done) {
            spyOn(user_repo_1.default, 'getOne').and.throwError('Database query failed.');
            callApi(loginCreds)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.BAD_REQUEST);
                expect(res.body.error).toBeTruthy();
                done();
            });
        });
    });
    // Test logout
    describe("\"GET:".concat(logoutPath, "\""), function () {
        // Successful logout
        it(msgs.goodLogout, function (done) {
            agent.get(logoutPath)
                .end(function (err, res) {
                !!err && jet_logger_1.default.err(err);
                expect(res.status).toBe(HttpStatusCodes_1.default.OK);
                done();
            });
        });
    });
});
