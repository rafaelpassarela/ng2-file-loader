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
3. Use the HTML tag `<filereader [enabled]="true" [caption]="locale.selectFile" (onCallback)="doReadFile($event)"></filereader>`  
4. Create your callback function to handle the file content on your .ts file controller .ts
```
export class TestComponent {
    private data: string;

    ngOnInit() {
        this.data = '';
    }

    doReadFile($event: any) {
        this.data = $event;
    }
}
```
## Component Atributes
- **enabled**: *Boolean* default *true* -> if the button is enabled or not, useful for readonly forms ;)  
- **caption**: *String* default *Load File* -> is the button label/caption/text  
- **readMode**: *String* default *text* -> identifies the method for the file read, valid values are:
     - *text*:  read the contents of the file as a text string.  
     - *data*:  the data as a URL representing the file's data as a base64 encoded string (like images)  
     - *array*: the result attribute contains an ArrayBuffer representing the file's data.  
- **onCallback**: *EventEmitter<any>* default *undefined* function called after the file load.
- **onValidate**: *function (file : File) : boolean* default *undefined* function used to validate the file before the reading. This param **MUST BE** an arrow function.

![arrow.func](https://cloud.githubusercontent.com/assets/13123625/23314257/f01675ce-fa9f-11e6-90e5-ab6c4994813a.PNG)

#### My Sample Class
```
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'my-demo-comp',
    template: `
	
	<filereader [caption]="'Select File'" [readMode]="text" [enabled]="true" [onValidate]="doValidateFile" (onCallback)="doLoadReadFile($event)"></filereader>
	<br>
	<hr> Filename: [{{fileName}}]
	<hr> Data: [{{data}}]
	`
})

export class ResumeEditComponent {
    private fileName: string;
    private data: string;
    private doValidateFile = (file: File): boolean => {
        let regEx = /[^.]+$/.exec(file.name);
        let valid = regEx[0].toUpperCase() == 'JSON';
        if (valid) {
            this.fileName = file.name;
        } else {
            alert("This file is not a .Json file. Sorry!");
        }
        return valid;
    };

    constructor(private _titleService: Title) {

    }

    ngOnInit() {
        this._titleService.setTitle('My Sample Component Demo');
    }

    doLoadReadFile($event: any) {
        this.data = $event;
    }

}
```

> Rafael Passarela
