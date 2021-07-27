import { withPluginApi } from 'discourse/lib/plugin-api'

export default {
  name: 'reply-voting',
  initialize () {
     withPluginApi('0.8.22', api => {

       api.modifyClass('controller:preferences/emails', {
         actions: {
           save () {
             this.get('saveAttrNames').push('custom_fields')
             this._super()
           }
         }
       })

     })
  }
}