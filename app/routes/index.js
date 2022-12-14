import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service session;

  async beforeModel() {
    if (!this.session.isAuthenticated) {
      this.transitionTo('login');
    } else {
      this.transitionTo('teams');
    }
  }
}
