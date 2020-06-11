$('.open').attr('i',0)
$('.open').click(function() {
  var i = parseInt($(this).attr('i'))
  var close = $(this).attr('data-close')
  var open = $(this).attr('data-open')
  if(!$('.nav_m-list').is(":animated")) {
    $('.nav_m-list').slideToggle()
    if(i % 2 == 0) {
      $(this).attr('src', close)
    }else{
      $(this).attr('src', open)
    }
    $(this).attr('i', i += 1)
  }
  return false
})
