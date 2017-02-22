# ng2-file-reader
This is a simple component for TypeScript/Angular2 that allow the read of a file selected by the user, in the client side, without submit or additional requests.

## Why?
I was sitting at my desk, doing my site in Typescript (by the way is <a href="http://mrrafael.ca/" target="_blank">mrrafael.ca</a>), when I came across a situation: loading and editing a JSON file, without sending it to the server, there, on the client side itself. Upload, edit and download again, quickly and without much delay.  

To my surprise, I found something, but not the way I wanted it. I got what I found, I changed it, I changed that and banng!
A component for TypeScript (I know, one more :grimacing: ) has come up for use with Angular2.  


## How to Use
1. Clone or download
2. Add to your project editing `app.module.ts`  
`import { FileReaderComponent } from './common/file-reader/file.reader.component';`
![app.module](https://cloud.githubusercontent.com/assets/13123625/23232537/5ad3f0a2-f92a-11e6-88b0-34c587e81bdc.png)  
3. Use the HTML tag `<filereader [enabled]="true" [caption]="locale.selectFile" (onCallback)="doLoadReadFile($event)"></filereader>`  
4. Create your callback function to handle the file content on your .ts file controller .ts
```
export class TestComponent {
    private data: string;

    ngOnInit() {
        this.data = '';
    }

    doLoadReadFile($event: any) {
        this.data = $event;
    }
}
```



> Rafael Passarela
