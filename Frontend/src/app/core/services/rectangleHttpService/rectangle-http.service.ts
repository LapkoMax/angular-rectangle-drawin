import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { backendDomain } from '../../../../../env';
import { Configuration } from '../swagger-gen';
import { ApiService } from '../swagger-gen/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RectangleHttpService extends ApiService {

  public override configuration = new Configuration();

  constructor(
    override httpClient: HttpClient,
    @Optional() configuration: Configuration) {
    super(httpClient, backendDomain, configuration);
  }
}
