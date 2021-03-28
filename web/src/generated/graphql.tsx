import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  user: UserResponse;
  getAllRegion: Region;
  me?: Maybe<MeResponse>;
  victims: VictimList;
  victimsByRegion: VictimList;
};


export type QueryUserArgs = {
  phoneNumber: Scalars['String'];
};


export type QueryVictimsByRegionArgs = {
  region: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  phoneNumber: Scalars['String'];
  region: Scalars['String'];
};

export type Region = {
  __typename?: 'Region';
  region?: Maybe<Array<Scalars['String']>>;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  admin?: Maybe<Admin>;
};

export type Admin = {
  __typename?: 'Admin';
  username: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type VictimList = {
  __typename?: 'VictimList';
  victims: Array<VictimData>;
};

export type VictimData = {
  __typename?: 'VictimData';
  id: Scalars['String'];
  name: Scalars['String'];
  age: Scalars['Int'];
  address: Scalars['String'];
  photo: Scalars['String'];
  gender: Scalars['String'];
  location: Scalars['String'];
  creatorPhoneNumber: Scalars['String'];
  region: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: UserResponse;
  loginUser: UserResponse;
  logout: Scalars['Boolean'];
  registerAdmin: AdminResponse;
  loginAdmin: AdminResponse;
  createVictim: VictimData;
  updateVictim: Scalars['Boolean'];
  deleteVictim: Scalars['Boolean'];
};


export type MutationRegisterUserArgs = {
  region: Scalars['String'];
  username: Scalars['String'];
  options: PhoneNumberPasswordInput;
};


export type MutationLoginUserArgs = {
  options: PhoneNumberPasswordInput;
};


export type MutationRegisterAdminArgs = {
  username: Scalars['String'];
  options: PhoneNumberPasswordInput;
};


export type MutationLoginAdminArgs = {
  options: PhoneNumberPasswordInput;
};


export type MutationCreateVictimArgs = {
  options: CreateVictimInput;
};


export type MutationUpdateVictimArgs = {
  victimId: Scalars['String'];
  options: CreateVictimInput;
};


export type MutationDeleteVictimArgs = {
  victimId: Scalars['String'];
};

export type PhoneNumberPasswordInput = {
  phoneNumber: Scalars['String'];
  password: Scalars['String'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  errors?: Maybe<Array<FieldError>>;
  admin?: Maybe<Admin>;
};

export type CreateVictimInput = {
  name: Scalars['String'];
  age: Scalars['Int'];
  address: Scalars['String'];
  photo: Scalars['String'];
  gender: Scalars['String'];
  location: Scalars['String'];
  region: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type VictimDataFragment = (
  { __typename?: 'VictimData' }
  & Pick<VictimData, 'id' | 'name' | 'age' | 'address' | 'photo' | 'gender' | 'location' | 'region' | 'creatorPhoneNumber'>
);

export type CreateVictimMutationVariables = Exact<{
  options: CreateVictimInput;
}>;


export type CreateVictimMutation = (
  { __typename?: 'Mutation' }
  & { createVictim: (
    { __typename?: 'VictimData' }
    & VictimDataFragment
  ) }
);

export type DeleteVictimMutationVariables = Exact<{
  victimId: Scalars['String'];
}>;


export type DeleteVictimMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteVictim'>
);

export type LoginUserMutationVariables = Exact<{
  options: PhoneNumberPasswordInput;
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'phoneNumber' | 'region'>
    )> }
  ) }
);

export type LoginAdminMutationVariables = Exact<{
  options: PhoneNumberPasswordInput;
}>;


export type LoginAdminMutation = (
  { __typename?: 'Mutation' }
  & { loginAdmin: (
    { __typename?: 'AdminResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'username' | 'phoneNumber'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String'];
  region: Scalars['String'];
  options: PhoneNumberPasswordInput;
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'phoneNumber' | 'region'>
    )> }
  ) }
);

export type RegisterAdminMutationVariables = Exact<{
  username: Scalars['String'];
  options: PhoneNumberPasswordInput;
}>;


