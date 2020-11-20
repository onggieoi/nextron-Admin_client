import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ScheduleDate = {
  __typename?: 'ScheduleDate';
  id: Scalars['Int'];
  date: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['Int'];
  url: Scalars['String'];
  movieId: Scalars['Int'];
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  director: Scalars['String'];
  producer: Scalars['String'];
  country: Scalars['String'];
  duration: Scalars['Int'];
  thumbnail: Scalars['String'];
  isShow: Scalars['Boolean'];
  images?: Maybe<Array<Image>>;
};

export type ScheduleTime = {
  __typename?: 'ScheduleTime';
  id: Scalars['Int'];
  time: Scalars['String'];
  price: Scalars['Int'];
  theaterId: Scalars['Int'];
  theater?: Maybe<Theater>;
  scheduleDateId: Scalars['Int'];
  scheduleDate: ScheduleDate;
  movieId: Scalars['Int'];
  movie?: Maybe<Movie>;
  location: Scalars['String'];
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['Int'];
  csv: Scalars['Int'];
  creditCardNumber: Scalars['Int'];
  username: Scalars['String'];
  fullname: Scalars['String'];
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['Int'];
  price: Scalars['Int'];
  seatId: Scalars['Int'];
  scheduleTimeId: Scalars['Int'];
  customerId: Scalars['Int'];
  createAt: Scalars['DateTime'];
};


export type Seat = {
  __typename?: 'Seat';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  percent: Scalars['Int'];
  theaterId: Scalars['Float'];
};

export type Theater = {
  __typename?: 'Theater';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  cinemaId: Scalars['Float'];
};

export type Cinema = {
  __typename?: 'Cinema';
  id: Scalars['Int'];
  name: Scalars['String'];
  address: Scalars['String'];
};

export type Test = {
  __typename?: 'Test';
  id: Scalars['Int'];
  title: Scalars['String'];
  createAt: Scalars['DateTime'];
  updateAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  fullname: Scalars['String'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserRespone = {
  __typename?: 'UserRespone';
  user?: Maybe<User>;
  errors?: Maybe<ErrorType>;
};

export type CustomerRespone = {
  __typename?: 'CustomerRespone';
  customer?: Maybe<Customer>;
  errors?: Maybe<ErrorType>;
};

export type ResponeMoviesHome = {
  __typename?: 'ResponeMoviesHome';
  moviesShowing: Array<Movie>;
  moviesComming: Array<Movie>;
};

export type ResponeMovie = {
  __typename?: 'ResponeMovie';
  movie?: Maybe<Movie>;
  error?: Maybe<ErrorType>;
};

export type SeatRespone = {
  __typename?: 'SeatRespone';
  seat?: Maybe<Seat>;
  isAvailable?: Maybe<Scalars['Boolean']>;
};

export type GeneralReportRespone = {
  __typename?: 'GeneralReportRespone';
  users: Scalars['Int'];
  movies: Scalars['Int'];
  total: Scalars['Int'];
};

export type Transactions = {
  __typename?: 'Transactions';
  user: Scalars['String'];
  location: Scalars['String'];
  date: Scalars['DateTime'];
  price: Scalars['Int'];
};

export type Chart = {
  __typename?: 'Chart';
  month: Scalars['String'];
  price: Scalars['Int'];
};

export type ScheduleRespone = {
  __typename?: 'ScheduleRespone';
  schedule?: Maybe<ScheduleTime>;
  error?: Maybe<Scalars['Boolean']>;
};

export type SignUpInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  fullname: Scalars['String'];
};

export type SignInInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type SignInCustomerInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  fullname: Scalars['String'];
  creditCardNumber: Scalars['Int'];
  csv: Scalars['Int'];
};

export type InputGetTime = {
  movieId?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
};

export type InputGetSeat = {
  scheduleTimeId?: Maybe<Scalars['Int']>;
  theaterId?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
};

export type BuyTicketInput = {
  scheduleTimeId: Scalars['Int'];
  seatId: Scalars['Int'];
  price: Scalars['Int'];
  location: Scalars['String'];
};

