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
var User_1 = __importStar(require("@src/models/User"));
var user_repo_1 = __importDefault(require("@src/repos/user-repo"));
var pwd_util_1 = __importDefault(require("@src/util/pwd-util"));
// **** Variables **** //
var creds = {
    email: 'jsmith@gmail.com',
    password: 'Password@1',
};
// **** Functions **** //
/**
 * Login a user.
 */
function login(beforeAgent, done) {
    // Setup dummy data
    var role = User_1.UserRoles.Admin;
    var pwdHash = pwd_util_1.default.hashSync(creds.password);
    var loginUser = User_1.default.new('john smith', creds.email, role, pwdHash);
    spyOn(user_repo_1.default, 'getOne').and.returnValue(Promise.resolve(loginUser));
    // Call Login API
    beforeAgent
        .post('/api/auth/login')
        .type('form')
        .send(creds)
        .end(function (err, res) {
        if (err) {
            throw err;
        }
        var cookie = res.headers['set-cookie'][0];
        return done(cookie);
    });
}
// **** Export default **** //
exports.default = {
    login: login,
};
