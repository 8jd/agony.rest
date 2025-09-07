const command = "sudo apt install agony.rest";
  let i = 0;

  function typeCommand() {
    if (i < command.length) {
      if (command.substring(i, i + 8) === "agony.rest") {
        const span = document.createElement("span");
        span.className = "text-cyan-400";
        span.textContent = "widow.sh";
        document.getElementById("typed-command").appendChild(span);
        i += 8;
        setTimeout(typeCommand, 30);
      } else {
        const char = command.charAt(i);
        const span = document.createElement("span");
        span.className = "text-white";
        span.textContent = char;
        document.getElementById("typed-command").appendChild(span);
        i++;
        setTimeout(typeCommand, 30);
      }
    } else {
      setTimeout(showInstall, 200);
    }
  }

  const installLines = [
    { prefix: 'Installing ', user: 'terminal' },
    { prefix: 'Installing ', user: 'icons' },
    { prefix: 'Installing ', user: 'users' },
    { prefix: 'Installing ', user: 'agony loader' },
  ];

  async function typeColoredLine(container, prefix, user) {
    container.textContent = '';

    for (let i = 0; i < prefix.length; i++) {
      container.textContent += prefix[i];
      await new Promise(r => setTimeout(r, 20));
    }

    for (let i = 0; i < user.length; i++) {
      const span = document.createElement('span');
      span.classList.add('text-red-500');
      span.textContent = user[i];
      container.appendChild(span);
      await new Promise(r => setTimeout(r, 20));
    }
  }

async function showInstall() {
  const installOutput = document.getElementById("install-output");
  installOutput.style.display = "block";

  for (let idx = 0; idx < installLines.length; idx++) {
    let p = document.getElementById(`install-line-${idx + 1}`);
    await typeColoredLine(p, installLines[idx].prefix, installLines[idx].user);
  }

  window.location.href = "desktop/";
}


  typeCommand();



