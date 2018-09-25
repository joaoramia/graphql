'use strict'

import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import User from '../models/user.model'

const resolvers = {
  Query: {
    // fetch the profile of currently authenticated user
    async me(_, args, { user }) {
      // make sure user is logged in
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      // user is authenticated
      return await User.findById(user.id)
    },

    // fetch the profile of currently authenticated user and remove it
    async test(_, args) {
      return 'TEST!'
    }
  },

  Mutation: {
    // Handle user signup
    async signup(_, { email, password }) {
      const user = await User.create({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: await bcrypt.hash(password, 10),
        role: ''
      })

      // return json web token
      return jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '10h' }
      )
    },

    // Handles user login
    async login(_, { email, password }) {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      // return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '10h' }
      )
    },

    // fetch the profile of currently authenticated user and remove it
    async deleteAccount(_, args, { user }) {
        // make sure user is logged in
        if (!user) {
            throw new Error('You are not authenticated!')
        }

        const removedUser = await User.findByIdAndRemove(user.id)

        if(removedUser) {
            return 'success'
        } else {
            return 'weird'
        }
    }
  },
}

module.exports = resolvers
