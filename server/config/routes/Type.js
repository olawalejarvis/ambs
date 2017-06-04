import express from 'express';
import { Type } from '../../app/controllers';
import { Authorize } from '../../app/middlewares';

const TypeRoute = express.Router();

TypeRoute.route('/')
  .post(Authorize.verifyToken, Type.create)
  .get(Authorize.verifyToken, Type.all);

TypeRoute.route('/:id')
  .put(Authorize.verifyToken, Type.edit)
  .delete(Authorize.verifyToken, Type.delete)
  .get(Authorize.verifyToken, Type.get);

TypeRoute.get('/:id/artists', Type.fetchAllArtistsWithAType);

TypeRoute.get('/:id/songs', Type.fetchAllSongsWithAType);

TypeRoute.get('/:id/categories', Type.fetchAllCategoriesWithAType);

export default TypeRoute;
