var $$ = Dom7;

var device = Framework7.getDevice();

var teletubbies = ['Tinky Winky', 'Dipsy', 'Lala', 'Po'];

var movies = [];

movies.push({
  judul: 'Avenger Infinity War',
  sinopsis: 'Iron Man, Thor, the Hulk and the rest of the Avengers unite to battle their most powerful enemy yet -- the evil Thanos. On a mission to collect all six Infinity Stones, Thanos plans to use the artifacts to inflict his twisted will on reality. ',
  poster: 'https://ubaya.fun/images/1.jpg'
});

movies.push({
  judul: 'Joker',
  sinopsis: 'Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks --       the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he is part of the world around him. ',
  poster: 'https://ubaya.fun/images/2.jpg'
});

movies.push({
  judul: 'OnWard',
  sinopsis: 'Teenage elf brothers Ian and Barley embark on a magical quest to spend one more day with their late father.        Like any good adventure, their journey is filled with cryptic maps, impossible obstacles and unimaginable discoveries.',
  poster: 'https://ubaya.fun/images/3.jpg'
});

movies.push({
  judul: 'Knives Out',
  sinopsis: 'The circumstances surrounding the death of crime novelist Harlan Thrombey are mysterious, but there is one thing that renowned Detective Benoit Blanc knows for sure -- everyone in the wildly dysfunctional Thrombey family is a suspect. ',
  poster: 'https://ubaya.fun/images/4.jpg'
});

movies.push({
  judul: 'Mulan',
  sinopsis: 'A young Chinese maiden disguises herself as a male warrior in order to save her father. ',
  poster: 'https://ubaya.fun/images/5.jpg'
});

movies.push({
  judul: 'Tenet',
  sinopsis: 'In a twilight world of international espionage, an unnamed CIA operative, known as The Protagonist, is recruited by a mysterious organization called Tenet to participate in a global assignment that unfolds beyond real time.',
  poster: 'https://ubaya.fun/images/6.jpg'
});

var cast = [];

cast.push({
  nama: 'Keanu Reeves',
  poster: 'https://m.media-amazon.com/images/M/MV5BNGJmMWEzOGQtMWZkNS00MGNiLTk5NGEtYzg1YzAyZTgzZTZmXkEyXkFqcGdeQXVyMTE1MTYxNDAw._V1_UX214_CR0,0,214,317_AL_.jpg'
});

cast.push({
  nama: 'Tobey Maguire',
  poster: 'https://m.media-amazon.com/images/M/MV5BMTYwMTI5NTM2OF5BMl5BanBnXkFtZTcwODk3MDQ2Mg@@._V1_UY317_CR4,0,214,317_AL_.jpg'
});

cast.push({
  nama: 'Megan Fox',
  poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MjgyMzk4NF5BMl5BanBnXkFtZTcwODk2OTM4Mg@@._V1_UY317_CR4,0,214,317_AL_.jpg'
});

cast.push({
  nama: 'Angelina Jolie',
  poster: 'https://m.media-amazon.com/images/M/MV5BODg3MzYwMjE4N15BMl5BanBnXkFtZTcwMjU5NzAzNw@@._V1_UY317_CR22,0,214,317_AL_.jpg'
});

cast.push({
  nama: 'Scarlett Johansson',
  poster: 'https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_UY317_CR23,0,214,317_AL_.jpg'
});

cast.push({
  nama: 'Claudia Kim',
  poster: 'https://m.media-amazon.com/images/M/MV5BZTMyZDg5ZjQtMDEyNS00YmU1LTg1NTEtMjI5YjI1ZTM2Y2FkXkEyXkFqcGdeQXVyMTM4OTYyODEz._V1_UY317_CR30,0,214,317_AL_.jpg'
});

function getMovie(vcari) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420016/movie_api/movielist.php",
    { "cari": vcari },
    function (data) {
      var arr = JSON.parse(data);

      var list_movies = arr["data"];

      for (var i = 0; i < list_movies.length; i++) {
        $$("#ul_listmovie").append("<li><a href='/detailmovie2/" + list_movies[i]['movie_id'] + "'>" +
          list_movies[i]['title'] + "</a></li>");
      }
    }
  );
}

