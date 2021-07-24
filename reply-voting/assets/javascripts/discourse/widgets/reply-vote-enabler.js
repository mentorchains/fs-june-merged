import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

createWidget('reply-vote-enabler', {
  tagName: 'div.hello',

  html() {
    return h('span.greeting', h('b', "hello world"));
  }
});