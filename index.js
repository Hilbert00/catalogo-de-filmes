fetch("http://www.omdbapi.com/?s=cars&apikey=c6319160")
    .then((res) => res.json())
    .then((result) => console.log(result))