    let currentTemplate = 'normal';
    let currentScale = 1;
    let currentX = 0;
    let currentY = 0;
    // تغيير الرابط الأساسي لنوع normal إلى الرابط الجديد
    let currentTemplateUrl = 'https://i.ibb.co/SXPDRdzX/ga1.png';

    const logos = [
      'https://i.ibb.co/PvF4LSS0/logo01.png',
      'https://i.ibb.co/kkzZh3g/logo02.png',
      'https://i.ibb.co/27y4hnPn/logo03.png',
      'https://i.ibb.co/m5vdRvZW/logo04.png',
      'https://i.ibb.co/Fqn5rTn7/logo05.png',
      'https://i.ibb.co/k2kQWz0G/logo06.png',
      'https://i.ibb.co/7JNm6xP6/logo07.png',
      'https://i.ibb.co/Z6n3KYg1/logo08.png',
      'https://i.ibb.co/r2cMHpmJ/logo09.png',
      'https://i.ibb.co/gMJtsWGz/logo10.png'
    ];
    const phrases = [
      'https://i.ibb.co/mFSTkLKQ/txt01.png',
      'https://i.ibb.co/prfRXLRD/txt02.png',
      'https://i.ibb.co/fVvpLJx9/txt03.png',
      'https://i.ibb.co/DDjYh4f5/txt04.png',
      'https://i.ibb.co/YB9HP1WZ/txt05.png'
    ];

    function showTemplate(type, event) {
      currentTemplate = type;
      document.querySelectorAll('.controls button').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      if (type === 'normal') {
        document.getElementById('normalControls').style.display = 'block';
        document.getElementById('designControls').style.display = 'none';
        currentTemplateUrl = document.getElementById('uploadCheckNormal').checked 
          ? 'https://i.ibb.co/RpyzDLNF/ga2.png' 
          : 'https://i.ibb.co/SXPDRdzX/ga1.png';
      } else {
        document.getElementById('normalControls').style.display = 'none';
        document.getElementById('designControls').style.display = 'block';
        currentTemplateUrl = document.getElementById('uploadCheckDesign').checked 
          ? 'https://i.ibb.co/dwQncYtG/wall02.png' 
          : 'https://i.ibb.co/qLYtgyQX/wall01.png';
      }
      document.getElementById('templateImg').src = currentTemplateUrl;
      document.getElementById('selectedLogo').src = "";
      document.getElementById('selectedPhrase').src = "";
      document.getElementById('nameDisplay').textContent = "";
      document.getElementById('customPhrase').textContent = "";
      document.getElementById('templateImg').style.filter = "none";
      document.getElementById('selectedLogo').style.filter = "none";
      document.getElementById('selectedPhrase').style.filter = "none";
      document.getElementById('nameDisplay').style.filter = "none";
    }

    function toggleUpload(type) {
      const uploadCheck = document.getElementById(`uploadCheck${type.charAt(0).toUpperCase() + type.slice(1)}`);
      const controls = document.getElementById(`imageControls${type.charAt(0).toUpperCase() + type.slice(1)}`);
      controls.style.display = uploadCheck.checked ? 'block' : 'none';

      if (type === 'normal') {
        currentTemplateUrl = uploadCheck.checked 
          ? 'https://i.ibb.co/RpyzDLNF/ga2.png' 
          : 'https://i.ibb.co/SXPDRdzX/ga1.png';
      } else {
        currentTemplateUrl = uploadCheck.checked 
          ? 'https://i.ibb.co/dwQncYtG/wall02.png' 
          : 'https://i.ibb.co/qLYtgyQX/wall01.png';
      }
      document.getElementById('templateImg').src = currentTemplateUrl;

      const logo = document.getElementById('selectedLogo');
      const phrase = document.getElementById('selectedPhrase');
      const customPhrase = document.getElementById('customPhrase');
      const nameDisplay = document.getElementById('nameDisplay');

      if (uploadCheck.checked) {
        // عند تحديد رفع الصورة نستخدم القيم الجديدة
        logo.style.top = "38%";
        phrase.style.top = "54%";
        customPhrase.style.top = "66%";
        nameDisplay.style.top = "80%";
      } else {
        // إرجاع القيم الأصلية من data-original-top
        logo.style.top = logo.dataset.originalTop;
        phrase.style.top = phrase.dataset.originalTop;
        customPhrase.style.top = customPhrase.dataset.originalTop;
        nameDisplay.style.top = nameDisplay.dataset.originalTop;
        document.getElementById('userImage').src = "";
        currentScale = 1;
        currentX = 0;
        currentY = 0;
        document.getElementById('userImage').style.transform = `translate(0px, 0px) scale(1)`;
      }
    }

    window.onload = function() {
      document.getElementById('templateImg').src = currentTemplateUrl;
      logos.forEach(logo => {
        const img = document.createElement('img');
        img.src = logo;
        img.className = 'element-img';
        img.onclick = () => {
          document.querySelectorAll('#logosContainer .element-img').forEach(i => i.classList.remove('selected'));
          img.classList.add('selected');
          document.getElementById('selectedLogo').src = logo;
        };
        document.getElementById('logosContainer').appendChild(img);
      });
      phrases.forEach(phrase => {
        const img = document.createElement('img');
        img.src = phrase;
        img.className = 'element-img';
        img.onclick = () => {
          document.querySelectorAll('#phrasesContainer .element-img').forEach(i => i.classList.remove('selected'));
          img.classList.add('selected');
          document.getElementById('selectedPhrase').src = phrase;
        };
        document.getElementById('phrasesContainer').appendChild(img);
      });
    }

    function handleImageUpload(e) {
      const reader = new FileReader();
      reader.onload = function(event) {
        document.getElementById('userImage').src = event.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }

    function adjustImage(action, value) {
      const img = document.getElementById('userImage');
      if (action === 'scale') {
        currentScale *= value;
        img.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
      } else if (action === 'move') {
        const step = 10;
        if (value === 'up') currentY -= step;
        if (value === 'down') currentY += step;
        if (value === 'left') currentX -= step;
        if (value === 'right') currentX += step;
        img.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
      }
    }

    function updateName() {
      document.getElementById('nameDisplay').textContent = document.getElementById('nameInput').value;
    }

    function downloadCard() {
      const cardWrapper = document.querySelector('.card-wrapper');
      const originalTransform = cardWrapper.style.transform;
      cardWrapper.style.transform = 'scale(1)';
      setTimeout(() => {
        html2canvas(document.querySelector('.card-container'), {
          useCORS: true,
          backgroundColor: null
        }).then(canvas => {
          cardWrapper.style.transform = originalTransform;
          const link = document.createElement('a');
          link.download = 'eid-card.png';
          link.href = canvas.toDataURL();
          link.click();
        });
      }, 100);
    }

    function previewCard() {
      const cardWrapper = document.querySelector('.card-wrapper');
      const originalTransform = cardWrapper.style.transform;
      cardWrapper.style.transform = 'scale(1)';
      setTimeout(() => {
        html2canvas(document.querySelector('.card-container'), {
          useCORS: true,
          backgroundColor: null
        }).then(canvas => {
          cardWrapper.style.transform = originalTransform;
          const win = window.open();
          win.document.write(`<img src="${canvas.toDataURL()}" style="max-width:100%">`);
        });
      }, 100);
    }

    function updateCustomText() {
      document.getElementById('customPhrase').textContent = document.getElementById('customText').value;
      if (document.getElementById('customText').value) {
        document.getElementById('selectedPhrase').style.display = 'none';
      } else {
        document.getElementById('selectedPhrase').style.display = 'block';
      }
    }