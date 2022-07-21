import * as vscode from 'vscode';
import { ExplorerViewProvider } from "./explorer/explorerViewProvider";
import { FavprojsViewProvider } from './favprojs/favprojsViewProvider';

export class ViewProviders {
    static explorerViewProvider: ExplorerViewProvider;
    static favprojsViewProvider: FavprojsViewProvider;

    static explorerView: vscode.TreeView<any>;
    static favprojsView: vscode.TreeView<any>;

    static setViews(): void {

        ViewProviders.explorerViewProvider = new ExplorerViewProvider();

        ViewProviders.explorerView = vscode.window.createTreeView('ex-explorer-explorer', {
            treeDataProvider: ViewProviders.explorerViewProvider
        });

        ViewProviders.favprojsViewProvider = new FavprojsViewProvider();

        ViewProviders.favprojsView = vscode.window.createTreeView('ex-explorer-favprojs', {
            treeDataProvider: ViewProviders.favprojsViewProvider
        });

    }
}