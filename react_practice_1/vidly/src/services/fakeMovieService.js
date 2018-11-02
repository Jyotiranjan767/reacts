const movies =[
    {
      _id: 'hfh74849yolafa1',
      title:"Terminator",
      genere : {_id : 'naskfu4oo489492', name : 'Comedy'},
      numberInStock : 2,
      dailyRentalRate : 3.5,
      publishDate : "2018-01-03",
      liked : true
    },
    {
      _id: 'hfh74849yolafa2',
      title:"Die Hard",
      genere : {_id : 'naskfu4oo489492', name : 'Action'},
      numberInStock : 4,
      dailyRentalRate : 2.5,
      publishDate : "2018-01-03"
    },
    {
      _id: 'hfh74849yolafa3',
      title:"The Avengers",
      genere : {_id : 'naskfu4oo489492', name : 'Thriller'},
      numberInStock : 6,
      dailyRentalRate : 4.5,
      publishDate : "2018-01-03"
    },
    {
      _id: 'hfh74849yolafa4',
      title:"Terminator",
      genere : {_id : 'naskfu4oo4894924', name : 'Action'},
      numberInStock : 9,
      dailyRentalRate : 3.5,
      publishDate : "2018-01-03",
      liked : true
    },
    {
      _id: 'hfh74849yolafa5',
      title:"Trip to Italy",
      genere : {_id : 'naskfu4oo4894923', name : 'Action'},
      numberInStock : 3,
      dailyRentalRate : 2.5,
      publishDate : "2018-01-03"
    },
    {
      _id: 'hfh74849yolafa6',
      title:"The Sixth Sense",
      genere : {_id : 'naskfu4oo4894922', name : 'Comedy'},
      numberInStock : 6,
      dailyRentalRate : 2.5,
      publishDate : "2018-01-03"
    },
    {
      _id: 'hfh74849yolafa7',
      title:"Terminator",
      genere : {_id : 'naskfu4oo4894921', name : 'Thriller'},
      numberInStock : 3,
      dailyRentalRate : 3.5,
      publishDate : "2018-01-03"
    }
]

export function getMovies(){
  return movies;
}
export function getMovie(id){
  return movies.find(m => m.id === id);
}

export function deleteMovie(id){
  return movies.find(m => m.id === id)
}
