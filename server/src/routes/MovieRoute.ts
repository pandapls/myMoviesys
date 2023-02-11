import express from 'express';
import { IMovie } from '../db/MovieSchema';
import { SearchCondition } from '../entities/SearchCondition';
import { MovieService } from '../services/MovieService';
import { ResponseHelper } from './ResponseHelper';

const router = express.Router();

router.get('/queryMovie/:id', async (req, res) => {
  try {
    console.log(req.params);
    const {id: movieId} = req.params;
    const movie = await MovieService.findById(movieId);
    ResponseHelper.sendData(movie, res);
  } catch (error) {
    ResponseHelper.sendData(null, res)
  }
})
router.get('/queryMovies', async (req, res) => {
  try {
    const query: any = {
      page: req.query?.page,
      limit: req.query?.limit, 
      key: req.query?.key,
    }
    const movies = await MovieService.find(query);
    ResponseHelper.sendPageData(movies, res);

  } catch (_) {
    ResponseHelper.sendData(null, res)
  }
})

router.post('/addMovie', async (req, res) => {
  console.log(req.body);
  const result = await MovieService.add(req.body)
  if (Array.isArray(result)) {
    ResponseHelper.sendError(result, res);
  } else {
    ResponseHelper.sendData(result, res)
  }
})

router.get('/deletMovie/:id', async (req, res) => {
  try {
    const {id: movieId} = req.params;

    const result = await MovieService.delet(movieId);
    console.log(result);
    
    ResponseHelper.sendData(result, res);

  } catch (_) {
    ResponseHelper.sendData(null, res)
  }
})

router.post('/modifyMovie', async (req, res) => {
  try {
    console.log(req.body);
    
    const {id, name, types, areas, timeLong, isHot, isComing, isClaic} = req.body
    const movie: any= {
      name,
      types,
      areas,
      timeLong,
      isHot,
      isComing,
      isClaic,
    }
    
    const result = await MovieService.updata(id, movie)
    
    if (Array.isArray(result) &&result.length > 0) {
      ResponseHelper.sendError(result, res);
    } else {
      ResponseHelper.sendData(result, res)
    }
  } catch (err) {
    ResponseHelper.sendError(err, res)
  }
})

export default router;