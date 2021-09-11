import { resolve } from 'path';
import * as vscode from 'vscode';
import { Config } from '../config';
import { TailviewHandler } from '../tailview/tailviewHandler';
var debounce = require('debounce');

export class DocContentProvider implements vscode.TextDocumentContentProvider {

    static docContentProvider: vscode.TextDocumentContentProvider;
    static setDocProvider() {
        DocContentProvider.docContentProvider = new DocContentProvider();
        vscode.workspace.registerTextDocumentContentProvider("extailview", DocContentProvider.docContentProvider);
    }

    onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    onDidChange = this.onDidChangeEmitter.event;
    lastRefresh : number = 0;
    needToRefresh : boolean = false;

    debfn : function | null = null;
    

    query(queryString: string, key: string): string {
        const queries = queryString.split("&");
        for (var i = 0; i < queries.length; i++) {
            const indexPair = queries[i].split("=");
            const queryKey = decodeURIComponent(indexPair[0]);
            const queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : "");
            if (queryKey === key) {
                return queryValue;
            }
        }
        return '';
    }

    async provideTextDocumentContent(uri: vscode.Uri): Promise<string> {
        return new Promise((resolve) => {
            let fullPath = this.query(uri.query, 'fullPath');
            let tailviewObject = TailviewHandler.tailviewList.get(fullPath);
            if(tailviewObject != null){
                tailviewObject.documentProvider = this;
                let ret = tailviewObject.lines.join("\n");
                Config.logger.log("Sending - " + ret);
                resolve(ret);
            }else{
                resolve("Invalid Request");
            }
        });        
    }

    refreshUI(uri: vscode.Uri) {
        if(this.debfn == null) {
            this.debfn = debounce(function(){
                self.onDidChangeEmitter.fire(uri);
            }, 1000);
        }
        
        newfn();
    }    
    
};