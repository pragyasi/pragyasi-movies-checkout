import './App.css';
import {useState} from 'react';
import MovieList  from './movieList';

function App() {
  const [searchString , setSearchString] = useState('');
  return (
    <div className="App">
      
    <div className='search-field items'>
    <input className ='text-search' type='text' placeholder='Search ...' onKeyUp= {(e)=>{
      const str = e.target.value;
      setSearchString(str)
    }}/>
    </div>
    <div className='movie-list-field items'>
    <MovieList searchquery={searchString} />
    </div>
    </div>)

}

export default App;
