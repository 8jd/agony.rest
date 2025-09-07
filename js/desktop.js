function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  document.getElementById('time-display').textContent = timeStr;
}

setInterval(updateTime, 1000);
updateTime();

function showTerminal() {
  const terminal = document.getElementById('terminal');
  const terminalAscii = document.getElementById('terminal-ascii');
  const terminalInfo = document.getElementById('terminal-info');
  
  terminal.style.display = 'block';
  terminalAscii.innerHTML = '';
  terminalInfo.innerHTML = '';

  const commandLine = document.createElement('div');
  commandLine.className = 'command-line';
  commandLine.style.position = 'absolute';
  commandLine.style.top = '40px';
  commandLine.style.left = '20px';
  commandLine.innerHTML = `
    <span class="prompt">┌──(user㉿agony)-[~]</span><br>
    <span class="prompt">└─$</span> <span id="typing-text"></span><span class="cursor">█</span>
  `;
  terminalInfo.appendChild(commandLine);

  const text = "whoarewe";
  const typingElement = document.getElementById('typing-text');
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      setTimeout(() => {
        commandLine.style.display = 'none';
        showAsciiAndInfo();
      }, 500);
    }
  }

  setTimeout(typeWriter, 300);
}

function showAsciiAndInfo() {
  const terminalAscii = document.getElementById('terminal-ascii');
  const terminalInfo = document.getElementById('terminal-info');

  const asciiGirl = [
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⢀⠄⠂⢉⠤⠐⠋⠈⠡⡈⠉⠐⠠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⢀⡀⢠⣤⠔⠁⢀⠀⠀⠀⠀⠀⠀⠀⠈⢢⠀⠀⠈⠱⡤⣤⠄⣀⠀⠀⠀⠀⠀",
    "⠀⠀⠰⠁⠀⣰⣿⠃⠀⢠⠃⢸⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠈⢞⣦⡀⠈⡇⠀⠀⠀",
    "⠀⠀⠀⢇⣠⡿⠁⠀⢀⡃⠀⣈⠀⠀⠀⠀⢰⡀⠀⠀⠀⠀⢢⠰⠀⠀⢺⣧⢰⠀⠀⠀⠀",
    "⠀⠀⠀⠈⣿⠁⡘⠀⡌⡇⠀⡿⠸⠀⠀⠀⠈⡕⡄⠀⠐⡀⠈⠀⢃⠀⠀⠾⠇⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠇⡇⠃⢠⠀⠶⡀⡇⢃⠡⡀⠀⠀⠡⠈⢂⡀⢁⠀⡁⠸⠀⡆⠘⡀⠀⠀⠀⠀",
    "⠀⠀⠀⠸⠀⢸⠀⠘⡜⠀⣑⢴⣀⠑⠯⡂⠄⣀⣣⢀⣈⢺⡜⢣⠀⡆⡇⠀⢣⠀⠀⠀⠀",
    "⠀⠀⠀⠇⠀⢸⠀⡗⣰⡿⡻⠿⡳⡅⠀⠀⠀⠀⠈⡵⠿⠿⡻⣷⡡⡇⡇⠀⢸⣇⠀⠀⠀",
    "⠀⠀⢰⠀⠀⡆⡄⣧⡏⠸⢠⢲⢸⠁⠀⠀⠀⠀⠐⢙⢰⠂⢡⠘⣇⡇⠃⠀⠀⢹⡄⠀⠀",
    "⠀⠀⠟⠀⠀⢰⢁⡇⠇⠰⣀⢁⡜⠀⠀⠀⠀⠀⠀⠘⣀⣁⠌⠀⠃⠰⠀⠀⠀⠈⠰⠀⠀",
    "⠀⡘⠀⠀⠀⠀⢊⣤⠀⠀⠤⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠄⠀⢸⠃⠀⠀⠀⠀⠀⠃⠀",
    "⢠⠁⢀⠀⠀⠀⠈⢿⡀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⢀⠏⠀⠀⠀⠀⠀⠀⠸⠀",
    "⠘⠸⠘⡀⠀⠀⠀⠀⢣⠀⠀⠀⠀⠀⠀⠁⠀⠃⠀⠀⠀⠀⢀⠎⠀⠀⠀⠀⠀⢠⠀⠀⡇",
    "⠀⠇⢆⢃⠀⠀⠀⠀⠀⡏⢲⢤⢀⡀⠀⠀⠀⠀⠀⢀⣠⠄⡚⠀⠀⠀⠀⠀⠀⣾⠀⠀⠀",
    "⢰⠈⢌⢎⢆⠀⠀⠀⠀⠁⣌⠆⡰⡁⠉⠉⠀⠉⠁⡱⡘⡼⠇⠀⠀⠀⠀⢀⢬⠃⢠⠀⡆",
    "⠀⢢⠀⠑⢵⣧⡀⠀⠀⡿⠳⠂⠉⠀⠀⠀⠀⠀⠀⠀⠁⢺⡀⠀⠀⢀⢠⣮⠃⢀⠆⡰⠀",
    "⠀⠀⠑⠄⣀⠙⡭⠢⢀⡀⠀⠁⠄⣀⣀⠀⢀⣀⣀⣀⡠⠂⢃⡀⠔⠱⡞⢁⠄⣁⠔⠁⠀",
    "⠀⠀⠀⠀⠀⢠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠉⠁⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀",
    "▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄"
  ];

  const asciiContainer = document.createElement('div');
  asciiContainer.style.textAlign = 'center';
  asciiContainer.style.margin = 'auto';
  asciiContainer.style.fontFamily = 'monospace';
  asciiContainer.style.lineHeight = '1.1';
  asciiContainer.style.whiteSpace = 'pre';
  asciiContainer.style.opacity = '0';
  asciiContainer.style.transition = 'opacity 1s ease-in';
  
  asciiGirl.forEach((line, index) => {
    const lineElement = document.createElement('div');
    const hue = 20 + (index * 5);
    lineElement.style.color = `hsl(${hue}, 100%, 60%)`;
    lineElement.textContent = line;
    asciiContainer.appendChild(lineElement);
  });

  terminalAscii.appendChild(asciiContainer);
  
  setTimeout(() => {
    asciiContainer.style.opacity = '1';
  }, 100);

  const infoHTML = `
    <div style="margin: auto; opacity: 0; transition: opacity 1s ease-in;">
      <div class="info-item" style="--delay: 1; color: #FF4500">user@agony</div>
      <div class="info-item" style="--delay: 2; color: #FF8C00">-----------------</div>
      <div class="info-item" style="--delay: 3; color: #FFA500">Moto: "oh the agony"</div>
      <div class="info-item" style="--delay: 4; color: #FF8C00">Group: https://agony.rest/</div>
      <div class="info-item" style="--delay: 5; color: #FF6347">We are a cyber collective with a primary focus on coding and various other digital endeavors.</div>
    </div>
  `;
  
  terminalInfo.innerHTML = infoHTML;
  
  setTimeout(() => {
    const infoContainer = terminalInfo.querySelector('div');
    infoContainer.style.opacity = '1';
    
    const items = document.querySelectorAll('.info-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
      }, index * 100);
    });
  }, 500);
}

