import * as vscode from 'vscode';
import { Config } from '../config';
import * as fs from 'fs';
import { TailviewItem } from './tailviewItem';
import { TailviewHandler } from './tailviewHandler';

export class TailviewProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined> = new vscode.EventEmitter<vscode.TreeItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined> = this._onDidChangeTreeData.event;

    getTreeItem(element: any): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: any): vscode.ProviderResult<any[]> {
        if (!element) {
            let retArr: Array<TailviewItem> = [];
            TailviewHandler.tailviewList.forEach(item => {
                let fullpath = item.fullpath;
                let name = fullpath.replace(/.*(\\|\/)/,"");
                retArr.push(new TailviewItem(name, fullpath));
            });
            return retArr;
        }
    }
    refreshUI() {
        this._onDidChangeTreeData.fire(undefined);
    }    
}