import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class TeamsRoute extends Route {
  @service session;

  async beforeModel(transition) {
    await super.beforeModel(transition);
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    const response = await fetch('/api/teams');
    return await response.json();
  }
}
