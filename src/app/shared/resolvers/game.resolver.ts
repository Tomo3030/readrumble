import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GameDataAccessService } from 'src/app/game/services/game-data-access.service';

export const gameResolver: ResolveFn<boolean> = (route, state) => {
  // const classroomId = route.paramMap.get('classroomId');
  // const gameId = route.paramMap.get('gameId');
  // if (!classroomId || !gameId) throw new Error('Route data not available');
  // const dataAccess = inject(GameDataAccessService);
  // return dataAccess.initGameDataAccess(classroomId, gameId);
  return true;
};
