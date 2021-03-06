import Ember from 'ember';
import Resource from 'ember-api-store/models/resource';
import { getByServiceId } from 'ui/utils/denormalize-snowflakes';

export default Resource.extend({
  type: 'serviceConsumeMap',

  forceUpdate: function() {
    let store = this.get('store');

    Ember.run.next(this, function() {
      try {
        var consumer = getByServiceId(store, this.get('serviceId'));
        if ( consumer )
        {
          //console.log('Update consumer', this.get('serviceId'), '->', this.get('consumedServiceId'));
          consumer.propertyDidChange('consumedServicesWithNames');
        }
        else
        {
          //console.log('The consumer service', this.get('serviceId'), 'does not exist yet');
        }

        var consumed = getByServiceId(store, this.get('consumedServiceId'));
        if ( consumed )
        {
          //console.log('Update consumed', this.get('serviceId'), '->', this.get('consumedServiceId'));
          consumed.propertyDidChange('consumedServicesWithNames');
        }
        else
        {
          //console.log('The *consumed* service', this.get('consumedServiceId'), 'does not exist yet');
        }
      } catch(e) {
        //console.log('Err:', e);
      }
   });
  }.on('init')
});
