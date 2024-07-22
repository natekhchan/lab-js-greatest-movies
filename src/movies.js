// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(movie => movie.director);
}

function getUniqueDirectors(moviesArray) {
  const allDirectors = getAllDirectors(moviesArray);
  return [...new Set(allDirectors)];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter(movie => 
      movie.director === 'Steven Spielberg' && 
      movie.genre.includes('Drama')
    ).length;
}


// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) return 0;

  const totalScore = moviesArray.reduce((accumulator, movie) => {
    return accumulator + (movie.score || 0);
  }, 0);

  const averageScore = totalScore / moviesArray.length;
  return Number(averageScore.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(movie => movie.genre.includes('Drama'));
  
  if (dramaMovies.length === 0) return 0;

  const totalScore = dramaMovies.reduce((sum, movie) => sum + movie.score, 0);
  const averageScore = totalScore / dramaMovies.length;
  
  return Number(averageScore.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  // Create a copy of the array to avoid mutating the original array
  const moviesCopy = [...moviesArray];

// Sort the copied array
  moviesCopy.sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });

  return moviesCopy;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return moviesArray
    .map(movie => movie.title)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(movie => {
    const duration = movie.duration;
    let totalMinutes = 0;

    if (typeof duration === 'string') {
      const hours = duration.match(/(\d+)\s*h/);
      const minutes = duration.match(/(\d+)\s*min/);

      if (hours) totalMinutes += parseInt(hours[1]) * 60;
      if (minutes) totalMinutes += parseInt(minutes[1]);
    } else if (typeof duration === 'number') {
      totalMinutes = duration;
    }

    return {
      ...movie,
      duration: totalMinutes
    };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if (movies.length === 0) {
    return null;
  }

  const yearScores = {};

  // Group movies by year and calculate total score
  movies.forEach(movie => {
    if (!yearScores[movie.year]) {
      yearScores[movie.year] = { total: 0, count: 0 };
    }
    yearScores[movie.year].total += movie.score;
    yearScores[movie.year].count++;
  });

  let bestYear = null;
  let bestAvg = -1;

  // Calculate average score for each year and find the best
  for (const year in yearScores) {
    const avg = yearScores[year].total / yearScores[year].count;
    if (avg > bestAvg) {
      bestAvg = avg;
      bestYear = year;
    } else if (avg === bestAvg && parseInt(year) < parseInt(bestYear)) {
      // If there's a tie, choose the earlier year
      bestYear = year;
    }
  }

  // Format the average score to one decimal place without trailing zeros
  const formattedAvg = bestAvg.toFixed(1).replace(/\.0$/, '');

  return `The best year was ${bestYear} with an average score of ${formattedAvg}`;
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
