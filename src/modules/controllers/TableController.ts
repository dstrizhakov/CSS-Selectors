import { IController, IGame, ILevel } from '../types';

export class TableController implements IController {
    private levels: ILevel[];

    constructor(game: IGame) {
        this.levels = game.levels;
    }

    private convertMarkupToHtml(markup: string) {
        let html = '';
        let markupArray = markup.split('\n');

        markupArray = markupArray.map((tag) => {
            let currentClass;
            let currentId;
            // получаем класс
            if (tag.indexOf('class=') !== -1) {
                currentClass = tag.substring(tag.indexOf('class='), tag.indexOf('>')).replace('/', '');
            }
            // получаем id
            if (tag.indexOf('id=') !== -1) {
                currentId = tag.substring(tag.indexOf('id='), tag.indexOf('>')).replace('/', '');
            }

            if (tag.slice(-2) === '/>') {
                let currentTag: string = '';
                for (let i = 0; i < tag.length; i += 1) {
                    // если дошли до конца тега или до class, id завершаем сборку тега
                    if (tag[i] === '/>' || i === tag.indexOf('id=') || i === tag.indexOf('class=')) {
                        break;
                    }
                    if (tag[i].toLocaleLowerCase() !== tag[i].toUpperCase()) {
                        currentTag += tag.charAt(i);
                    }
                }
                return `<${currentTag} ${currentClass || ''} ${currentId || ''}></${currentTag}>`;
            }
            return tag;
        });
        html = markupArray.join('');

        return html;
    }

    public render(level: number) {
        const tableElement: HTMLDivElement = document.getElementById('table') as HTMLDivElement;
        const markup = this.levels[level].boardMarkup;
        const gameWrapper: HTMLDivElement = document.querySelector('.game__wrapper') as HTMLDivElement;
        tableElement.innerHTML = this.convertMarkupToHtml(markup);
        // настраиваем ширину стола под вычесленные стили элементов внутри
        const compWidth = window.getComputedStyle(tableElement).width;
        gameWrapper.style.width = `${parseFloat(compWidth) + 50}px`;

        this.strobeElements(level);
    }

    private strobeElements(level: number) {
        const tableElement: HTMLDivElement = document.getElementById('table') as HTMLDivElement;
        const currentSelector = this.levels[level].selector;
        const elements = tableElement.querySelectorAll(currentSelector);
        elements.forEach((element) => {
            element.classList.add('strobe');
        });
    }
}
