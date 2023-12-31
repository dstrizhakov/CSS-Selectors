import { ILevel } from './types';

export const levels: ILevel[] = [
    {
        helpTitle: 'Select elements by their type',
        selectorName: 'Type Selector',
        doThis: 'Select the plates',
        selector: 'plate',
        syntax: 'A',
        help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: `
  <plate/>
  <plate/>`,
    },
    {
        doThis: 'Select the bento boxes',
        selector: 'bento',
        syntax: 'A',
        helpTitle: 'Select elements by their type',
        selectorName: 'Type Selector',
        help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: `
  <bento/>
  <plate/>
  <bento/>`,
    },
    {
        doThis: 'Select the fancy plate',
        selector: '#fancy',
        selectorName: 'ID Selector',
        helpTitle: 'Select elements with an ID',
        syntax: '#id',
        help: 'Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.',
        examples: [
            '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
            '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
        ],
        boardMarkup: `
  <plate id="fancy"/>
  <plate/>
  <bento/>`,
    },
    {
        helpTitle: 'Select an element inside another element',
        selectorName: 'Descendant Selector',
        doThis: 'Select the apple on the plate',
        selector: 'plate apple',
        syntax: 'A&nbsp;&nbsp;B',
        help: 'Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.',
        examples: [
            '<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
            '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
        ],
        boardMarkup: `
  <bento/>
  <plate>
    <apple/>
  </plate>
  <apple/>`,
    },
    {
        doThis: 'Select the pickle on the fancy plate',
        selector: '#fancy pickle',
        helpTitle: 'Combine the Descendant & ID Selectors',
        syntax: '#id&nbsp;&nbsp;A',
        help: 'You can combine any selector with the descendent selector.',
        examples: [
            '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>',
        ],
        boardMarkup: `
  <bento>
    <orange/>
  </bento>
  <plate id="fancy">
    <pickle/>
  </plate>
  <plate>
    <pickle/>
  </plate>`,
    },
    {
        doThis: 'Select the small apples',
        selector: '.small',
        selectorName: 'Class Selector',
        helpTitle: 'Select elements by their class',
        syntax: '.classname',
        help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
        examples: ['<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>'],
        boardMarkup: `
  <apple/>
    <apple class="small"/>
  <plate>
    <apple class="small"/>
  </plate>
  <plate/>`,
    },
    {
        doThis: 'Select the small oranges',
        selector: 'orange.small',
        helpTitle: 'Combine the Class Selector',
        syntax: 'A.className',
        help: 'You can combine the class selector with other selectors, like the type selector.',
        examples: [
            '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
            '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
        ],
        boardMarkup: `
  <apple/>
  <apple class="small"/>
  <bento>
    <orange class="small"/>
  </bento>
  <plate>
    <orange/>
  </plate>
  <plate>
    <orange class="small"/>
  </plate>`,
    },
    {
        doThis: 'Select the small oranges in the bentos',
        selector: 'bento orange.small',
        syntax: 'Put your back into it!',
        helpTitle: 'You can do it...',
        help: 'Combine what you learned in the last few levels to solve this one!',
        boardMarkup: `
  <bento>
    <orange/>
  </bento>
  <orange class="small"/>
  <bento>
    <orange class="small"/>
  </bento>
  <bento>
    <apple class="small"/>
  </bento>
  <bento>
    <orange class="small"/>
  </bento>`,
    },
    {
        doThis: 'Select all the plates and bentos',
        selector: 'plate,bento',
        selectorName: 'Comma Combinator',
        helpTitle: 'Combine, selectors, with... commas!',
        syntax: 'A, B',
        help: 'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
        examples: [
            '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
            '<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements',
        ],
        boardMarkup: `
  <pickle class="small"/>
  <pickle/>
  <plate>
    <pickle/>
  </plate>
  <bento>
    <pickle/>
  </bento>
  <plate>
    <pickle/>
  </plate>
  <pickle/>
  <pickle class="small"/>`,
    },
    {
        doThis: 'Select all the things!',
        selector: '*',
        selectorName: 'The Universal Selector',
        helpTitle: 'You can select everything!',
        syntax: '*',
        help: 'You can select all elements with the universal selector! ',
        examples: ['<strong>p *</strong> selects any element inside all <tag>p</tag> elements.'],
        boardMarkup: `
  <apple/>
  <plate>
    <orange class="small"/>
  </plate>
  <bento/>
  <bento>
    <orange/>
  </bento>
  <plate id="fancy"/>`,
    },
    {
        doThis: 'Select everything on a plate',
        selector: 'plate *',
        syntax: 'A&nbsp;&nbsp;*',
        helpTitle: 'Combine the Universal Selector',
        help: 'This selects all elements inside of <strong>A</strong>.',
        examples: [
            '<strong>p *</strong> selects every element inside all <tag>p</tag> elements.',
            '<strong>ul.fancy *</strong> selects every element inside all <tag>ul class="fancy"</tag> elements.',
        ],
        boardMarkup: `
  <plate id="fancy">
    <orange class="small"/>
  </plate>
  <plate>
    <pickle/>
  </plate>
  <apple class="small"/>
  <plate>
    <apple/>
  </plate>`,
    },
    {
        doThis: "Select every apple that's next to a plate",
        selector: 'plate + apple',
        helpTitle: 'Select an element that directly follows another element',
        selectorName: 'Adjacent Sibling Selector',
        syntax: 'A + B',
        help: "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
        examples: [
            '<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',
            '<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>',
        ],
        boardMarkup: `
  <bento>
    <apple class="small"/>
  </bento>
  <plate/>
  <apple class="small"/>
  <plate/>
  <apple/>
  <apple class="small"/>
  <apple class="small"/>
`,
    },
    {
        selectorName: 'General Sibling Selector',
        helpTitle: 'Select elements that follows another element',
        syntax: 'A ~ B',
        doThis: 'Select the pickles beside the bento',
        selector: 'bento ~ pickle',
        help: 'You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.',
        examples: ['<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>'],
        boardMarkup: `
  <pickle/>
  <bento>
    <orange class="small"/>
  </bento>
  <pickle class="small"/>
  <pickle/>
  <plate>
  <pickle/>
  </plate>
  <plate>
    <pickle class="small"/>
  </plate>
`,
    },
];
