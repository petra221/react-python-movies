import './App.css';
import {useEffect, useState} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);

    // function handleAddMovie(movie) {
    //     setMovies([...movies, movie]);
    //     setAddingMovie(false);
    // }
    // async zapytania ktore pozwala na event driven - czeka ale robi cos na reakcji
                                                    //// testuj ponizej z http://localhost:8000/movies << zobacz bledy | CORS error | czyli musi byc 8000 -> 3000 -> przegladarka
    async function handleAddMovie(movie) {          ///// f12 dodaj - zadanie idzie do 3000/movies czyli do frontendu! 30
        const response = await fetch('/movies', {   //fetch globalna w przegladarkach // andpoint movies
          method: 'POST',                           // tworzymy film wiec metoda post
          body: JSON.stringify(movie),              // payload czyli tresc  json z stringyfy przesylamy movie
          headers: { 'Content-Type': 'application/json' } // dodajemy temu ze to jest jsonem aby py sobie z tym poradzil / t ojest pospolita metoda wiec frontend nie determinuje co jest nabackendzie i na odwrot
        });
      

        if (response.ok) {  //server odpowiada z responsem na ok, // moment przerwy w await mozna wstawic animacje czekania/ladowania
          setMovies([...movies, movie]);
          setAddingMovie(false);
        }
      }

// hook use effect <= udeEffect / read / zrob testy bez ponizszego hooka na f12 na chromie
//najpierw powinien byc stan a pozniej hooki ale to dobre praktyki. najwazniejsze aby deklaracje i resszta byly przed return :)
// przeczytaj o double-invoking ze strony zadania! dlaczego renderuje to 2 razy...

      useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`/movies`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies(); // funkcja wywpołana od razu po deklaracji
    }, []);  /// ta tablica - za kazdym razem jak zmieni sie identyfikator komponentu i tu bedzie stan komponentu wiec jesli stan sie zmieni to wtedy wyrenderuje. wiec pusta tablica jest po to aby sprawdzac zmiane stanu.. poczytaj i wspomoz sie chatemgpt
    

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              onDeleteMovie={(movie) => setMovies(movies.filter(m => m !== movie))}
                />}
            {addingMovie
                ? <MovieForm onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movie"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
        </div>
    );
}

export default App;
