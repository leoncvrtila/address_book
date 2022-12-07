import { Model } from 'pinia-orm';

export class Contact extends Model {
  static entity = 'contacts';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(),
      firstName: this.string(''),
      lastName: this.string(''),
      email: this.string(''),
      country: this.string(''),
    };
  }
}