export type CreateMovieInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  director: Scalars['String'];
  producer: Scalars['String'];
  country: Scalars['String'];
  duration: Scalars['Int'];
  thumbnail: Scalars['String'];
  isShow: Scalars['Boolean'];
  images: Array<Scalars['String']>;
};

export type CreateScheduleInput = {
  id?: Maybe<Scalars['Int']>;
  date: Scalars['String'];
  location: Scalars['String'];
  theaterId: Scalars['Int'];
  movieId: Scalars['Int'];
  time: Scalars['String'];
  price: Scalars['Int'];
};

export type QuerySchedulesInput = {
  date: Scalars['String'];
  location?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<UserRespone>;
  meCustomer?: Maybe<CustomerRespone>;
  moviesForHome: ResponeMoviesHome;
  cinemas: Array<Cinema>;
  moviesShowing: Array<Movie>;
  moviesComming: Array<Movie>;
  movie: ResponeMovie;
  getTimesSession: Array<ScheduleTime>;
  seats: Array<SeatRespone>;
  generalReport: GeneralReportRespone;
  transactions: Array<Transactions>;
  chart: Array<Chart>;
  movies: Array<Movie>;
  ListSchedules: Array<ScheduleTime>;
  schedule?: Maybe<ScheduleRespone>;
  moviesOption: Array<Movie>;
  theaterOptions: Array<Theater>;
};


export type QueryMovieArgs = {
  id: Scalars['Int'];
};


export type QueryGetTimesSessionArgs = {
  options: InputGetTime;
};


export type QuerySeatsArgs = {
  options: InputGetSeat;
};


export type QueryListSchedulesArgs = {
  data: QuerySchedulesInput;
};


export type QueryScheduleArgs = {
  id: Scalars['Int'];
};


export type QueryTheaterOptionsArgs = {
  location: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  userSignUp?: Maybe<UserRespone>;
  userSignIn?: Maybe<UserRespone>;
  customerSignUp?: Maybe<CustomerRespone>;
  customerSignIn?: Maybe<CustomerRespone>;
  logout: Scalars['Boolean'];
  buyTicket: Scalars['Boolean'];
  createMovie: Scalars['Boolean'];
  deleteMovie: Scalars['Boolean'];
  createSchedule: Scalars['Boolean'];
};


export type MutationUserSignUpArgs = {
  data: SignUpInput;
};


export type MutationUserSignInArgs = {
  data: SignInInput;
};


export type MutationCustomerSignUpArgs = {
  data: SignInCustomerInput;
};


export type MutationCustomerSignInArgs = {
  data: SignInInput;
};


export type MutationBuyTicketArgs = {
  options: BuyTicketInput;
};


export type MutationCreateMovieArgs = {
  data: CreateMovieInput;
};


export type MutationDeleteMovieArgs = {
  id: Scalars['Int'];
};


export type MutationCreateScheduleArgs = {
  data: CreateScheduleInput;
};

export type CreateMovieMutationVariables = Exact<{
  data: CreateMovieInput;
}>;


export type CreateMovieMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMovie'>
);

export type CreateScheduleMutationVariables = Exact<{
  data: CreateScheduleInput;
}>;


export type CreateScheduleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSchedule'>
);

export type DeleteMovieMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMovieMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMovie'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SignInMutationVariables = Exact<{
  data: SignInInput;
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { userSignIn?: Maybe<(
    { __typename?: 'UserRespone' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'fullname'>
    )>, errors?: Maybe<(
      { __typename?: 'ErrorType' }
      & Pick<ErrorType, 'field' | 'message'>
    )> }
  )> }
);

export type ChartQueryVariables = Exact<{ [key: string]: never; }>;


export type ChartQuery = (
  { __typename?: 'Query' }
  & { chart: Array<(
    { __typename?: 'Chart' }
    & Pick<Chart, 'month' | 'price'>
  )> }
);

export type GeneralReportQueryVariables = Exact<{ [key: string]: never; }>;


