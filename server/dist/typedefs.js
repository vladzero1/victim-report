"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typedefs = apollo_server_express_1.gql `
  type User{
    id: ID
    username: String
    
  }
`;
//# sourceMappingURL=typedefs.js.map