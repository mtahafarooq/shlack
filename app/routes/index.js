import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class IndexRoute extends Route {
  /**
   * @type {AuthService}
   */
  @service auth;

  beforeModel() {
    if (!this.auth.currentUserId) {
      this.transitionTo('login');
    } else {
      this.transitionTo('teams');
    }
  }
}
