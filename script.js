let clickCount = 0;
const maxClicks = 5;

const shareBtn = document.getElementById('shareBtn');
const counterText = document.getElementById('counterText');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('registrationForm');
const message = document.getElementById('message');

const submittedBefore = localStorage.getItem('submitted');
if (submittedBefore) {
  form.style.display = 'none';
  message.classList.remove('hidden');
}

shareBtn.addEventListener('click', () => {
  if (clickCount < maxClicks) {
    clickCount++;
    const msg = "Hey Buddy, Join Tech For Girls Community!";
    const url = https://wa.me/?text=${encodeURIComponent(msg)};
    window.open(url, '_blank');

    counterText.textContent = Click count: ${clickCount}/${maxClicks};

    if (clickCount === maxClicks) {
      alert("Sharing complete. Please continue.");
      submitBtn.disabled = false;
    }
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (clickCount < maxClicks) {
    alert("Please complete sharing before submitting.");
    return;
  }

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const screenshot = document.getElementById('screenshot').files[0];

  const reader = new FileReader();
  reader.onload = async () => {
    const base64File = reader.result.split(',')[1];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("file", base64File);
    formData.append("mimeType", screenshot.type);

    try {
      await fetch("https://script.google.com/macros/s/AKfycby1_u9Otyx2C0IYY-TLcWjedWGLF2lBSsQieYg8F1BCo2LvKivX-INPKx9m8zwHPX8Vgw/exec", {
        method: "POST",
        body: formData,
      });

      localStorage.setItem('submitted', 'true');
      form.reset();
      form.style.display = 'none';
      message.classList.remove('hidden');
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  reader.readAsDataURL(screenshot);
});