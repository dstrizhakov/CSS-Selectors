import { IController, IGame, ILevel } from '../types';

export class LevelController implements IController {
    private levels: ILevel[];

    private game: IGame;

    constructor(game: IGame) {
        this.game = game;
        this.levels = game.levels;
        this.menuInit();
    }

    public render(level: number) {
        this.renderInfo(level);
        this.renderLevelsList(level);
        this.renderProgress(level);
    }

    private renderInfo(currentLevel: number) {
        const levelElement: HTMLDivElement = document.getElementById('level') as HTMLDivElement;
        const levelText = `Level ${currentLevel + 1} of ${this.levels.length}`;
        levelElement.innerText = levelText;
        const storedCompletedLevels = this.getCompletedLevels();
        const checkmarkElement: HTMLDivElement = document.getElementById('level-checkmark') as HTMLDivElement;
        if (storedCompletedLevels?.includes(currentLevel)) {
            checkmarkElement.classList.add('completed');
        } else {
            checkmarkElement.classList.remove('completed');
        }
        const levelSelectorElement: HTMLDivElement = document.querySelector('.level__selector') as HTMLDivElement;
        levelSelectorElement.innerText = this.levels[currentLevel].selectorName || '';
        const levelTitleElement: HTMLDivElement = document.querySelector('.level__title') as HTMLDivElement;
        levelTitleElement.innerText = this.levels[currentLevel].helpTitle;
        const levelSyntaxElement: HTMLDivElement = document.querySelector('.level__syntax') as HTMLDivElement;
        levelSyntaxElement.innerHTML = this.levels[currentLevel].syntax;
        const levelHintElement: HTMLDivElement = document.querySelector('.level__hint') as HTMLDivElement;
        levelHintElement.innerHTML = this.levels[currentLevel].help;
        const doThisElement: HTMLDivElement = document.getElementById('doThis') as HTMLDivElement;
        doThisElement.innerText = this.levels[currentLevel].doThis;
        const levelExamplesElement: HTMLDivElement = document.querySelector('.level__examples') as HTMLDivElement;
        const { examples } = this.levels[currentLevel];

        levelExamplesElement.innerHTML = '';
        if (examples?.length) {
            const exampleTitle = document.createElement('h4');
            exampleTitle.textContent = 'Examples';
            levelExamplesElement.append(exampleTitle);
            examples?.forEach((exampleText) => {
                const currentExample = document.createElement('p');
                currentExample.innerHTML = exampleText;
                levelExamplesElement.append(currentExample);
            });
        }
    }

    private renderLevelsList(currentlevel: number) {
        const ulElement: HTMLUListElement = document.querySelector('.menu__list') as HTMLUListElement;
        ulElement.innerHTML = '';

        const storedCompletedLevels = this.getCompletedLevels();

        this.levels.forEach((level, index) => {
            const liElement = document.createElement('li');
            liElement.classList.add('menu__item');
            const linkElement = document.createElement('a');
            const checkMarkElement = document.createElement('span');
            const levelMarkElement = document.createElement('span');

            checkMarkElement.classList.add('checkmark');

            if (storedCompletedLevels && storedCompletedLevels.includes(index)) {
                checkMarkElement.classList.add('completed');
            }
            if (currentlevel === index) {
                liElement.classList.add('current');
            }

            levelMarkElement.classList.add('level-number');
            linkElement.innerHTML = level.syntax;
            linkElement.prepend(checkMarkElement, levelMarkElement);
            liElement.append(linkElement);
            levelMarkElement.innerText = (index + 1).toString();
            ulElement.append(liElement);
        });
    }

    private renderProgress(currentLevel: number) {
        const progressElement: HTMLDivElement = document.querySelector('.progress') as HTMLDivElement;
        progressElement.style.width = `${(currentLevel / (this.levels.length - 1)) * 100}%`;
    }

    private getCompletedLevels() {
        const completedLevels = localStorage.getItem('completedLevels');
        if (completedLevels === '') {
            return null;
        }
        return completedLevels?.split(',').map((item) => Number(item));
    }

    private menuInit() {
        const menu: HTMLDivElement = document.querySelector('.menu') as HTMLDivElement;
        document.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as Element;
            if (target.closest('.icon-menu')) {
                menu.classList.toggle('menu-open');
            } else if (target.closest('.menu__list li') || target.closest('.reset-progress')) {
                if (target.closest('.menu__item')) {
                    const menuList: HTMLUListElement = document.querySelector('.menu__list') as HTMLUListElement;
                    const menuListChildrenArray = Array.from(menuList.children);
                    const index = menuListChildrenArray.indexOf(target.closest('.menu__item') as HTMLLIElement);
                    this.game.gotoLevel(index);
                }
                if (target.closest('.reset-progress')) {
                    this.game.resetProgress();
                }
                menu.classList.remove('menu-open');
            }
        });
    }
}
