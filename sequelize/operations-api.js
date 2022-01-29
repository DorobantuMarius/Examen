import { Movies, CrewMembers } from "./sync.js";


async function sequelizeAuth(sequelizeConnection) {
    try {
        await sequelizeConnection.authenticate();
        console.log("Sequelize connected to the database!");
    } catch (err) {
        console.error(
            `Error connecting to the databse using sequelize : ${err}`
        );
    }
}

async function sequelizeSync(sequelizeConnection) {
    try {
        await sequelizeConnection.sync({ force: false, alter: true });
        console.log("Sync completed!");
    } catch (err) {
        console.error(`Sync failed : ${err}`);
    }
}


async function sequelizeInit(sequelizeConnection) {
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
}



async function getMovies() {
    try {
        return await Movies.findAll();
    } catch (err) {
        console.log(err);
    }
}

async function getMovieById(movieId) {
    try {
        return await Movies.findAll({ where: { MovieId: movieId } });
    } catch (err) {
        console.log(err);
    }
}

async function createMovie(movie) {
    try {
        await Movies.create({
            Title: movie.Title,
            Date: movie.Date,
        });
    } catch (err) {
        console.log(err);
    }
}

async function updateMovie(movieId, movie) {
    try {
        const record = await Movies.findByPk(movieId);
        if (record) await record.update({
            Title: movie.Title,
            Date: movie.Date,
        });
    } catch (err) {
        console.log(err);
    }
}


async function deleteMovie(movieId) {
    try {
        const record = await Movies.findByPk(movieId);
        if (record) await record.destroy();
    } catch (err) {
        console.log(err);
    }
}




async function getCrewMembers() {
    try {
        return await CrewMembers.findAll();
    } catch (err) {
        console.log(err);
    }
}

async function getCrewMemberById(crewMemberId) {
    try {
        return await CrewMembers.findAll({ where: { CrewMemberId: crewMemberId } });
    } catch (err) {
        console.log(err);
    }
}

async function getMoviesWithCrewMemberId(crewMemberId) {
    try {
        return await Movies.findAll({
            include: [
                {
                    model: CrewMembers,
                    where: { CrewMemberId: crewMemberId }
                }
            ]
        });
    } catch (err) {
        console.log(err);
    }
}

async function getCrewMembersOfMovieId(movieId) {
    try {
        const movie = await Movies.findByPk(movieId, {
            include: [CrewMembers]
        });
        if (movie) {
            var { CrewMembers: crewMembers } = movie;
            return crewMembers;
        }
        else {
            console.log(`MovieId ${movieId} not found!`);
        }
    } catch (err) {
        console.log(err);
    }
}

async function getMoviesWithCrewMembers() {
    try {
        return await Movies.findAll({
            include: [
                {
                    model: CrewMembers,
                    as: "CrewMembers",
                }
            ]
        });
    } catch (err) {
        console.log(err);
    }
}

async function createCrewMemberForMovieId(movieId, crew_Member) {
    try {
        const record = await Movies.findByPk(movieId);
        if (record) {
            let crewMember = await CrewMembers.create({
                Name: crew_Member.Name,
                Role: crew_Member.Role,
            });
            crewMember.MovieId = record.MovieId;
            await crewMember.save();
        }
        else {
            console.log(`MovieId ${movieId} not found!`);
        }
    } catch (err) {
        console.log(err);
    }
}

async function createMoviesWithCrewMembers(movie) {
    var result = await Movies.create({
        Title: movie.Title,
        Date: movie.Date,
    });
    var { CrewMembers: crewMembers } = movie;
    crewMembers.forEach((crewMember) => {
        CrewMembers.create({
            Name: crewMember.Name,
            Role: crewMember.Role,
            MovieId: result.MovieId,
        });
    });
}

async function updateCrewMemberById(crewMemberId, crewMember) {
    try {
        const crew_Member = await CrewMembers.findByPk(crewMemberId);
        if (crew_Member) await crew_Member.update({
            Name: crewMember.Name,
            Role: crewMember.Role,
        });
    } catch (err) {
        console.log(err);
    }
}

async function updateCrewMemberOfMovieId(movieId, crewMemberId, crewMember) {
    try {
        const movie = await Movies.findByPk(movieId, {
            include: [CrewMembers],
            where: { CrewMemberId: crewMemberId }
        });
        if (movie) {
            const crew_Member = await CrewMembers.findByPk(crewMemberId);
            if (crew_Member) {
                await crew_Member.update({
                    Name: crewMember.Name,
                    Role: crewMember.Role
                });
                await crew_Member.save();
            }
            else {
                console.log(`CrewMemberId ${crewMemberId} not found!`);
            }
        }
        else {
            console.log(`MovieId ${movieId} not found!`);
        }
    } catch (err) {
        console.log(err);
    }
}

async function deleteCrewMemberById(crewMemberId) {
    try {
        const crew_Member = await CrewMembers.findByPk(crewMemberId);
        if (crew_Member) await crew_Member.destroy();
    } catch (err) {
        console.log(err);
    }
}

async function deleteCrewMemberOfMovieId(movieId, crewMemberId) {
    try {
        const movie = await Movies.findByPk(movieId, {
            include: [CrewMembers],
            where: { CrewMemberId: crewMemberId }
        });
        if (movie) {
            const crew_Member = await CrewMembers.findByPk(crewMemberId);
            if (crew_Member) {
                await crew_Member.destroy();
            }
            else {
                console.log(`CrewMemberId ${crewMemberId} not found!`);
            }
        }
        else {
            console.log(`MovieId ${movieId} not found!`);
        }
    } catch (err) {
        console.log(err);
    }
}


export const sequelizeOperationsAPI = {
    init: sequelizeInit,
    getMovies: getMovies,
    getMovieById: getMovieById,

    createMovie: createMovie,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie,

    getCrewMembers: getCrewMembers,
    getMoviesWithCrewMembers: getMoviesWithCrewMembers,
    createMoviesWithCrewMembers: createMoviesWithCrewMembers,

    getMoviesWithCrewMemberId: getMoviesWithCrewMemberId,
    createCrewMemberForMovieId: createCrewMemberForMovieId,

    getCrewMemberById: getCrewMemberById,
    updateCrewMemberById: updateCrewMemberById,
    deleteCrewMemberById: deleteCrewMemberById,

    getCrewMembersOfMovieId: getCrewMembersOfMovieId,
    updateCrewMemberOfMovieId: updateCrewMemberOfMovieId,
    deleteCrewMemberOfMovieId: deleteCrewMemberOfMovieId,

};