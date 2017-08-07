$(() => {
	$('.up').on('click', (e)=> {
		if($(e.currentTarget).attr('src') === './up-unselected.png') {
			$(e.currentTarget).attr('src', './up-selected.png')
		}
		else {
			$(e.currentTarget).attr('src', './up-unselected.png')
		}
	})
	$('.down').on('click', (e)=> {
		if($(e.currentTarget).attr('src') === './down-unselected.png') {
			$(e.currentTarget).attr('src', './down-selected.png')
		}
		else {
			$(e.currentTarget).attr('src', './down-unselected.png')
		}
	})

	$('.show-video').on('click', (e) => {
		if($(e.currentTarget).hasClass('hidden')) {
			$(e.currentTarget).siblings('.song').show('slow')
			$(e.currentTarget).removeClass('hidden')
		}
		else {
			$(e.currentTarget).siblings('.song').hide('slow')
			$(e.currentTarget).addClass('hidden')
		}
	})
})