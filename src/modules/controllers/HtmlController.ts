import hljs from 'highlight.js/lib/core';

import xml from 'highlight.js/lib/languages/xml';

import { IController, IGame, ILevel } from '../types';

export class HtmlController implements IController {
    private levels: ILevel[];

    constructor(game: IGame) {
        this.levels = game.levels;
        this.init();
    }

    private init() {
        hljs.registerLanguage('HTML', xml);
    }

    private convertMarkupToText(markup: string) {
        return markup;
    }

    public render(level: number) {
        const htmlFieldElement: HTMLElement = document.getElementById('html-field') as HTMLElement;
        const htmlText = this.convertMarkupToText(this.levels[level].boardMarkup);
        htmlFieldElement.innerHTML = `<pre><code class="language-html"></code></pre>`;

        const hljsElement = document.querySelector('.language-html') as HTMLDivElement;
        hljsElement.innerText = `<div class="table">${htmlText}</div>`;
        hljs.highlightAll();

        const currentHljs = document.querySelectorAll('span.hljs-tag');
        Array.from(currentHljs).forEach((element) => {
            element.insertAdjacentHTML('afterend', '<br>');
        });
    }
}
