import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RectangleHttpService } from '../../core/services/rectangleHttpService/rectangle-http.service';
import { RectangleForCreationDTO } from '../../core/services/swagger-gen';
import { Rectangle } from '../../models/rectangle.model';
import { CanvasComponent } from '../canvas/canvas.component';
import { fromEvent, Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements AfterViewInit, OnDestroy {

  constructor(private rectangleHttpService: RectangleHttpService,private toastr:ToastrService) {
    this.rectangleHttpService.getRectangle().subscribe(res => {
      let resp = res as Rectangle;
      this.rectangle.x1 = resp.x1;
      this.rectangle.x2 = resp.x2;
      this.rectangle.y1 = resp.y1;
      this.rectangle.y2 = resp.y2;
      this.isRectangleCreated = true;
      this.toastr.success('Data loaded', 'info');
    },
      err => {
        this.toastr.error('Data load exception', 'Error');
      }); 
  }
  ngAfterViewInit(): void {
    fromEvent(document, "mousedown").pipe(takeUntil(this.destroy$)).subscribe(res => this.mouseDownEvent(res))
    fromEvent(document, "mouseup").pipe(takeUntil(this.destroy$)).subscribe(res => this.mouseUpEvent(res))
    fromEvent(document, "mousemove").pipe(takeUntil(this.destroy$)).subscribe(res => this.mouseMoveEvent(res))
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  public rectangle: Rectangle = new Rectangle();
  public rectangleCopy: Rectangle;

  public yResize: number;
  public xResize: number

  public perimetr: number;

  public canvasHeigth: number = 600
  public canvasWidth: number = 600;

  public isEdited: boolean;
  public isRectangleCreated: boolean = false;

  private mouseDownEvent(event: any) {

    this.rectangleCopy = structuredClone(this.rectangle)
    this.isEdited = true;

    if (!this.isRectangleCreated && event.clientX < this.canvasHeigth && event.clientX < this.canvasWidth) {
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

  private mouseUpEvent(event: any) {
    console.log(this.isRectangleCreated);
    this.isEdited = false;
    if (!Rectangle.isRectanglesEqual(this.rectangle, new Rectangle())) {
      this.isRectangleCreated = true;
      console.log(this.rectangle);
      console.log(new Rectangle());
    }
    else
      this.isRectangleCreated = false;
    //save rectangle
    if (!Rectangle.isRectanglesEqual(this.rectangle, this.rectangleCopy)) {
      this.rectangleHttpService.saveRectangle(this.rectangle).subscribe(res => {
        this.toastr.success('Data saved', 'Info');
      }, err => {
        this.toastr.error('Data save error', 'Error');
      });
      this.perimetr = this.rectangle.getPerimetr();
    }
  }

  private mouseMoveEvent(event: any) {
    const invisibleBorder = 10;
    //check create or resize
    if (this.isEdited)
      if (!this.isRectangleCreated) {
        if (event.clientX + invisibleBorder < this.canvasHeigth && event.clientX - invisibleBorder > 0)
          this.rectangle.x2 = event.clientX;
        if (event.clientY + invisibleBorder < this.canvasWidth && event.clientY - invisibleBorder > 0)
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
              this.rectangle.x2 - xChange + invisibleBorder < this.canvasHeigth &&
              this.rectangle.x2 - xChange - invisibleBorder > 0
            )
              this.rectangle.x2 = this.rectangle.x2 - xChange;

            if (
              this.rectangle.y2 - yChange + invisibleBorder < this.canvasWidth &&
              this.rectangle.y2 - yChange - invisibleBorder > 0
            )
              this.rectangle.y2 = this.rectangle.y2 - yChange;

            break;
          case 2:
            if (
              this.rectangle.x1 - xChange + invisibleBorder < this.canvasHeigth &&
              this.rectangle.x1 - xChange - invisibleBorder > 0
            )
              this.rectangle.x1 = this.rectangle.x1 - xChange;

            if (
              this.rectangle.y1 - yChange + invisibleBorder < this.canvasWidth &&
              this.rectangle.y1 - yChange - invisibleBorder > 0
            )
              this.rectangle.y1 = this.rectangle.y1 - yChange;

            break;
          case 3:
            if (
              this.rectangle.x1 - xChange + invisibleBorder < this.canvasHeigth &&
              this.rectangle.x1 - xChange - invisibleBorder > 0
            )
              this.rectangle.x1 = this.rectangle.x1 - xChange;

            if (
              this.rectangle.y2 - yChange + invisibleBorder < this.canvasWidth &&
              this.rectangle.y2 - yChange - invisibleBorder > 0
            )
              this.rectangle.y2 = this.rectangle.y2 - yChange;

            break;
          case 4:
            if (
              this.rectangle.x2 - xChange + invisibleBorder < this.canvasHeigth &&
              this.rectangle.x2 - xChange - invisibleBorder > 0
            )
              this.rectangle.x2 = this.rectangle.x2 - xChange;

            if (
              this.rectangle.y1 - yChange + invisibleBorder < this.canvasWidth &&
              this.rectangle.y1 - yChange - invisibleBorder > 0
            )
              this.rectangle.y1 = this.rectangle.y1 - yChange;
            break;
        }

        this.xResize = event.clientX;
        this.yResize = event.clientY;
      }
  }
}