export type RegisterAdminMutation = (
  { __typename?: 'Mutation' }
  & { registerAdmin: (
    { __typename?: 'AdminResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'username' | 'phoneNumber'>
    )> }
  ) }
);

export type UpdateVictimMutationVariables = Exact<{
  victimId: Scalars['String'];
  options: CreateVictimInput;
}>;


export type UpdateVictimMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateVictim'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'MeResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'phoneNumber' | 'region'>
    )>, admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'username' | 'phoneNumber'>
    )> }
  )> }
);

export type AllVictimsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllVictimsQuery = (
  { __typename?: 'Query' }
  & { victims: (
    { __typename?: 'VictimList' }
    & { victims: Array<(
      { __typename?: 'VictimData' }
      & VictimDataFragment
    )> }
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const VictimDataFragmentDoc = gql`
    fragment VictimData on VictimData {
  id
  name
  age
  address
  photo
  gender
  location
  region
  creatorPhoneNumber
}
    `;
export const CreateVictimDocument = gql`
    mutation createVictim($options: CreateVictimInput!) {
  createVictim(options: $options) {
    ...VictimData
  }
}
    ${VictimDataFragmentDoc}`;
export type CreateVictimMutationFn = Apollo.MutationFunction<CreateVictimMutation, CreateVictimMutationVariables>;

/**
 * __useCreateVictimMutation__
 *
 * To run a mutation, you first call `useCreateVictimMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVictimMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVictimMutation, { data, loading, error }] = useCreateVictimMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateVictimMutation(baseOptions?: Apollo.MutationHookOptions<CreateVictimMutation, CreateVictimMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVictimMutation, CreateVictimMutationVariables>(CreateVictimDocument, options);
      }
export type CreateVictimMutationHookResult = ReturnType<typeof useCreateVictimMutation>;
export type CreateVictimMutationResult = Apollo.MutationResult<CreateVictimMutation>;
export type CreateVictimMutationOptions = Apollo.BaseMutationOptions<CreateVictimMutation, CreateVictimMutationVariables>;
export const DeleteVictimDocument = gql`
    mutation deleteVictim($victimId: String!) {
  deleteVictim(victimId: $victimId)
}
    `;
export type DeleteVictimMutationFn = Apollo.MutationFunction<DeleteVictimMutation, DeleteVictimMutationVariables>;

/**
 * __useDeleteVictimMutation__
 *
 * To run a mutation, you first call `useDeleteVictimMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVictimMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVictimMutation, { data, loading, error }] = useDeleteVictimMutation({
 *   variables: {
 *      victimId: // value for 'victimId'
 *   },
 * });
 */
export function useDeleteVictimMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVictimMutation, DeleteVictimMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVictimMutation, DeleteVictimMutationVariables>(DeleteVictimDocument, options);
      }
export type DeleteVictimMutationHookResult = ReturnType<typeof useDeleteVictimMutation>;
export type DeleteVictimMutationResult = Apollo.MutationResult<DeleteVictimMutation>;
export type DeleteVictimMutationOptions = Apollo.BaseMutationOptions<DeleteVictimMutation, DeleteVictimMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($options: PhoneNumberPasswordInput!) {
  loginUser(options: $options) {
    errors {
      ...RegularError
    }
    user {
      username
      phoneNumber
      region
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LoginAdminDocument = gql`
    mutation LoginAdmin($options: PhoneNumberPasswordInput!) {
  loginAdmin(options: $options) {
    errors {
      ...RegularError
    }
    admin {
      username
      phoneNumber
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type LoginAdminMutationFn = Apollo.MutationFunction<LoginAdminMutation, LoginAdminMutationVariables>;

/**
 * __useLoginAdminMutation__
 *
 * To run a mutation, you first call `useLoginAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAdminMutation, { data, loading, error }] = useLoginAdminMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginAdminMutation(baseOptions?: Apollo.MutationHookOptions<LoginAdminMutation, LoginAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginAdminMutation, LoginAdminMutationVariables>(LoginAdminDocument, options);
      }
export type LoginAdminMutationHookResult = ReturnType<typeof useLoginAdminMutation>;
export type LoginAdminMutationResult = Apollo.MutationResult<LoginAdminMutation>;
export type LoginAdminMutationOptions = Apollo.BaseMutationOptions<LoginAdminMutation, LoginAdminMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($username: String!, $region: String!, $options: PhoneNumberPasswordInput!) {
  registerUser(username: $username, region: $region, options: $options) {
    errors {
      ...RegularError
    }
    user {
      username
      phoneNumber
      region
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      region: // value for 'region'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const RegisterAdminDocument = gql`
    mutation RegisterAdmin($username: String!, $options: PhoneNumberPasswordInput!) {
  registerAdmin(username: $username, options: $options) {
    errors {
      ...RegularError
    }
    admin {
      username
      phoneNumber
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type RegisterAdminMutationFn = Apollo.MutationFunction<RegisterAdminMutation, RegisterAdminMutationVariables>;

/**
 * __useRegisterAdminMutation__
 *
 * To run a mutation, you first call `useRegisterAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAdminMutation, { data, loading, error }] = useRegisterAdminMutation({
 *   variables: {
 *      username: // value for 'username'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterAdminMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAdminMutation, RegisterAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterAdminMutation, RegisterAdminMutationVariables>(RegisterAdminDocument, options);
      }
export type RegisterAdminMutationHookResult = ReturnType<typeof useRegisterAdminMutation>;
export type RegisterAdminMutationResult = Apollo.MutationResult<RegisterAdminMutation>;
export type RegisterAdminMutationOptions = Apollo.BaseMutationOptions<RegisterAdminMutation, RegisterAdminMutationVariables>;
export const UpdateVictimDocument = gql`
    mutation updateVictim($victimId: String!, $options: CreateVictimInput!) {
  updateVictim(victimId: $victimId, options: $options)
}
    `;
export type UpdateVictimMutationFn = Apollo.MutationFunction<UpdateVictimMutation, UpdateVictimMutationVariables>;

/**
 * __useUpdateVictimMutation__
 *
 * To run a mutation, you first call `useUpdateVictimMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVictimMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVictimMutation, { data, loading, error }] = useUpdateVictimMutation({
 *   variables: {
 *      victimId: // value for 'victimId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateVictimMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVictimMutation, UpdateVictimMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVictimMutation, UpdateVictimMutationVariables>(UpdateVictimDocument, options);
      }
export type UpdateVictimMutationHookResult = ReturnType<typeof useUpdateVictimMutation>;
export type UpdateVictimMutationResult = Apollo.MutationResult<UpdateVictimMutation>;
export type UpdateVictimMutationOptions = Apollo.BaseMutationOptions<UpdateVictimMutation, UpdateVictimMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    errors {
      field
      message
    }
    user {
      username
      phoneNumber
      region
    }
    admin {
      username
      phoneNumber
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AllVictimsDocument = gql`
    query allVictims {
  victims {
    victims {
      ...VictimData
    }
  }
}
    ${VictimDataFragmentDoc}`;

/**
 * __useAllVictimsQuery__
 *
 * To run a query within a React component, call `useAllVictimsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllVictimsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllVictimsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllVictimsQuery(baseOptions?: Apollo.QueryHookOptions<AllVictimsQuery, AllVictimsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllVictimsQuery, AllVictimsQueryVariables>(AllVictimsDocument, options);
      }
export function useAllVictimsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllVictimsQuery, AllVictimsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllVictimsQuery, AllVictimsQueryVariables>(AllVictimsDocument, options);
        }
export type AllVictimsQueryHookResult = ReturnType<typeof useAllVictimsQuery>;
export type AllVictimsLazyQueryHookResult = ReturnType<typeof useAllVictimsLazyQuery>;
export type AllVictimsQueryResult = Apollo.QueryResult<AllVictimsQuery, AllVictimsQueryVariables>;