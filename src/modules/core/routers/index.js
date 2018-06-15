import Vue from 'vue';
import Router from 'vue-router';
import homeRouter from '../../home/router';
import securityRouter from '../../security/router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    ...securityRouter,
    ...homeRouter,
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
});
