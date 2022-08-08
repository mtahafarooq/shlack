import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginFormComponent extends Component {
  @tracked
  userId = null;

  @service session;

  get isDisabled() {
    return !this.userId;
  }

  /**
   *
   * @param {Event & {target: HTMLSelectElement}} evt
   */
  @action
  onSelectChanged(evt) {
    this.userId = evt.target.value;
  }

  /**
   *
   * @param {Event & {target:HTMLFormElement}} evt
   */
  @action
  async onLoginFormSubmit(evt) {
    evt.preventDefault();
    try {
      await this.session.authenticate(
        'authenticator:token',
        'mtahafrq',
        'rockawear'
      );
    } catch (error) {
      console.log('dasdasdasdasd', error);
    }
  }
}
