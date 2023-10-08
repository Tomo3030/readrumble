import { Injectable } from '@angular/core';
import { teamMap } from '../img-maps/team-imgs';
@Injectable({
  providedIn: 'root',
})
export class ImgMapService {
  constructor() {}
  private teamBaseUrl = './assets/teams/';
  getTeamImgUrl(id: string) {
    return `${this.teamBaseUrl}${teamMap[id]}`;
  }
}
