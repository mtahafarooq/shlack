// @ts-nocheck
import Base from 'ember-simple-auth/authenticators/base';

export default class CustomAuthenticator extends Base {
  async restore(data) {
    const { session } = data;
    if (session.jwt) {
      return data;
    } else {
      throw 'no valid session data';
    }
  }

  async authenticate(email, password) {
    return {
      session: {
        jwt: 'token',
      },
    };
  }

  async invalidate(data) {}
}
