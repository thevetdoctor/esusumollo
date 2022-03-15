const AuthRoutes = require('./AuthRoutes');
const GroupRoutes = require('./GroupRoutes');
const MemberRoutes = require('./MemberRoutes');
const TenureRoutes = require('./TenureRoutes');
const ContributionRoutes = require('./ContributionRoutes');
const PayoutRoutes = require('./PayoutRoutes');
const MailRoutes = require('./MailRoutes');
require('dotenv').config();

module.exports = (app) => {
  app.use('/auth', AuthRoutes);
  app.use('/groups', GroupRoutes);
  app.use('/members', MemberRoutes);
  app.use('/tenures', TenureRoutes);
  app.use('/contributions', ContributionRoutes);
  app.use('/payouts', PayoutRoutes);
  app.use('/mail', MailRoutes);
};
