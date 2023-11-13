export interface ILevel {
    helpTitle: string;
    selectorName?: string;
    doThis: string;
    selector: string;
    syntax: string;
    help: string;
    examples?: string[];
    boardMarkup: string;
}

export interface IController {
    render(level: number): void;
}

export interface IGame {
    levels: ILevel[];
    gotoLevel(level: number): void;
    resetProgress(): void;
}
