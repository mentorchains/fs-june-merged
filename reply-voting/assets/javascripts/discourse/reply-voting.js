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
            title: 'Up_Arrow'
        }, iconNode('long-arrow-alt-up')), 
    ]);
});

api.decorateWidget('post-menu:extra-post-controls', helper => {
  return helper.h('', [
      helper.h('a.icon', {
          title: 'Down_Arrow'
      }, iconNode('long-arrow-alt-down')), 
  ]);
});
  
});
