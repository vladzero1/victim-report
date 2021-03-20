import { gql } from "apollo-server-express";

export const typedefs= gql `
  type User{
    id: ID
    username: String
    
  }
`