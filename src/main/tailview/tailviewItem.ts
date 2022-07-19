import * as vscode from 'vscode';

export class TailviewItem extends vscode.TreeItem {

    command = {
        command: 'ex-explorer.opentailfile',
        title: '',
        arguments: [
            {
                'fullpath': this.fullpath
            }
        ]
    };

    constructor(
        public readonly label: string,
        public readonly fullpath: string
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.resourceUri = vscode.Uri.parse("file://" + fullpath);
        this.tooltip = fullpath;
    }

    contextValue = 'TailFileItem';
}