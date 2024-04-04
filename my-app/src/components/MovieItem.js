function MovieItem(props) {

    return(
        <div className="movieItemCard">
            <img src={props.image} alt={props.name} className="movieImage"/> {}
            <h3>{props.name}</h3>
            <p>{props.release}</p>
            <p>Rating: {props.rating}%</p>

            <button id="button" onClick={() => props.display({ name: props.name, image: props.image })}>
                {props.isAdded ? 'Added!' : 'Add to Watchlist +'} 
            </button>
            
            <div className="genreTag">{props.genre}</div>
        </div>
    )
}

export default MovieItem