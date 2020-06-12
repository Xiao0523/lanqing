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

$(document).ready(function(){
  $("#code-btn").click(function() {
    const phone = $('#telPhone').val()
    if (!isPhoneNo(phone)) {
      $('#phone-error').css("display","block")
      return false
    } else {
      $('#phone-error').css("display","none")
    }
    $.ajax({
      url:'https://www.yourlanqing.com/App/verifyCode/' + phone + '/3',
      type: 'get',
      success: function (returnValue) {
        if (returnValue.code) {
          $('#code-error').html('验证码发送失败，还在有效期')
          $('#code-error').css("display", "block")
          return
        }
        $('#code-btn').attr('disabled', true)
        $('#code-btn').css('background', '#A8A8A8')
        var time = 90  
        $('#code-btn').html(time + 's 重新获取')
        setInterval(function () {
          if (time <= 1) {
            $('#code-btn').attr('disabled', false)
            $('#code-btn').css('background', 'linear-gradient(90deg,rgba(255,120,182,1) 0%,rgba(240,61,129,1) 100%)')
            return
          }
          time--
          $('#code-btn').html(time + 's 重新获取')
        }, 1000);
      },
      error: function (returnValue) {
        $('#code-error').html('验证码获取失败,请刷新重试')
        $('#code-error').css("display", "block")
      }
    })
  })

  $("#submit-btn").click(function() {
    const getObj = {
      address: $('#address').val(),
      contactPerson: $('#contactPerson').val(),
      phone: $('#telPhone').val(),
      storeName: $('#storeName').val(),
      verifyCode: $('#verifyCode').val()
    }

    if (!getObj.address) {
      $('#address-error').css("display","block")
      return false
    } else {
      $('#address-error').css("display","none")
    }
    if (!getObj.contactPerson) {
      $('#user-error').css("display","block")
      return false
    } else {
      $('#user-error').css("display","none")
    }
    if (!getObj.phone) {
      $('#phone-error').css("display","block")
      return false
    } else {
      $('#phone-error').css("display","none")
    }
    if (!getObj.storeName) {
      $('#company-error').css("display","block")
      return false
    } else {
      $('#company-error').css("display","none")
    }
    if (!getObj.verifyCode) {
      $('#code-error').css("display","block")
      return false
    } else {
      $('#code-error').css("display","none")
    }
    $.ajax({
      url:'https://www.yourlanqing.com/Web/storeResident',
      type: 'post',
      data: JSON.stringify(getObj),
      success: function (returnValue) {
        if (returnValue.code) {
          $('#code-error').html('验证码发送失败，还在有效期')
          $('#code-error').css("display", "block")
          return
        }
        $('#code-btn').attr('disabled', true)
        $('#code-btn').css('background', '#A8A8A8')
        var time = 90  
        $('#code-btn').html(time + 's 重新获取')
        setInterval(function () {
          if (time <= 1) {
            $('#code-btn').attr('disabled', false)
            $('#code-btn').css('background', 'linear-gradient(90deg,rgba(255,120,182,1) 0%,rgba(240,61,129,1) 100%)')
            return
          }
          time--
          $('#code-btn').html(time + 's 重新获取')
        }, 1000);
      },
      error: function (returnValue) {
        $('#code-error').html('验证码获取失败,请刷新重试')
        $('#code-error').css("display", "block")
      }
    })
  })
})

function isPhoneNo(phone) {
  var pattern = /^1[34578]\d{9}$/
  return pattern.test(phone)
}