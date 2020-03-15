window.onload = function(){
   loginMail.focus(), loginMail.addEventListener('blur', mailBlur), loginPwd.addEventListener('blur', pwdBlur), loginMail.addEventListener('focus', removeClasses), loginPwd.addEventListener('focus', removeClasses), loginBtn.addEventListener('focus', porukaLogin);
   email.addEventListener('blur', emailValid), pwd.addEventListener('blur', pwdValid), confirmPwd.addEventListener('blur', confirmValid), email.addEventListener('focus', removeClassesRegister), pwd.addEventListener('focus', removeClassesRegister), confirmPwd.addEventListener('focus', removeClassesRegister), registerBtn.addEventListener('focus', porukaRegister);
}

// LOGIN FORMA
let loginBtn = document.querySelector('#loginBtn'),
    loginMail = document.querySelector('#loginMail'),
    loginPwd = document.querySelector('#loginPwd');

    mailBlur = () => {
        let a = /^[a-zšđžćč]{4,}(\.)?[a-zšđžćč]{4,}([0-9]{0,5})?\@((gmail)|(outlook)|(msn)|(live)|(hotmail)|(yahoo)|\w)\.com$/;
        a.test(loginMail.value) ? (loginMail.classList.add('icon-success')) : (loginMail.classList.add('icon-danger'), loginBtn.setAttribute('disabled', !0))
    },
    pwdBlur = () => {
        let a = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        a.test(loginPwd.value) ? (loginPwd.classList.add('icon-success'), loginBtn.removeAttribute('disabled', !0)) : (loginPwd.classList.add('icon-danger'), loginBtn.setAttribute('disabled', !0))
    };
let removeClasses = a => {
    a.target.classList.contains('icon-danger') ? a.target.classList.remove('icon-danger') : a.target.classList.contains('icon-success') && a.target.classList.remove('icon-success'), loginMail.classList.contains('icon-success') && loginPwd.classList.contains('icon-success') && loginBtn.hasAttribute('disabled') && loginBtn.removeAttribute('disabled')
};

    porukaLogin = () => {
      if(!loginMail.classList.add('icon-success') && !loginPwd.classList.add('icon-success')){
        let msg = alertify.message('You have successfully logged in, welcome to eSports!');
        msg.delay(3);
    }
      else{
        let msg = alertify.message('Please try again!');
        msg.delay(3);
     }
    }

  // REGISTER FORMA
  let email = document.querySelector('#regEmail'),
      pwd = document.querySelector('#pwd'),
      confirmPwd = document.querySelector('#confirmPwd'),
      progress = document.querySelector('#progress'),
      notify = document.querySelector('.alertify-notifier'),
      counter = 0,
      registerBtn = document.querySelector('#registerBtn'),
      isFormOK = !0,
      regEmail = /^[a-zšđžćč]{4,}(\.)?([a-zšđžćč]{4,})*([0-9]{0,5})?\@((gmail)|(outlook)|(msn)|(live)|(hotmail)|(yahoo)|\w)\.com$/,
      regPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  let removeClassesRegister = a => {
          a.target.classList.contains('icon-danger') ? a.target.classList.remove('icon-danger') : a.target.classList.contains('icon-success') && a.target.classList.remove('icon-success')
      },
      emailValid = () => {
          regEmail.test(email.value) ? (email.classList.add('icon-success'), isFormOK = !0, progress.value += 33)  : (email.classList.add('icon-danger'), isFormOK = !1, progress.value -= 33)
      },
      pwdValid = () => {
          regPwd.test(pwd.value) ? (pwd.classList.add('icon-success'), isFormOK = !0, progress.value += 33) : (pwd.classList.add('icon-danger'), isFormOK = !1, progress.value -= 33)
      },
      confirmValid = () => {
          pwd.value ? pwd.value === confirmPwd.value && (confirmPwd.classList.add('icon-success'), isFormOK = !0, progress.value += 34) : (confirmPwd.classList.add('icon-danger'), isFormOK = !1, progress.value -= 34)
      },
      porukaRegister = () => {
        if(regEmail.test(email.value) && regPwd.test(pwd.value) && pwd.value === confirmPwd.value){
          let msg = alertify.message('You have successfully registered, welcome to eSports!');
          msg.delay(3);
      }
        else{
          let msg = alertify.message('Please try again!');
          msg.delay(3);
       }
      }
