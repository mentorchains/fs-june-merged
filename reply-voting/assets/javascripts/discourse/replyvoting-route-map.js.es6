/**
 * Links the path `/replyvoting` to a route named `replyvoting`. Named like this, a
 * route with the same name needs to be created in the `routes` directory.
 */

 import { ajax } from 'discourse/lib/ajax'
 import { apiInitializer } from "discourse/lib/api";
 import { h } from 'virtual-dom';
 import { createWidget } from 'discourse/widgets/widget';
 
 export default apiInitializer("0.11.1", api => {
   console.log("hello world from api initializer!");
   
  
   const { iconNode } = require("discourse-common/lib/icon-library");
   let icon = iconNode('long-arrow-alt-up');
 
   api.decorateWidget('post-menu:extra-post-controls', helper => {
     return helper.h('', [
         helper.h('a.icon', {
             title: 'Upvote'
         }, iconNode('long-arrow-alt-up')), 
     ]);
 });
 
 api.decorateWidget('post-menu:extra-post-controls', helper => {
   return helper.h('', [
       helper.h('a.icon', {
           title: 'Downvote'
       }, iconNode('long-arrow-alt-down')), 
   ]);
 });
   
 });
 
 export default function () {
    this.route('replyvoting', { path: '/replyvoting' });
  }