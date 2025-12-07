var users = [
    {
      "id": 1,
      "forename": "Roy",
      "surname": "Fielding"
    },
    {
      "id": 2,
      "forename": "Tim",
      "surname": "Berners-Lee"
    },
    {
      "id": 3,
      "forename": "Jyri",
      "surname": "Kemppainen"
    }
  ]

let dataMap = {
  jk: [1, 3],
  pl: [2]
}

export function getDataMap () {
    // replace with actual database query
    return dataMap
}

export function getUserDataMap ( username ) {
  // replace with actual database query
  return dataMap[username]
}

export function getUsers () {
    // replace with actual database query
    return users
}

export function getUserById ( id ) {
  // replace with actual database query
  return users.find(item => item.id === id)
}

export function createUser( newData ) {
    // find next id (auto-increment simulation)
    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
  
    const newId = { id: nextId }
    const newUser = { ...newId, ...newData }
  
    // "insert" to simulated database
    users.push( newUser )
  
    // return the new user (like an INSERT returning its row)
    return newUser
  }

export function updateUser(id, data) {
  const index = users.findIndex(u => u.id === id);

  // user not found
  if (index === -1) {
    return false;
  }

  // update existing user
  users[index] = { id, ...data };
  return true;
}

export function deleteUserById(id) {
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);
  return  users.length < initialLength; // true if a user was removed
}

  

export function searchUser(forename) {
  if (!forename) return [];
  return users.filter(u => u.forename.toLowerCase().includes(String(forename).toLowerCase()));
}
