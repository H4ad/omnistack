export const environment = {
  production: true,
  isMockupEnabled: true,
  api: {
    baseUrl: 'http://127.0.0.1:3010',
    login: '/auth/local',
    userInfo: '/user/me',
  },
  routes: {
    authenticatedDefaultRoute: '/ongs',
  },
};
