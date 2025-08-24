import * as movieService from "./movies/index.js";
import yargs from "yargs";
import {program} from "commander";

const invokeAction = async({action, id, ...data}) => {
  switch(action) {
    case "list": 
      const allMovies = await movieService.getAllMovies();
      console.log(allMovies);
      break;
    case "getById": 
      const movieById = await movieService.getMovieById(id);
      console.log(movieById);
      break;
    case "add": 
      const addMovie = await movieService.addMovie(data);
      console.log(addMovie);
      break;
    case "updateById": 
      const updateMovie = await movieService.updateMovieById(id, data);
      console.log(updateMovie);
      break;
    case "deleteById":
      const deleteMovie = await movieService.deleteMovie(id);
      console.log(deleteMovie);
      break;
  }
};

const actionIndex = process.argv.indexOf("--action");
if (actionIndex !== -1) {
  const action = process.argv[actionIndex + 1];
  invokeAction({action});
}

// invokeAction({ action: "list" });
// invokeAction({ action: "getById", id: "550e8400-e29b-41d4-a716-446655440001" });
// invokeAction({ action: "add", title: 'Witch way', director: 'Dark world' });
// invokeAction({ action: "updateById", id: "5XE_Sg2-v-l62DyNYFjxz", title: "Witch Way" });
// invokeAction({ action: "deleteById", id: "5XE_Sg2-v-l62DyNYFjxz" });

// // yargs
// const {argv} = yargs(process.argv.slice(2));
// invokeAction(argv);

// commander
program
  .option("-a --action <type>")
  .option("-i --id <type>")
  .option("-t --title <type>")
  .option("-d --director <type>")

  program.parse()

  const options = program.opts();
  invokeAction(options);