export type GeneralReportQuery = (
  { __typename?: 'Query' }
  & { generalReport: (
    { __typename?: 'GeneralReportRespone' }
    & Pick<GeneralReportRespone, 'movies' | 'total' | 'users'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserRespone' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'fullname'>
    )>, errors?: Maybe<(
      { __typename?: 'ErrorType' }
      & Pick<ErrorType, 'field' | 'message'>
    )> }
  )> }
);

export type MovieQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MovieQuery = (
  { __typename?: 'Query' }
  & { movie: (
    { __typename?: 'ResponeMovie' }
    & { movie?: Maybe<(
      { __typename?: 'Movie' }
      & Pick<Movie, 'id' | 'name' | 'description' | 'type' | 'director' | 'producer' | 'country' | 'duration' | 'thumbnail' | 'isShow'>
      & { images?: Maybe<Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'url' | 'id'>
      )>> }
    )>, error?: Maybe<(
      { __typename?: 'ErrorType' }
      & Pick<ErrorType, 'field' | 'message'>
    )> }
  ) }
);

export type MoviesOptionQueryVariables = Exact<{ [key: string]: never; }>;


export type MoviesOptionQuery = (
  { __typename?: 'Query' }
  & { moviesOption: Array<(
    { __typename?: 'Movie' }
    & Pick<Movie, 'id' | 'name'>
  )> }
);

export type MoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type MoviesQuery = (
  { __typename?: 'Query' }
  & { movies: Array<(
    { __typename?: 'Movie' }
    & Pick<Movie, 'id' | 'name' | 'duration' | 'isShow'>
    & { images?: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'url'>
    )>> }
  )> }
);

export type ScheduleQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ScheduleQuery = (
  { __typename?: 'Query' }
  & { schedule?: Maybe<(
    { __typename?: 'ScheduleRespone' }
    & Pick<ScheduleRespone, 'error'>
    & { schedule?: Maybe<(
      { __typename?: 'ScheduleTime' }
      & Pick<ScheduleTime, 'id' | 'time' | 'location' | 'price'>
      & { scheduleDate: (
        { __typename?: 'ScheduleDate' }
        & Pick<ScheduleDate, 'date'>
      ), theater?: Maybe<(
        { __typename?: 'Theater' }
        & Pick<Theater, 'id' | 'name'>
      )>, movie?: Maybe<(
        { __typename?: 'Movie' }
        & Pick<Movie, 'id' | 'name'>
      )> }
    )> }
  )> }
);

export type ListSchedulesQueryVariables = Exact<{
  data: QuerySchedulesInput;
}>;


export type ListSchedulesQuery = (
  { __typename?: 'Query' }
  & { ListSchedules: Array<(
    { __typename?: 'ScheduleTime' }
    & Pick<ScheduleTime, 'id' | 'time'>
    & { movie?: Maybe<(
      { __typename?: 'Movie' }
      & Pick<Movie, 'id' | 'name' | 'thumbnail' | 'duration'>
    )>, theater?: Maybe<(
      { __typename?: 'Theater' }
      & Pick<Theater, 'name'>
    )> }
  )> }
);

export type TheaterOptionsQueryVariables = Exact<{
  location: Scalars['String'];
}>;


export type TheaterOptionsQuery = (
  { __typename?: 'Query' }
  & { theaterOptions: Array<(
    { __typename?: 'Theater' }
    & Pick<Theater, 'id' | 'name'>
  )> }
);

export type TransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: Array<(
    { __typename?: 'Transactions' }
    & Pick<Transactions, 'user' | 'location' | 'price' | 'date'>
  )> }
);


export const CreateMovieDocument = gql`
    mutation CreateMovie($data: CreateMovieInput!) {
  createMovie(data: $data)
}
    `;
export type CreateMovieMutationFn = Apollo.MutationFunction<CreateMovieMutation, CreateMovieMutationVariables>;

