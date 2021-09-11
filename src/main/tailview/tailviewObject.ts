import * as vscode from 'vscode';
import { Config } from '../config';
import { DocContentProvider } from '../docs/docContentProvider';
import { TailviewHandler } from './tailviewHandler';
const Tail = require('tail-file');

export class TailviewObject {

    tail : any;

    lines : Array<string> = [];
    lineMaxCount : number = 10;

    status: string;
    error: string = "";

    document: vscode.TextDocument|null = null; 
    documentProvider: DocContentProvider|null = null;

    constructor(
        public readonly fullpath: string,
    ) {

        this.status = "adding";        
        Config.logger.log("tail adding - " + fullpath);

        const mytail = new Tail(fullpath);

        mytail.on('error', (err: any) => { 
            this.status = "error";
            this.error = err;
            Config.logger.log(err);
            TailviewHandler.removeFromTailList(fullpath);
        });

        mytail.on('line', (line: any) => {
            Config.logger.log("tail line - "+line);
            if(this.lines.length >= this.lineMaxCount){
                this.lines.shift();
            }
            this.lines.push(line);            
            //Config.logger.log("full file - "+this.lines);
            if(this.documentProvider != null && this.document != null){
                this.documentProvider.refreshUI(this.document.uri);
            }
        });

        mytail.on('ready', (fd: any) => {
            this.status = "ready";
            Config.logger.log("tail ready - " + fullpath);
        });

        /*mytail.on('eof', (pos: any) => {
            console.log("Catched up to the last line") 
        });

        mytail.on('skip', (pos: any) => console.log("myfile.log suddenly got replaced with a large file") );

        mytail.on('secondary', (filename: any) => console.log(`myfile.log is missing. Tailing ${filename} instead`) );

        mytail.on('restart', (reason: string) => {
        if( reason == 'PRIMEFOUND' ) console.log("Now we can finally start tailing. File has appeared");
        if( reason == 'NEWPRIME' ) console.log("We will switch over to the new file now");
        if( reason == 'TRUNCATE' ) console.log("The file got smaller. I will go up and continue");
        if( reason == 'CATCHUP' ) console.log("We found a start in an earlier file and are now moving to the next one in the list");
        });*/

        mytail.start();

        this.status = "added";
        Config.logger.log("tail added - " + fullpath);

        this.tail = mytail;

        //let uri = vscode.Uri.parse("extailview:" + fullpath.replace(/.*(\\|\/)/,"") + '?fullPath=' + fullpath);
        let uri = vscode.Uri.parse("extailview:" + "TailView" + '?fullPath=' + fullpath);
        vscode.workspace.openTextDocument(uri).then( doc => {
            this.document = doc;
        });

    }

}