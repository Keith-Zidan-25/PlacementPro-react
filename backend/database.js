const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_PASSWORD,
    database: 'PLACEMENTPRO'
});

class Queries {
    constructor() {};

    queryDB(query, params = [], isSingleResult = false) {
        return new Promise((resolve, reject) => {
            pool.query(query, params, (err, result) => {
                if (err) reject(err)
                else resolve(this.handleQueryResult(result, isSingleResult))
            });
        });
    };

    handleQueryResult(result, isSingleResult) {
        
        if (isSingleResult) {
            return result.length ? result[0] : null;
        }
        return result;
    }; 

    closeConnection() {
        pool.end((err) => {
            if (err) {
                console.log('Error closing the pool', err);
            } else {
                console.log('Pool closed');
            };
        });
    };
}

const queryDb = new Queries();
module.exports = queryDb