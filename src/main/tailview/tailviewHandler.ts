import * as vscode from 'vscode';
import { Config } from '../config';
import { ViewProviders } from '../viewProviders';
import { ThemeColor, Uri, window } from 'vscode';
import * as rimraf from 'rimraf';
import path = require('path');
import * as fs from 'fs';
import { TailviewItem } from './tailviewItem';
import { TailviewObject } from './tailviewObject';

export class TailviewHandler {

    static tailviewList : Map<string, TailviewObject> = new Map();

    static addToTailList(fullpath: string) {
        this.tailviewList.set(fullpath, new TailviewObject(fullpath));
        ViewProviders.tailviewProvider.refreshUI();
    }

    static removeFromTailList(fullpath: string) {
        let tailviewObject:TailviewObject = this.tailviewList.get(fullpath)!;
        tailviewObject.tail.stop();
        this.tailviewList.delete(fullpath);
        ViewProviders.tailviewProvider.refreshUI();
    }

    static setCommands(context: vscode.ExtensionContext) {
        
        context.subscriptions.push(vscode.commands.registerCommand('ex-explorer.stoptailfile', async (args: TailviewItem) => {
            TailviewHandler.removeFromTailList(args.fullpath);
        }));

        context.subscriptions.push(vscode.commands.registerCommand('ex-explorer.opentailfile', async (args: TailviewItem) => {
            let doc = this.tailviewList.get(args.fullpath)?.document;
            if(doc != null){
                let editor = await vscode.window.showTextDocument(doc, { preview: false });
            }else{
                Config.logger.log("tailview not ready yet");
            }
        }));
    }
}