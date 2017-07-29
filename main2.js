 
 var currentSongNumber = 1;
 var willLoop = 0;
 var willShuffle = 0; // will use this soon
 
function toggleSong() {														//use to switch song
	var song = document.querySelector('audio');								//from pause to play
	if(song.paused == true) {												//and vice versa
	console.log('Playing');
	$('.play-icon').removeClass('fa-play').addClass('fa-pause');
	song.play();
	}
	else {
	console.log('Pausing');
	$('.play-icon').removeClass('fa-pause').addClass('fa-play');
	song.pause();
	}
	} 
    
    $('.welcome-screen button').on('click', function() {					//welcome screen
        var name = $('#name-input').val();									//accepting only when input 
        if (name.length > 2) {												//is greater than 2
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
    
    $('.play-icon').on('click', function() {								//calling function togglesong
        toggleSong();
    });
    
    $('body').on('keypress', function(event) {
    		var target = event.target;
                if (event.keyCode == 32 && target.tagName !='INPUT') {		//to pause and play song via spacebar
                   toggleSong();											//solving spacebar bug
                    }
            });

 window.onload = function() {
 	changeCurrentSongDetails(songs[0]);
    for(var i =0; i < songs.length;i++) {									//displaying contenets on loading screen
        var obj = songs[i];													//include all details
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1)
        
    }
	
	updateCurrentTime();
	setInterval(function() {												//updating time with passing second
		updateCurrentTime();
		},1000);
	$('#songs').DataTable({
        paging: false
    });
	}
	
function fancyTimeFormat(time)
	{   
    																		// Hours, minutes and seconds
    	var hrs = ~~(time / 3600);
    	var mins = ~~((time % 3600) / 60);
    	var secs = time % 60;

    																		// Output like "1:01" or "4:03:59" or "123:03:59"
    	var ret = "";

    	if (hrs > 0) {
        	ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    	}

    	ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    	ret += "" + secs;
    	return ret;
	}
    
function updateCurrentTime() {												
    	var song = document.querySelector('audio');
    	var currentTime = Math.floor(song.currentTime);
    	currentTime = fancyTimeFormat(currentTime);
    	var duration = Math.floor(song.duration);
    	duration = fancyTimeFormat(duration)
    	$('.time-elapsed').text(currentTime);
    	$('.song-duration').text(duration);
	}
	
function addSongNameClickEvent(songObj, position){
    	var songName = songObj.fileName;
    	var id = '#song' + position;
		$(id).click(function()  {
			var audio = document.querySelector('audio');
			var currentSong = audio.src;
			if(currentSong.search(songName) != -1)
			{
				toggleSong();
			}
			else {
				audio.src = songName;
				toggleSong();
				changeCurrentSongDetails(songObj);
			}
		});	
	}
	
var songs = [{																				//array of songs
        'name': 'Hawa Hawa',
        'artist': 'Mika Singh, Prakriti Kakkar',
        'album': 'Mubarkan',
        'duration': '4:33',
       'fileName': 'song10.mp3',
       'image': 'song10.jpg'
    },
    {
        'name': 'Galti Se Mistake',
        'artist': 'Arijit Singh, Amit Mishra',
        'album': 'Jagga Jasoos',
        'duration': '3:23',
        'fileName': 'song11.mp3',
        'image': 'song11.jpg'
    },
    {
        'name': 'Mere Rashke Qamar',
        'artist': 'Rahat Fateh Ali Khan',
        'album': 'Baadshaho',
        'duration': '3:40',
        'fileName': 'song12.mp3',
        'image': 'song12.jpg'
    },
    {
        'name': 'Radha',
        'artist': 'Shahid Mallya, Pritam, Sunidhi Chauhan',
        'album': 'Jab Harry Met Sejal',
        'duration': '3:50',
        'fileName': 'song13.mp3',
        'image': 'song13.jpg'
    }];

function changeCurrentSongDetails(songObj) {													//for changing details of current song
    	$('.current-song-image').attr('src','img/' + songObj.image);
    	$('.current-song-name').text(songObj.name);
    	$('.current-song-album').text(songObj.album);
	}

	$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
	});

function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
	}

	$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
	});

	$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,4,currentSongNumber); 							// Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    	}
	})

function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
	}