/**
 * __useCreateMovieMutation__
 *
 * To run a mutation, you first call `useCreateMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMovieMutation, { data, loading, error }] = useCreateMovieMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMovieMutation(baseOptions?: Apollo.MutationHookOptions<CreateMovieMutation, CreateMovieMutationVariables>) {
        return Apollo.useMutation<CreateMovieMutation, CreateMovieMutationVariables>(CreateMovieDocument, baseOptions);
      }
export type CreateMovieMutationHookResult = ReturnType<typeof useCreateMovieMutation>;
export type CreateMovieMutationResult = Apollo.MutationResult<CreateMovieMutation>;
export type CreateMovieMutationOptions = Apollo.BaseMutationOptions<CreateMovieMutation, CreateMovieMutationVariables>;
export const CreateScheduleDocument = gql`
    mutation CreateSchedule($data: CreateScheduleInput!) {
  createSchedule(data: $data)
}
    `;
export type CreateScheduleMutationFn = Apollo.MutationFunction<CreateScheduleMutation, CreateScheduleMutationVariables>;

/**
 * __useCreateScheduleMutation__
 *
 * To run a mutation, you first call `useCreateScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScheduleMutation, { data, loading, error }] = useCreateScheduleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateScheduleMutation(baseOptions?: Apollo.MutationHookOptions<CreateScheduleMutation, CreateScheduleMutationVariables>) {
        return Apollo.useMutation<CreateScheduleMutation, CreateScheduleMutationVariables>(CreateScheduleDocument, baseOptions);
      }
export type CreateScheduleMutationHookResult = ReturnType<typeof useCreateScheduleMutation>;
export type CreateScheduleMutationResult = Apollo.MutationResult<CreateScheduleMutation>;
export type CreateScheduleMutationOptions = Apollo.BaseMutationOptions<CreateScheduleMutation, CreateScheduleMutationVariables>;
export const DeleteMovieDocument = gql`
    mutation DeleteMovie($id: Int!) {
  deleteMovie(id: $id)
}
    `;
export type DeleteMovieMutationFn = Apollo.MutationFunction<DeleteMovieMutation, DeleteMovieMutationVariables>;

/**
 * __useDeleteMovieMutation__
 *
 * To run a mutation, you first call `useDeleteMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMovieMutation, { data, loading, error }] = useDeleteMovieMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMovieMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMovieMutation, DeleteMovieMutationVariables>) {
        return Apollo.useMutation<DeleteMovieMutation, DeleteMovieMutationVariables>(DeleteMovieDocument, baseOptions);
      }
export type DeleteMovieMutationHookResult = ReturnType<typeof useDeleteMovieMutation>;
export type DeleteMovieMutationResult = Apollo.MutationResult<DeleteMovieMutation>;
export type DeleteMovieMutationOptions = Apollo.BaseMutationOptions<DeleteMovieMutation, DeleteMovieMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
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
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($data: SignInInput!) {
  userSignIn(data: $data) {
    user {
      id
      username
      fullname
    }
    errors {
      field
      message
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const ChartDocument = gql`
    query Chart {
  chart {
    month
    price
  }
}
    `;

/**
 * __useChartQuery__
 *
 * To run a query within a React component, call `useChartQuery` and pass it any options that fit your needs.
 * When your component renders, `useChartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChartQuery({
 *   variables: {
 *   },
 * });
 */
export function useChartQuery(baseOptions?: Apollo.QueryHookOptions<ChartQuery, ChartQueryVariables>) {
        return Apollo.useQuery<ChartQuery, ChartQueryVariables>(ChartDocument, baseOptions);
      }
export function useChartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChartQuery, ChartQueryVariables>) {
          return Apollo.useLazyQuery<ChartQuery, ChartQueryVariables>(ChartDocument, baseOptions);
        }
export type ChartQueryHookResult = ReturnType<typeof useChartQuery>;
export type ChartLazyQueryHookResult = ReturnType<typeof useChartLazyQuery>;
export type ChartQueryResult = Apollo.QueryResult<ChartQuery, ChartQueryVariables>;
export const GeneralReportDocument = gql`
    query GeneralReport {
  generalReport {
    movies
    total
    users
  }
}
    `;

/**
 * __useGeneralReportQuery__
 *
 * To run a query within a React component, call `useGeneralReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneralReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneralReportQuery({
 *   variables: {
 *   },
 * });
 */
export function useGeneralReportQuery(baseOptions?: Apollo.QueryHookOptions<GeneralReportQuery, GeneralReportQueryVariables>) {
        return Apollo.useQuery<GeneralReportQuery, GeneralReportQueryVariables>(GeneralReportDocument, baseOptions);
      }
