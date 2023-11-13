import { IGame, ILevel } from './types';
import { HtmlController } from './controllers/HtmlController';
import { LevelController } from './controllers/LevelController';
import { TableController } from './controllers/TableController';

export default class Game implements IGame {
    public levels: ILevel[];

    private completedLevels: Set<number>;

    private currentLevel: number;

    private HtmlController: HtmlController;

    private LevelController: LevelController;

    private TableController: TableController;

    constructor(levels: ILevel[]) {
        this.levels = levels;
        this.completedLevels = new Set<number>();
        this.currentLevel = 0;
        this.HtmlController = new HtmlController(this);
        this.LevelController = new LevelController(this);
        this.TableController = new TableController(this);
    }

    public start() {
        this.loadCurrentLevel(); // загружаем данные о текущем уровне и пройденных уровнях

        document.querySelector('.nav__next')?.addEventListener('click', this.next.bind(this));
        document.querySelector('.nav__previous')?.addEventListener('click', this.prev.bind(this));

        this.render();

        const cssFieldElement: HTMLDivElement = document.getElementById('css-field') as HTMLDivElement;
        const cssButtonElement: HTMLDivElement = document.getElementById('css-button') as HTMLDivElement;
        cssFieldElement.addEventListener('keypress', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                this.checkAnswer();
            }
        });
        cssButtonElement.addEventListener('click', () => {
            this.checkAnswer();
        });
    }

    public gotoLevel(level: number) {
        this.currentLevel = level;
        this.saveCurrentLevel();
        this.render();
    }

    public resetProgress() {
        this.completedLevels = new Set();
        localStorage.removeItem('completedLevels');
        this.render();
    }

    private loadCurrentLevel() {
        const storedCurrentLevel = Number(localStorage.getItem('currentLevel'));
        const storedCompletedLevels = localStorage
            .getItem('completedLevels')
            ?.split(',')
            .map((item) => Number(item));
        this.currentLevel = storedCurrentLevel || 0;
        this.completedLevels = new Set(storedCompletedLevels);
    }

    private saveCurrentLevel() {
        localStorage.setItem('currentLevel', this.currentLevel.toString());
        if (Array.from(this.completedLevels).length === 0) return;
        const completedLevels = Array.from(this.completedLevels)
            .sort((a, b) => a - b)
            .join();
        localStorage.setItem('completedLevels', completedLevels);
    }

    private render() {
        this.LevelController.render(this.currentLevel);
        this.HtmlController.render(this.currentLevel);
        this.TableController.render(this.currentLevel);
        this.hoverControll();
    }

    private checkAnswer() {
        const cssInputElement: HTMLInputElement = document.getElementById('css-input') as HTMLInputElement;
        const inputValue = cssInputElement.value.replace(', ', ',');
        const currentSelector = this.levels[this.currentLevel].selector;

        // if value is correct number go to level = number
        const isValueNumber = !Number.isNaN(Number(inputValue));
        if (isValueNumber && Number(inputValue) > 0 && Number(inputValue) <= this.levels.length) {
            cssInputElement.value = '';
            this.gotoLevel(Number(inputValue) - 1);
            return;
        }

        if (inputValue === currentSelector) {
            this.win();
        } else {
            this.loose();
        }
    }

    private win() {
        const cssInputElement: HTMLInputElement = document.getElementById('css-input') as HTMLInputElement;
        const strobeElements = document.querySelectorAll('.strobe');
        const checkmarkElement: HTMLDivElement = document.getElementById('level-checkmark') as HTMLDivElement;
        this.completedLevels.add(this.currentLevel);
        checkmarkElement.classList.add('completed');
        strobeElements.forEach((element) => {
            element.classList.remove('strobe');
            element.classList.add('win-game');
        });
        setTimeout(() => {
            strobeElements.forEach((element) => {
                element.classList.remove('win-game');
            });
        }, 500);
        setTimeout(() => {
            cssInputElement.value = '';
            this.next();
        }, 600);
    }

    private loose() {
        const codeElement: HTMLDivElement = document.querySelector('.code') as HTMLDivElement;
        codeElement.classList.add('loose-game');
        setTimeout(() => {
            codeElement.classList.remove('loose-game');
        }, 200);
    }

    private getTableElements() {
        const elementsArray = [];
        const currentTable = document.getElementById('table') as HTMLElement;
        const childrenArray = Array.from(currentTable.children);
        for (let i = 0; i < childrenArray.length; i += 1) {
            elementsArray.push(childrenArray[i]);
            if (childrenArray[i].hasChildNodes()) {
                const subArray = Array.from(childrenArray[i].children);
                for (let j = 0; j < subArray.length; j += 1) {
                    elementsArray.push(subArray[j]);
                }
            }
        }
        return elementsArray;
    }

    private getHtmlViewerElements() {
        const htmlViewer = document.querySelector('.language-html') as HTMLElement;
        let htmlViewerChildrenArray = Array.from(htmlViewer.children);
        htmlViewerChildrenArray = htmlViewerChildrenArray.filter((el) => el.tagName !== 'BR');
        const htmlViewerElements = htmlViewerChildrenArray.filter((el) => {
            return !el.innerHTML.startsWith('&lt;/');
        });
        return htmlViewerElements;
    }

    private hoverControll() {
        document.body.addEventListener('mouseover', (event: MouseEvent) => {
            if (event.target instanceof Element && event.target.parentElement?.closest('#table')) {
                this.TableToHTML(event);
            } else if (event.target instanceof Element && event.target.parentElement?.closest('#html-field')) {
                this.HTMLToTable(event);
            }
        });

        const htmlViewer = document.querySelector('.language-html') as HTMLElement;
        let htmlViewerChildrenArray = Array.from(htmlViewer.children);
        htmlViewerChildrenArray = htmlViewerChildrenArray.filter((el) => el.tagName !== 'BR');

        document.body.addEventListener('mouseout', (event: MouseEvent) => {
            if (event.target instanceof Element && event.target.parentElement?.closest('#table')) {
                event.target.classList.remove('data-hover');
                htmlViewerChildrenArray.forEach((tag) => {
                    tag.classList.remove('enhanced');
                });
            } else if (event.target instanceof Element && event.target.parentElement?.closest('#html-field')) {
                htmlViewerChildrenArray.forEach((tag) => {
                    tag.classList.remove('enhanced');
                });
                const childrenArray = this.getTableElements();
                childrenArray.forEach((tag) => tag.classList.remove('data-hover'));
                document.getElementById('table')?.classList.remove('data-hover');
            }
        });
    }

    private TableToHTML(event: MouseEvent) {
        if (event.target instanceof Element) {
            event.target.classList.add('data-hover');
            const childrenArray = this.getTableElements();
            const currentId = childrenArray.indexOf(event.target);
            const htmlViewer = document.querySelector('.language-html') as HTMLElement;
            let htmlViewerChildrenArray = Array.from(htmlViewer.children);
            htmlViewerChildrenArray = htmlViewerChildrenArray.filter((el) => el.tagName !== 'BR');
            const htmlViewerElements = htmlViewerChildrenArray.filter((el) => {
                return !el.innerHTML.startsWith('&lt;/');
            });

            const currentElement = htmlViewerElements[currentId + 1];
            if (currentElement.innerHTML.startsWith('&lt;') && !currentElement.innerHTML.endsWith('/&gt;')) {
                currentElement.nextElementSibling?.nextElementSibling?.classList.add('enhanced');
                currentElement.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.classList.add(
                    'enhanced'
                );
            }
            currentElement.classList.add('enhanced');
        }
    }

    private HTMLToTable(event: MouseEvent) {
        if (event.target instanceof Element) {
            const closestElement = event.target.closest('.hljs-tag') as HTMLSpanElement;
            closestElement?.classList.add('enhanced');
            if (closestElement?.innerHTML) {
                if (
                    closestElement.innerHTML.startsWith('&lt;') &&
                    !closestElement.innerHTML.startsWith('&lt;/') &&
                    !closestElement.innerHTML.endsWith('/&gt;') &&
                    !closestElement.innerHTML.includes('table')
                ) {
                    closestElement.nextElementSibling?.nextElementSibling?.classList.add('enhanced');
                    closestElement.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.classList.add(
                        'enhanced'
                    );
                }
                if (
                    closestElement.innerHTML.startsWith('&lt;/') &&
                    closestElement.innerHTML.endsWith('&gt;') &&
                    !closestElement.innerHTML.includes('div')
                ) {
                    closestElement.previousElementSibling?.previousElementSibling?.classList.add('enhanced');
                    closestElement.previousElementSibling?.previousElementSibling?.previousElementSibling?.previousElementSibling?.classList.add(
                        'enhanced'
                    );
                }
                if (closestElement.innerHTML.includes('table') || closestElement.innerHTML.includes('div')) {
                    closestElement?.classList.remove('enhanced');
                }
            }
            const currentId = this.getCurrentId(closestElement);
            const tableArray = this.getTableElements();
            if (currentId <= tableArray.length && currentId > 0) {
                tableArray[currentId - 1].classList.add('data-hover');
            }
        }
    }

    private getCurrentId(element: HTMLSpanElement) {
        const htmlViewerElements = this.getHtmlViewerElements();
        let currentId = htmlViewerElements.indexOf(element);
        if (
            element?.innerHTML &&
            currentId === -1 &&
            element.innerHTML.startsWith('&lt;/') &&
            element.innerHTML.endsWith('&gt;') &&
            !element.innerHTML.includes('div')
        ) {
            const openTag = element.previousElementSibling?.previousElementSibling as HTMLSpanElement;
            currentId = htmlViewerElements.indexOf(openTag) - 1;
        }
        return currentId;
    }

    private next() {
        if (this.currentLevel >= this.levels.length - 1) {
            this.currentLevel = this.levels.length - 1;
            this.saveCurrentLevel();
            this.render();
            return;
        }
        this.currentLevel += 1;
        this.saveCurrentLevel();
        this.render();
    }

    private prev() {
        if (this.currentLevel <= 0) {
            this.currentLevel = 0;
            this.saveCurrentLevel();
            this.render();
            return;
        }
        this.currentLevel -= 1;
        this.saveCurrentLevel();
        this.render();
    }
}
