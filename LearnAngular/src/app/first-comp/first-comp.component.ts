import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-comp',
  templateUrl: './first-comp.component.html',
  styleUrls: ['./first-comp.component.scss']
})
export class FirstCompComponent implements OnInit {
selectedText:String;
textInput:String;
  constructor() { }

  ngOnInit() {
  }
  userInput: string;

  onClickMe(){
    
    this.selectedText =this.textInput ;
    console.log(this.textInput);
  } 
}
