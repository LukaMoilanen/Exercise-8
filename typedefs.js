import gql from "graphql-tag";

export const typeDefs = gql`

  """
  Represents a single data item in the system.
  Contains personal information fields used in CRUD operations.
  """
  type Data {
    id: ID!
    forename: String!
    surname: String!
  }

  """
  Returned when user logs in successfully.
  Contains the username and an access token (JWT).
  """
  type AuthPayload {
    username: String!
    access_token: String!
  }

  """
  Root-level queries for retrieving data.
  """
  type Query {

    """
    Returns a list of all data items.
    Requires a valid Authorization header.
    """
    getAllData: [Data]

    """
    Returns a single data item by its ID.
    ID is required.
    """
    getDataById(id: ID!): Data

    """
    Search for data items by a text query.
    Searches over forename and surname fields.
    Requires Authorization.
    """
    searchData(query: String!): [Data]
  }

  """
  Root-level mutations for modifying data or logging in.
  """
  type Mutation {

    """
    Creates a new data entry with the given forename and surname.
    Returns the created item.
    """
    createData(forename: String!, surname: String!): Data

    """
    Updates an existing data item by ID.
    All fields must be provided.
    Returns the updated item.
    """
    updateData(id: ID!, forename: String!, surname: String!): Data

    """
    Deletes the data item with the given ID.
    Returns true if deletion was successful.
    """
    deleteData(id: ID!): Boolean

    """
    Logs the user in with username + password.
    Returns a JWT access token and username.
    """
    login(username: String!, password: String!): AuthPayload
  }
`;