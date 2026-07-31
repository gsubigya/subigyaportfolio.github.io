(function(){
  var slider = document.getElementById('verify-slider');
  var result = document.getElementById('seal-result');
  var emailEl = document.getElementById('email-reveal');
  var mailLink = document.getElementById('mail-link');
  var copyBtn = document.getElementById('copy-email');
  var label = document.querySelector('.seal-label');
  var unlocked = false;

  // Email kept out of the DOM/source as plain text until verified.
  var codes = [99,111,110,116,97,99,116,64,115,117,98,105,103,121,97,46,99,111,109];

  function reveal(){
    if (unlocked) return;
    unlocked = true;
    var email = String.fromCharCode.apply(null, codes);
    emailEl.textContent = email;
    mailLink.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Hello Subigya');
    result.hidden = false;
    slider.disabled = true;
    slider.setAttribute('aria-valuetext', 'Verified, seal broken');
    label.textContent = 'Verified — seal broken';

    copyBtn.addEventListener('click', function(){
      navigator.clipboard.writeText(email).then(function(){
        copyBtn.textContent = 'Copied ✓';
        setTimeout(function(){ copyBtn.textContent = 'Copy address'; }, 1800);
      }).catch(function(){
        copyBtn.textContent = 'Select the text above';
      });
    });
  }

  slider.addEventListener('input', function(){
    if (Number(slider.value) >= 96) reveal();
  });
})();
