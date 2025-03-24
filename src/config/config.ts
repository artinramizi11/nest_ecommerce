import * as dot_env from 'dotenv'
dot_env.config()

export default () => ({
    dbUrl: process.env.dbUrl,
    db_password: process.env.db_password,
    db_username: process.env.db_username,
    db_database: process.env.db_database,
    jwt_secret_key: process.env.jwt_secret_key,
    jwt_expires_time: process.env.jwt_expires_time,
    jwt_refresh_key: process.env.jwt_refresh_key,
    jwt_refresh_expires_time: process.env.jwt_refresh_expires_time

})
