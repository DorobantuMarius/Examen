import "./sync.js";
import { router, server } from "../server-init.js";
import { sequelizeOperationsAPI } from "./operations-api.js";




router
  .route("/sequelize/movies")
  .get(async function getSequelizeMovies(_, res) {
    const result = await sequelizeOperationsAPI.getMovies();
    res.status(200).json(result);
  });


router
  .route("/sequelize/movies/:movieId")
  .get(async function getMovieById(req, res) {
    const movieId = +req.params.movieId;
    var result = await sequelizeOperationsAPI.getMovieById(movieId);
    res.status(200).json(result);
  });


router
  .route("/sequelize/movies")
  .post(async function createMovie({ body }, res) {
    try {
      if (!Object.keys(body).length) {
        res.status(400).json({ message: "Body missing!!!" });
      }
      else {
        await sequelizeOperationsAPI.createMovie(body);
        res.status(200).json("Succes!");
      }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });


router
  .route("/sequelize/movies/:movieId")
  .put(async function updateUser({ params: { movieId }, body }, res) {
    try {
      if (!Object.keys(body).length) {
        res.status(400).json({ message: "Body missing!!!" });
      }
      else {
        await sequelizeOperationsAPI.updateMovie(+movieId, body);
        res.status(200).json("Successfully updated!");
      }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });


router
  .route("/sequelize/movies/:movieId")
  .delete(async function deleteMovie({ params: { movieId } }, res) {
    try {
      await sequelizeOperationsAPI.deleteMovie(+movieId);
      res.status(200).json("Succes!");
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });





router
  .route("/sequelize/crewMembers")
  .get(async function getSequelizeCrewMembers(_, res) {
    const result = await sequelizeOperationsAPI.getCrewMembers();
    res.status(200).json(result);
  });


router
  .route("/sequelize/crewMembers/:crewMemberId")
  .get(async function getCrewMemberById(req, res) {
    const crewMemberId = +req.params.crewMemberId;
    var result = await sequelizeOperationsAPI.getCrewMemberById(crewMemberId);
    res.status(200).json(result);
  });


router
  .route("/sequelize/movies/crewMembers/:crewMemberId")
  .get(async function getMovieWithCrewMemberId({ params: { crewMemberId } }, res) {
    const result = await sequelizeOperationsAPI.getMovieWithCrewMemberId(crewMemberId);
    res.status(200).json(result);
  });


router
  .route("/sequelize/movies/:movieId/crewMembers")
  .get(async function getCrewMembersOfMovieId({ params: { movieId } }, res) {
    const result = await sequelizeOperationsAPI.getCrewMembersOfMovieId(movieId);
    res.status(200).json(result);
  });


router
  .route("/sequelize/moviesWithCrewMembers")
  .get(async function getMoviesWithCrewMembers(_, res) {
    var result = await sequelizeOperationsAPI.getMoviesWithCrewMembers();
    res.status(200).json(result);
  });



router
  .route("/sequelize/movies/:movieId/crewMembers")
  .post(async function createCrewmMemberForMovieId({ params: { movieId }, body }, res) {
    try {
      if (!Object.keys(body).length) {
        res.status(404).json({ message: "Body missing!!!" });
      }
      else {
        await sequelizeOperationsAPI.createCrewMemberForMovieId(+movieId, body);
        res.status(200).json("Successfully created!");
      }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });



router.route("/sequelize/moviesWithCrewMembers").post(async ({ body }, res) => {
  try {
    await sequelizeOperationsAPI.createMoviesWithCrewMembers(body);
    res.status(200).json("Successfully created!");
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
});


router
  .route("/sequelize/crewMembers/:crewMemberId")
  .put(async function updateCrewMemberById({ params: { crewMemberId }, body }, res) {
    try {
      if (!Object.keys(body).length) {
        res.status(404).json({ message: "Body missing!!!" });
      }
      else {
        await sequelizeOperationsAPI.updateCrewMemberById(+crewMemberId, body);
        res.status(200).json("Successfully updated!");
      }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });


router
  .route("/sequelize/movies/:movieId/crewMembers/:crewMemberId")
  .put(async function updateCrewMemberOfMovieId({ params: { movieId, crewMemberId }, body }, res) {
    try {
      if (!Object.keys(body).length) {
        res.status(404).json({ message: "Body is missing!!!" });
      }
      else {
        await sequelizeOperationsAPI.updateCrewMemberOfMovieId(+movieId, +crewMemberId, body);
        res.status(200).json("Successfully updated!");
      }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });

router
  .route("/sequelize/crewMembers/:crewMemberId")
  .delete(async function deleteCrewMemberById({ params: { crewMemberId } }, res) {
    try {
      await sequelizeOperationsAPI.deleteCrewMemberById(+crewMemberId);
      res.status(200).json("Successfully deleted!");
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });


router
  .route("/sequelize/movies/:movieId/crewMembers/:crewMemberId")
  .delete(async function deleteCrewMemberOfMovieId({ params: { movieId, crewMemberId } }, res) {
    try {
      await sequelizeOperationsAPI.deleteCrewMemberOfMovieId(+movieId, +crewMemberId);
      res.status(200).json("Successfully deleted!");
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });

