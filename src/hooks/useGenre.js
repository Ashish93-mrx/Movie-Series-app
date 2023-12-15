const useGenres = (selectedgenres) => {
    if(selectedgenres.length<1) return "";

    const GenreIds=selectedgenres.map((g)=>g.id);

    return GenreIds.reduce((acc,curr)=>acc + "," + curr);
};

export default useGenres;