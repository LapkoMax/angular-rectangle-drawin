import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RectangleHttpService } from '../../core/services/rectangleHttpService/rectangle-http.service';
import { RectangleForCreationDTO } from '../../core/services/swagger-gen';
import { Rectangle } from '../../models/rectangle.model';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {

  //@ViewChild('canvas', { read: CanvasComponent })
  //public canvas: CanvasComponent;

  constructor(private rectangleHttpService: RectangleHttpService) { }
  public rectangle: Rectangle = new Rectangle();

  ngOnInit(): void {
    //get rectangle from backend
    this.rectangleHttpService.getRectangle().subscribe(res => {
      console.log(res);//remove
      this.rectangle = res as Rectangle;
    },
      err => {
       // alert(err.message);
      });
  }

  public yResize: number;
  public xResize: number

  public perimetr: number;


  public canvasHeigth: number = 400
  public canvasWidth: number = 400;

  public isEdited: boolean;
  public isRectangleCreated: boolean;





  @HostListener('document:mousedown', ['$event'])
  public MouseDownEvent(event: any) {

    this.isEdited = true;

    if (!this.isRectangleCreated) {
      this.rectangle.x1 =event.clientX;
      this.rectangle.y1 =event.clientY;
      this.rectangle.x2 =event.clientX;
      this.rectangle.y1 =event.clientY;
    }
    else {
      this.xResize =event.clientX;
      this.yResize =event.clientY;
    }
  }
  

  @HostListener("document:mouseup",["($event)"])
  public MouseUpEvent(event: any) {
    console.log("up");
    this.isRectangleCreated = true;
    this.isEdited = false;
    //save rectangle
    this.rectangleHttpService.saveRectangle(this.rectangle).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    this.perimetr = this.rectangle.getPerimetr();
    
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: any) {
    const invisible_border = 20;
    //console.log("left"+this.canvas.left);

    //check create or resize
    if (this.isEdited)
      if (!this.isRectangleCreated) {
        if (event.clientX + invisible_border < this.canvasHeigth && event.clientX - invisible_border > 0)
          this.rectangle.x2 = event.clientX;
        if (event.clientY + invisible_border < this.canvasWidth && event.clientY - invisible_border > 0)
          this.rectangle.y2 = event.clientY;
      }
      else {
        const speed = 1;
        const xChange = (this.xResize - event.clientX) / speed;
        const yChange = (this.yResize - event.clientY) / speed;

        let toushedResizePoint = 0;
        //check touched point
        if (Math.abs(this.rectangle.x2 - event.clientX) < 20 && Math.abs(this.rectangle.y2 - event.clientY) < 20) {
          toushedResizePoint = 1;
        }
        else if (Math.abs(this.rectangle.x1 - event.clientX) < 20 && Math.abs(this.rectangle.y1 - event.clientY) < 20) {
        toushedResizePoint = 2;
        }
        else if (Math.abs(this.rectangle.x1 - event.clientX) < 20 && Math.abs(this.rectangle.y2 - event.clientY) < 20) {
            toushedResizePoint = 3;
        }
        else if (Math.abs(this.rectangle.x2 - event.clientX) < 20 && Math.abs(this.rectangle.y1 - event.clientY) < 20) {
                toushedResizePoint = 4;
        }

        //resize 
        switch (toushedResizePoint) {
          case 1:
            if (
              this.rectangle.x2 - xChange + invisible_border < this.canvasHeigth &&
              this.rectangle.x2 - xChange - invisible_border > 0
            )
              this.rectangle.x2 = this.rectangle.x2 - xChange;

            if (
              this.rectangle.y2 - yChange + invisible_border < this.canvasWidth &&
              this.rectangle.y2 - yChange - invisible_border > 0
            )
              this.rectangle.y2 = this.rectangle.y2 - yChange;

            break;
          case 2:
            if (
              this.rectangle.x1 - xChange + invisible_border < this.canvasHeigth &&
              this.rectangle.x1 - xChange - invisible_border > 0
            )
              this.rectangle.x1 = this.rectangle.x1 - xChange;

            if (
              this.rectangle.y1 - yChange + invisible_border < this.canvasWidth &&
              this.rectangle.y1 - yChange - invisible_border > 0
            )
              this.rectangle.y1 = this.rectangle.y1 - yChange;

            break;
          case 3:
            if (
              this.rectangle.x1 - xChange + invisible_border < this.canvasHeigth &&
              this.rectangle.x1 - xChange - invisible_border > 0
            )
              this.rectangle.x1 = this.rectangle.x1 - xChange;

            if (
              this.rectangle.y2 - yChange + invisible_border < this.canvasWidth &&
              this.rectangle.y2 - yChange - invisible_border > 0
            )
              this.rectangle.y2 = this.rectangle.y2 - yChange;

            break;
          case 4:
            if (
              this.rectangle.x2 - xChange + invisible_border < this.canvasHeigth &&
              this.rectangle.x2 - xChange - invisible_border > 0
            )
              this.rectangle.x2 = this.rectangle.x2 - xChange;

            if (
              this.rectangle.y1 - yChange + invisible_border < this.canvasWidth &&
              this.rectangle.y1 - yChange - invisible_border > 0
            )
              this.rectangle.y1 = this.rectangle.y1 - yChange;
            break;
        }

        this.xResize = event.clientX;
        this.yResize = event.clientY;
      }
  }


}