function hideTerminal() {
  document.getElementById('terminal').style.display = 'none';
}

let isDraggingTerminal = false;
let terminalOffsetX = 0;
let terminalOffsetY = 0;
const terminal = document.getElementById('terminal');
const terminalHeader = document.querySelector('.terminal-header');

terminalHeader.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('terminal-close')) return;
  isDraggingTerminal = true;
  const rect = terminal.getBoundingClientRect();
  terminalOffsetX = e.clientX - rect.left;
  terminalOffsetY = e.clientY - rect.top;
  terminal.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (isDraggingTerminal) {
    terminal.style.left = (e.clientX - terminalOffsetX) + 'px';
    terminal.style.top = (e.clientY - terminalOffsetY) + 'px';
    terminal.style.transform = 'none';
  }
});

document.addEventListener('mouseup', () => {
  isDraggingTerminal = false;
  terminal.style.cursor = 'default';
});

function showUserPopup(username, avatar, content) {
  const popup = document.getElementById('user-popup');
  document.getElementById('popup-username').textContent = username;
  document.getElementById('popup-content').innerHTML = `
    <div style="text-align: center; margin-bottom: 15px;">
      <img src="${avatar}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
    </div>
    ${content}
  `;
  popup.style.display = 'flex';
  
  const userElement = event.currentTarget;
  const rect = userElement.getBoundingClientRect();
  popup.style.left = (rect.right + 10) + 'px';
  popup.style.top = (rect.top - 50) + 'px';
}

function hidePopup() {
  document.getElementById('user-popup').style.display = 'none';
}

let isDraggingPopup = false;
let popupOffsetX = 0;
let popupOffsetY = 0;
const popup = document.getElementById('user-popup');
const popupHeader = document.querySelector('.popup-header');

popupHeader.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('popup-close')) return;
  isDraggingPopup = true;
  const rect = popup.getBoundingClientRect();
  popupOffsetX = e.clientX - rect.left;
  popupOffsetY = e.clientY - rect.top;
  popup.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (isDraggingPopup) {
    popup.style.left = (e.clientX - popupOffsetX) + 'px';
    popup.style.top = (e.clientY - popupOffsetY) + 'px';
  }
});

document.addEventListener('mouseup', () => {
  isDraggingPopup = false;
  popup.style.cursor = 'default';
});