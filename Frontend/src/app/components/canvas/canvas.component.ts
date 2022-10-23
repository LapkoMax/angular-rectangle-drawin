import { AfterContentInit, Component, ElementRef, HostListener, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Rectangle } from '../../models/rectangle.model';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
@Injectable()//allow inject this commponent
export class CanvasComponent implements AfterContentInit {
  @ViewChild('svgElem', { read: ElementRef })
  public el: ElementRef;


  ngAfterContentInit(): void {
    //setTimeout(x => {
    //  console.log("-----");
    //  console.log(this.el);

    //  this.top = this.el.nativeElement.clientTop;
    //  this.left = this.el.nativeElement.clientLeft;
    //},1000)
    
  }


  //f() {
  //  console.log(this.el);
  //  console.log(this.el.nativeElement.clientLeft);
  //  console.log(this.left);


  //}

  //public left: number;
  //public top: number;

  ////public offsetLeft = this.el.nativeElement;
  //public offsetTop: number = 0;





  @Input()
  public heigth: number = 400;
  @Input()
  public width: number = 400;


}
