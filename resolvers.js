import {getUsers as getAllData, getUserById as getDataById, createUser as createData, getUserDataMap, updateUser as updateData, deleteUserById as deleteData, searchUser as searchData} from './databases/db.js'
import {getAuthUser} from './databases/authdb.js'
import jwt from 'jsonwebtoken'

export const resolvers = {
    Query: {
        getAllData: (parent, args, context) => {
            if (!context.user)
                throw new Error('Unauthorized access')
            return getAllData()
        },
        getDataById: (parent, args, context) => {
            return getDataById(Number(args.id));
        },
        searchData: (parent, args, context) => {
            if (!context.user) throw new Error('Unauthorized access')
            return searchData(args.forename)
        }
    },

    Mutation: {
        createData: (parent, args, context) => {
            if (!context.user) throw new Error('Unauthorized access')
            const newItem = { forename: args.forename.trim(), surname: args.surname.trim() }
            const created = createData(newItem)
            return created || newItem
        },

        updateData: (parent, args, context) => {
            if (!context.user) throw new Error('Unauthorized access')
            const id = Number(args.id)
            const validItem = { forename: args.forename.trim(), surname: args.surname.trim() }
            const existed = updateData(id, validItem)
            return { id, ...validItem }
        },

        deleteData: (parent, args, context) => {
            if (!context.user) throw new Error('Unauthorized access')
            const id = Number(args.id)
            const ok = deleteData(id)
            if (!ok) throw new Error('Data not found for delete.')
            return ok
        },

        login: (parent, args) => {
            const { username, password } = args
            const authUser = getAuthUser(username)

            if (!authUser || authUser.password !== password)
                throw new Error('Unauthorized')

            const token = jwt.sign({username: username}, "my_secret_key", {
                expiresIn: '1h'
            }) 

            return {
                "username": username,
                "access_token": token,
                "token_type": "Bearer",
                "expires_in": "1h"
            }
        }
    }
}
