const config = {
    user: 'user',
    password: "pwd",
    server: 'ip',
    database: 'dDB',
    options: {
        trustServerCertificate: true,
        trustedconnection: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
}

module.exports = config;