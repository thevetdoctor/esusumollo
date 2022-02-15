const AuthRoutes = require('./AuthRoutes');

module.exports = (app) => {
    app.use('/auth', AuthRoutes);
}