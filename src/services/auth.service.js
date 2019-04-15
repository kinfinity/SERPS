/*
 * Created by Dare McAdewole <dare.dev.adewole@gmail.com>
 * Created on Fri Apr 12 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 */
import definePermissionsFor from '../acl/Ability'

class AuthService {
    async create (user, params) {
        return {
            ...user,
            abilities: definePermissionsFor(user)
        }
    }
}

export default new AuthService()