var app = new Framework7({
  name: 'F7-160420016', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element

  id: 'io.framework7.myapp', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }

      //code dom7
      $$("#btn1").on('click', function () {
        app.dialog.alert("ini alert");
      });

      $$(document).on('page:init', function (e, page) {
        if (page.name == 'intheater') {
          // $$("#detailtheater").html("<div>ini diisi via dom7</div>");

          // teletubbies.forEach(t => {
          //   $$("#detailtheater").append("<div class='block'>" + t + "</div>");
          // });

          movies.forEach((t, index) => {
            $$("#detailtheater").append(
              "<div class='col-50'><div class='card'>" +
              "<div class='card-header'>" + t.judul +
              "</div><div class='card-content'>" +
              "<img src='" + t.poster + "' width='100%'>" +
              "</div><div class='card-footer'><a href='/detailmovie/" + index + "'>Read More</a></div></div></div>");
          });
        }

        if (page.name == 'detailmovie') {
          var id = page.router.currentRoute.params.id;
          $$('#detailmovie').html(
            "<div class='card'>" +
            "<div class='card-header'>" +
            movies[id].judul +
            "</div><div class='card-content'>" +
            "<img src='" + movies[id].poster + "' width='100%'>" +
            "<br><div class='card-footer'><p>" +
            movies[id].sinopsis +
            "</p></div></div></div>"
          );
        }

        if (page.name == 'favcasts') {
          cast.forEach((c, index) => {
            $$("#listcast").append(
              "<div class='col-50'><div class='card'>" +
              "<div class='card-header'>" + c.nama +
              "</div><div class='card-content'>" +
              "<a href='/detailcast/" + index + "'>" +
              "<img src='" + c.poster + "' width='100%'></a>" +
              "</div></div></div>");
          });
        }

        if (page.name == 'detailcast') {
          var id = page.router.currentRoute.params.id;
          $$('#detailcast').html(
            "<div class='card'>" +
            "<div class='card-header'>" +
            cast[id].nama +
            "</div><div class='card-content'>" +
            "<img src='" + cast[id].poster + "' width='100%'>" +
            "<br><div class='card-footer'><p>" +
            "Detail Cast" +
            "</p></div></div></div>"
          );
        }

        if (page.name == 'popularmovie') {
          getMovie();
          $$("#btncari").on('click', function () {
            $$('#ul_listmovie').html('');
            getMovie($$('#txtcari').val());
          });
        }

        if (page.name == 'detailmovie2') {
          var id = page.router.currentRoute.params.id;
          app.request.post("https://ubaya.fun/hybrid/160420016/movie_api/movie_detail.php",
            { 'movie_id': id },
            function (data) {
              var arr = JSON.parse(data);
              var detail_movie = arr["data"];

              $$("#judul").html(detail_movie[0]["title"]);
              $$("#overview").html(detail_movie[0]["overview"]);
              $$("#url").html("<a href='" + detail_movie[0]["homepage"] + "'>" + detail_movie[0]["homepage"] + "</a>");

              var genres = detail_movie["genres"];

              for (i = 0; i < genres.length; i++) {
                $$("#genre").append("<li>" + genres[i]["genre_name"] + "</li>");
              }

              var casts = detail_movie["casts"];

              for (i = 0; i < casts.length; i++) {
                $$("#cast").append("<li>" + casts[i]["person_name"] + " as " + casts[i]["character_name"] + "</li>");
              }
            }
          );
        }

        if (page.name == 'newmovie') {
          app.calendar.create({
            inputEl: '#tx_rdate',
            closeOnSelect: true,
            dateFormat: "yyyy-mm-dd"
          });

          $$('#btnsubmit').on('click', function () {
            app.request.post('https://ubaya.fun/hybrid/160420016/movie_api/newmovie.php',
              {
                "title": $$("#tx_title").val(), "homepage": $$("#tx_homepage").val(),
                "overview": $$("#tx_overview").val(), "release_date": $$("#tx_rdate").val()
              },
              function (data) {
                var arr = JSON.parse(data);
                var result = arr['result'];
                if (result == 'success')
                  app.dialog.alert('Sukses menambah data');
                else app.dialog.alert('Gagal menambah data');
              });
          });
        }

      });
    },
  },
});