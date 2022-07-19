import * as vscode from 'vscode';
import { Config } from './main/config';
import { ViewProviders } from './main/viewProviders';
import { ExplorerHandler } from './main/explorer/explorerHandler';
import { TailviewHandler } from './main/tailview/tailviewHandler';
import { DocContentProvider } from './main/docs/docContentProvider';

export function activate(context: vscode.ExtensionContext) {

	Config.logger.log("Starting...");

	Config.loadConfig();
	ViewProviders.setViews();
	DocContentProvider.setDocProvider();
	
	ExplorerHandler.setCommands(context);
	TailviewHandler.setCommands(context);

	Config.logger.log("Activated...");
}

export function deactivate() { }