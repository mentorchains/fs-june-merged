import { createWidget } from 'discourse/widgets/widget';
import { iconNode } from "discourse-common/lib/icon-library";
import { h } from "virtual-dom";

createWidget('upvote-button', {
    tagName: 'div.upvote-button',

    html() {
      return "hello world";
    }
});