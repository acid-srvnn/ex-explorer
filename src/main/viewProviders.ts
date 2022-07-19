import * as vscode from 'vscode';
import { ExplorerViewProvider } from "./explorer/explorerViewProvider";
import { TailviewProvider } from './tailview/tailviewProvider';

export class ViewProviders {
    static explorerViewProvider: ExplorerViewProvider;
    static tailviewProvider: TailviewProvider;

    static explorerView: vscode.TreeView<any>;
    static tailviewView: vscode.TreeView<any>;

    static setViews(): void {

        ViewProviders.explorerViewProvider = new ExplorerViewProvider();

        ViewProviders.explorerView = vscode.window.createTreeView('ex-explorer-explorer', {
            treeDataProvider: ViewProviders.explorerViewProvider
        });

        ViewProviders.tailviewProvider = new TailviewProvider();

        ViewProviders.tailviewView = vscode.window.createTreeView('ex-explorer-tailview', {
            treeDataProvider: ViewProviders.tailviewProvider
        });

    }
}