export function useGeneralReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneralReportQuery, GeneralReportQueryVariables>) {
          return Apollo.useLazyQuery<GeneralReportQuery, GeneralReportQueryVariables>(GeneralReportDocument, baseOptions);
        }
export type GeneralReportQueryHookResult = ReturnType<typeof useGeneralReportQuery>;
export type GeneralReportLazyQueryHookResult = ReturnType<typeof useGeneralReportLazyQuery>;
export type GeneralReportQueryResult = Apollo.QueryResult<GeneralReportQuery, GeneralReportQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    user {
      id
      username
      fullname
    }
    errors {
      field
      message
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
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MovieDocument = gql`
    query Movie($id: Int!) {
  movie(id: $id) {
    movie {
      id
      name
      description
      type
      director
      producer
      country
      duration
      thumbnail
      isShow
      images {
        url
        id
      }
    }
    error {
      field
      message
    }
  }
}
    `;

/**
 * __useMovieQuery__
 *
 * To run a query within a React component, call `useMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovieQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMovieQuery(baseOptions?: Apollo.QueryHookOptions<MovieQuery, MovieQueryVariables>) {
        return Apollo.useQuery<MovieQuery, MovieQueryVariables>(MovieDocument, baseOptions);
      }
export function useMovieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovieQuery, MovieQueryVariables>) {
          return Apollo.useLazyQuery<MovieQuery, MovieQueryVariables>(MovieDocument, baseOptions);
        }
export type MovieQueryHookResult = ReturnType<typeof useMovieQuery>;
export type MovieLazyQueryHookResult = ReturnType<typeof useMovieLazyQuery>;
export type MovieQueryResult = Apollo.QueryResult<MovieQuery, MovieQueryVariables>;
export const MoviesOptionDocument = gql`
    query MoviesOption {
  moviesOption {
    id
    name
  }
}
    `;

/**
 * __useMoviesOptionQuery__
 *
 * To run a query within a React component, call `useMoviesOptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoviesOptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoviesOptionQuery({
 *   variables: {
 *   },
 * });
 */
export function useMoviesOptionQuery(baseOptions?: Apollo.QueryHookOptions<MoviesOptionQuery, MoviesOptionQueryVariables>) {
        return Apollo.useQuery<MoviesOptionQuery, MoviesOptionQueryVariables>(MoviesOptionDocument, baseOptions);
      }
export function useMoviesOptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoviesOptionQuery, MoviesOptionQueryVariables>) {
          return Apollo.useLazyQuery<MoviesOptionQuery, MoviesOptionQueryVariables>(MoviesOptionDocument, baseOptions);
        }
export type MoviesOptionQueryHookResult = ReturnType<typeof useMoviesOptionQuery>;
export type MoviesOptionLazyQueryHookResult = ReturnType<typeof useMoviesOptionLazyQuery>;
export type MoviesOptionQueryResult = Apollo.QueryResult<MoviesOptionQuery, MoviesOptionQueryVariables>;
export const MoviesDocument = gql`
    query Movies {
  movies {
    id
    name
    duration
    isShow
    images {
      url
    }
  }
}
    `;

