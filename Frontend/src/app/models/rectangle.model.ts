import { RectangleForCreationDTO } from "../core/services/swagger-gen";

export class Rectangle implements RectangleForCreationDTO {


  public x1: number;
  public x2: number;
  public y1: number;
  public y2: number;


  public getHeigth(): number {
    return Math.abs(this.y1 - this.y2);
  }

  public getWidth(): number {
    return Math.abs(this.x1 - this.x2);
  }

  public getPerimetr() {
    return this.getHeigth() * this.getWidth()
  }

  getX(): number {
    return Math.min(this.x1, this.x2);
  }

  getY(): number {
    return Math.min(this.y1, this.y2);
  }
}
