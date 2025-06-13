// Particles.js configuration
particlesJS("particles-box", {
  particles: {
    number: { value: 30 },
    color: { value: "#00ffff" },
    size: { value: 2.5 },
    move: {
      enable: true,
      speed: 10,
      direction: "top-right",
      random: false,
      straight: true,
      out_mode: "out",
      bounce: false
    },
    line_linked: {
      enable: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: false }
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  retina_detect: true
});

// Settings box functions - HOÀN TOÀN MỚI
function toggleSettings() {
  const box = document.getElementById('settings-box');
  if (box.style.display === 'block') {
    closeSettings();
  } else {
    openSettings();
  }
}

function openSettings() {
  const box = document.getElementById('settings-box');
  box.style.display = 'block';
  
  // Reset và restart animations cho hiệu ứng chạy từng dòng
  const paragraphs = box.querySelectorAll('p');
  paragraphs.forEach((p, index) => {
    // Reset về trạng thái ban đầu
    p.style.animation = 'none';
    p.style.opacity = '0';
    p.style.transform = 'translateX(-120px)';
    p.style.width = '0';
    p.style.borderRight = '2px solid #00ffff';
    
    // Restart animation với delay
    setTimeout(() => {
      p.style.animation = `slideInTyping 1.2s ease-out forwards`;
      p.style.animationDelay = `${index * 0.5 + 0.3}s`;
    }, 50);
  });
}

function closeSettings() {
  const box = document.getElementById('settings-box');
  box.style.display = 'none';
}

// Drag functionality - CẢI TIẾN
let offsetX, offsetY, isDragging = false;

function dragMouseDown(e) {
  // Không drag nếu click vào nút close
  if (e.target.classList.contains('close-btn')) return;
  
  e.preventDefault();
  const box = e.target.closest('.settings-box');
  if (!box) return;
  
  offsetX = e.clientX - box.offsetLeft;
  offsetY = e.clientY - box.offsetTop;
  isDragging = true;

  // Thêm class để thay đổi cursor
  box.style.cursor = 'grabbing';

  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;
}

function elementDrag(e) {
  if (isDragging) {
    e.preventDefault();
    const box = document.getElementById('settings-box');
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;
    
    // Giới hạn trong viewport để không bị mất
    newX = Math.max(0, Math.min(newX, window.innerWidth - box.offsetWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - box.offsetHeight));
    
    box.style.left = newX + 'px';
    box.style.top = newY + 'px';
    box.style.right = 'auto'; // Bỏ right positioning
  }
}

function closeDragElement() {
  isDragging = false;
  const box = document.getElementById('settings-box');
  if (box) {
    box.style.cursor = 'move';
  }
  document.onmouseup = null;
  document.onmousemove = null;
}

// THÊM CÁC TÍNH NĂNG MỚI

// Đóng settings khi click bên ngoài
document.addEventListener('click', function(e) {
  const settingsBox = document.getElementById('settings-box');
  const settingsIcon = document.querySelector('.settings-icon');
  
  if (settingsBox && settingsBox.style.display === 'block' && 
      !settingsBox.contains(e.target) && 
      !settingsIcon.contains(e.target)) {
    closeSettings();
  }
});

// Đóng settings bằng phím ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeSettings();
  }
});

// Prevent context menu trên settings box
document.addEventListener('contextmenu', function(e) {
  if (e.target.closest('.settings-box')) {
    e.preventDefault();
  }
});

// Hiệu ứng hover cho settings icon
document.addEventListener('DOMContentLoaded', function() {
  const settingsIcon = document.querySelector('.settings-icon');
  if (settingsIcon) {
    settingsIcon.addEventListener('mouseenter', function() {
      this.style.filter = 'drop-shadow(0 0 15px #00ffff)';
    });
    
    settingsIcon.addEventListener('mouseleave', function() {
      this.style.filter = 'drop-shadow(0 0 8px #00ffff)';
    });
  }
});