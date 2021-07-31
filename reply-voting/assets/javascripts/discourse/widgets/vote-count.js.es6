import { createWidget } from 'discourse/widgets/widget';
import { iconNode } from "discourse-common/lib/icon-library";
import { h } from "virtual-dom";

export default createWidget('vote-count', {
    tagName: 'vote-count',
    
    buildKey: () => 'vote-count',
    
    html(attrs) { 
        return h('vote-count', "Test createWidget()");
    },
});