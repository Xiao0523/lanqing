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
var closeFlag = false
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
      headers:{'Content-Type':'application/json;charset=utf8'},
      data: JSON.stringify(getObj),
      success: function (returnValue) {
        if (returnValue.code) {
          if (closeFlag) $('#message-tip').css("transform", "translateY(-200%)")
          messageTip(returnValue.message)
          $('#message-tip').css("background", "#fef0f0")
          $('#message-tip').css("color", " #f56c6c")
          close()
          return
        }
        if (closeFlag) $('#message-tip').css("transform", "translateY(-200%)")
        messageTip('提交成功，我们稍后会与你联系！')
        $('#message-tip').css("background", "#f0f9eb")
        $('#message-tip').css("color", "#57c32a")
        close()
        $('#address').val() = ''
        $('#contactPerson').val() = ''
        $('#telPhone').val() = ''
        $('#storeName').val() = ''
        $('#verifyCode').val() = ''
      },
      error: function (returnValue) {
        if (closeFlag) $('#message-tip').css("transform", "translateY(-200%)")
        messageTip(returnValue.message)
        close()
      }
    })
  })
})

function messageTip(msg) {
  $('#message-tip').html(msg)
  $('#message-tip').css("background", "#fef0f0")
  $('#message-tip').css("color", " #f56c6c")
  $('#message-tip').css("transform", "translateY(0%)")
}

function close() {
  closeFlag = true
  setTimeout(function() {
    $('#message-tip').css("transform", "translateY(-200%)")
  }, 3000)
}

function isPhoneNo(phone) {
  var pattern = /^1[34578]\d{9}$/
  return pattern.test(phone)
}