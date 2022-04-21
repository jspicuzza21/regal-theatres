import { useEffect, useState } from 'react';
import axios from 'axios';
import './posters.css';

function Posters() {
  const [posters, setPosters] = useState("");
  const [displayNum, setDisplayNum] = useState(10);


  useEffect(() => {
    axios.get('nowPlaying.json')
    .then(({data}) => {
      setPosters(data.MovieFeedEntries)
    })
  }, []);

  const handleMoreClick = () => {
    setDisplayNum(displayNum + 5);
  }

  const handleLessClick = () => {
    setDisplayNum(displayNum - 5);
  }

  return (
    <div className="posters">
      <div className="posters-container">
        {posters.length > 0 &&
          posters.slice(0,displayNum).map((poster) => {
            let imgUrl = "";
            for (let i = 0; i < poster.Movie.Media.length; i++){
                if (poster.Movie.Media[i].SubType === "TV_SmallPosterImage"){
                  imgUrl = poster.Movie.Media[i].SecureUrl;
                  break;
                }
            } 
            return (
              <div key={poster.Order} className="poster">
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={imgUrl} alt="Click here to visit Everything Everywhere All at Once movie page" />
                    </div>
                    <div className="flip-card-back">
                      <div className="card-text">
                        <h2>{poster.Movie.Title}</h2>
                        <p>{poster.Movie.Description}</p>
                        <p><strong>Duration: </strong>{poster.Movie.Duration} minutes</p>
                        <p><strong>Rating: </strong>{poster.Movie.Rating} </p>
                        <p><strong>Genre: </strong>{poster.Movie.GenrePrimary} </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p>{poster.Movie.Title}</p>
              </div>
            )
          })
        }
      </div>
      {displayNum >= posters.length &&
        <button type="button" className="btn" onClick={handleLessClick}>Show Less</button>
      }
      {displayNum < posters.length &&
        <button type="button" className="btn" onClick={handleMoreClick}>Load More</button>
       }
    </div>
  );
}

export default Posters;
