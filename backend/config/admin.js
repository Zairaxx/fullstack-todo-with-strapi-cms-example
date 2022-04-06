module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4c5898f8329cc588d7cb73b045340c7a'),
  },
});
