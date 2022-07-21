import * as vscode from 'vscode';
import { Uri } from 'vscode';

export interface FavProjGroup {
    name : string,
    projs : Array<FavProj>
}

export interface FavProj {
    name : string,
    path : string
}

export class FavProjGroupItem extends vscode.TreeItem {

    constructor(
        public readonly label: string,
        public readonly projs: Array<FavProj>
    ) {
        super(label, vscode.TreeItemCollapsibleState.Expanded);
    }

}

export class FavProjItem extends vscode.TreeItem {

    command = {
        command: 'vscode.openFolder',
        title: '',
        arguments: [
            Uri.file(this.path),
            { 'forceNewWindow': true}
        ]
    };

    constructor(
        public readonly label: string,
        public readonly path: string
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.description = path;
    }

}