/**
 * __useMoviesQuery__
 *
 * To run a query within a React component, call `useMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMoviesQuery(baseOptions?: Apollo.QueryHookOptions<MoviesQuery, MoviesQueryVariables>) {
        return Apollo.useQuery<MoviesQuery, MoviesQueryVariables>(MoviesDocument, baseOptions);
      }
export function useMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoviesQuery, MoviesQueryVariables>) {
          return Apollo.useLazyQuery<MoviesQuery, MoviesQueryVariables>(MoviesDocument, baseOptions);
        }
export type MoviesQueryHookResult = ReturnType<typeof useMoviesQuery>;
export type MoviesLazyQueryHookResult = ReturnType<typeof useMoviesLazyQuery>;
export type MoviesQueryResult = Apollo.QueryResult<MoviesQuery, MoviesQueryVariables>;
export const ScheduleDocument = gql`
    query Schedule($id: Int!) {
  schedule(id: $id) {
    schedule {
      id
      time
      location
      price
      scheduleDate {
        date
      }
      theater {
        id
        name
      }
      movie {
        id
        name
      }
    }
    error
  }
}
    `;

/**
 * __useScheduleQuery__
 *
 * To run a query within a React component, call `useScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScheduleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useScheduleQuery(baseOptions?: Apollo.QueryHookOptions<ScheduleQuery, ScheduleQueryVariables>) {
        return Apollo.useQuery<ScheduleQuery, ScheduleQueryVariables>(ScheduleDocument, baseOptions);
      }
export function useScheduleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScheduleQuery, ScheduleQueryVariables>) {
          return Apollo.useLazyQuery<ScheduleQuery, ScheduleQueryVariables>(ScheduleDocument, baseOptions);
        }
export type ScheduleQueryHookResult = ReturnType<typeof useScheduleQuery>;
export type ScheduleLazyQueryHookResult = ReturnType<typeof useScheduleLazyQuery>;
export type ScheduleQueryResult = Apollo.QueryResult<ScheduleQuery, ScheduleQueryVariables>;
export const ListSchedulesDocument = gql`
    query ListSchedules($data: QuerySchedulesInput!) {
  ListSchedules(data: $data) {
    id
    time
    movie {
      id
      name
      thumbnail
      duration
    }
    theater {
      name
    }
  }
}
    `;

/**
 * __useListSchedulesQuery__
 *
 * To run a query within a React component, call `useListSchedulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSchedulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSchedulesQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useListSchedulesQuery(baseOptions?: Apollo.QueryHookOptions<ListSchedulesQuery, ListSchedulesQueryVariables>) {
        return Apollo.useQuery<ListSchedulesQuery, ListSchedulesQueryVariables>(ListSchedulesDocument, baseOptions);
      }
export function useListSchedulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSchedulesQuery, ListSchedulesQueryVariables>) {
          return Apollo.useLazyQuery<ListSchedulesQuery, ListSchedulesQueryVariables>(ListSchedulesDocument, baseOptions);
        }
export type ListSchedulesQueryHookResult = ReturnType<typeof useListSchedulesQuery>;
export type ListSchedulesLazyQueryHookResult = ReturnType<typeof useListSchedulesLazyQuery>;
export type ListSchedulesQueryResult = Apollo.QueryResult<ListSchedulesQuery, ListSchedulesQueryVariables>;
export const TheaterOptionsDocument = gql`
    query TheaterOptions($location: String!) {
  theaterOptions(location: $location) {
    id
    name
  }
}
    `;

/**
 * __useTheaterOptionsQuery__
 *
 * To run a query within a React component, call `useTheaterOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTheaterOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTheaterOptionsQuery({
 *   variables: {
 *      location: // value for 'location'
 *   },
 * });
 */
export function useTheaterOptionsQuery(baseOptions?: Apollo.QueryHookOptions<TheaterOptionsQuery, TheaterOptionsQueryVariables>) {
        return Apollo.useQuery<TheaterOptionsQuery, TheaterOptionsQueryVariables>(TheaterOptionsDocument, baseOptions);
      }
export function useTheaterOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TheaterOptionsQuery, TheaterOptionsQueryVariables>) {
          return Apollo.useLazyQuery<TheaterOptionsQuery, TheaterOptionsQueryVariables>(TheaterOptionsDocument, baseOptions);
        }
export type TheaterOptionsQueryHookResult = ReturnType<typeof useTheaterOptionsQuery>;
export type TheaterOptionsLazyQueryHookResult = ReturnType<typeof useTheaterOptionsLazyQuery>;
export type TheaterOptionsQueryResult = Apollo.QueryResult<TheaterOptionsQuery, TheaterOptionsQueryVariables>;
export const TransactionsDocument = gql`
    query Transactions {
  transactions {
    user
    location
    price
    date
  }
}
    `;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        return Apollo.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
      }
export function useTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          return Apollo.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = Apollo.QueryResult<TransactionsQuery, TransactionsQueryVariables>;