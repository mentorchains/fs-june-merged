export default {
    resource: 'user',
    path: 'users/:username',
    map() {
     this.route('route', { path: '/route' })
    }
   }