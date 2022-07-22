import * as vscode from 'vscode';
import { Config } from '../config';
import { FavProj, FavProjGroup, FavProjGroupItem, FavProjItem } from './favprojModels';

export class FavprojsViewProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined> = new vscode.EventEmitter<vscode.TreeItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined> = this._onDidChangeTreeData.event;

    getTreeItem(element: any): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: any): vscode.ProviderResult<any[]> {
        if (!element) {
            let retArr: Array<FavProjGroupItem> = [];
            let confValue:Array<FavProjGroup> = Config.get_conf_favprojs();
            for(var i=0;i<confValue.length;i++){
                retArr.push(new FavProjGroupItem(confValue[i].name, confValue[i].projs));
            }
            return retArr;
        } else {
            let retArr: Array<FavProjItem> = [];
            for(var i=0;i<element.projs.length;i++){
                retArr.push(new FavProjItem(element.projs[i].name,element.projs[i].path));
            }
            return retArr;
        }
    }
    refreshUI() {
        this._onDidChangeTreeData.fire(undefined);
    }
}