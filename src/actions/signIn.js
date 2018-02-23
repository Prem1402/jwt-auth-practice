import db from '../db'

/**
 * Returns row for user with given id (will throw error if id does not exist in db)
 * @param {string} id 
 * @returns {promise} - Promise that resolves to an object representing the user row if id is in db
 */
const findUserById = (id) => {
  const query = `
    SELECT * 
    FROM users
    WHERE id=$1
  `
  return db.one(query, [id])
}

/**
 * Return user row that matches email / password
 * @param {string} email 
 * @param {string} password - encrypted password
 * @returns {promise} - Promise that resolves to 
 *                        * an object representing the user row if email /password combo exists
 *                        * null if the user/email combo doesn't exist
 */
const verifyUser = (email, password) => {
  const query = `
    SELECT * 
    FROM users
    WHERE 
      email=$/email/ AND 
      password=$/password/
  `
  return db.oneOrNone(query, { email, password })
}

module.exports = {
  findUserById, 
  verifyUser,
}
