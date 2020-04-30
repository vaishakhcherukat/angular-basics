import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-second-comp',
  templateUrl: './second-comp.component.html',
  styleUrls: ['./second-comp.component.scss']
})
export class SecondCompComponent implements OnInit {
@Input()
textInput :String
  constructor() { }

  ngOnInit() {
  }

}
