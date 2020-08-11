const Player = new function ()
{
    function init()
    {
        player = new window.YT.Player('player', {
    	
            videoId: "dQw4w9WgXcQ",
          
            events:
			{
				onReady: () => console.log('ready'),	
			}
	  });
    }
    
    this.init = (options) =>
    {
        if (this.apiIsLoaded)
            init(options);
        else
            window.onYouTubeIframeAPIReady = () => init(options);
    }
       

    let player;
}();

export default Player;



window.onYouTubeIframeAPIReady = () =>
{
	Player.apiIsLoaded = true;
	return;
	setTimeout(() => {
		window.player = new YT.Player('player', {
    	
			height: '390',
			width: '640',
			videoId: "dQw4w9WgXcQ",
			playerVars: { 'origin': window.location.origin },
			events:
			{
				onReady: () => console.log('ready'),	
			}

	  });

	
	}, 500)
}
