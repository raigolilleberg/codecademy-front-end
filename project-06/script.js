const cards = Array.from(document.querySelectorAll('.card'));

const rotationRange = document.getElementById('rotationRange');
const offsetRange = document.getElementById('offsetRange');
const shadowBlurRange = document.getElementById('shadowBlurRange');
const shadowOpacityRange = document.getElementById('shadowOpacityRange');

const rotationValue = document.getElementById('rotationValue');
const offsetValue = document.getElementById('offsetValue');
const shadowBlurValue = document.getElementById('shadowBlurValue');
const shadowOpacityValue = document.getElementById('shadowOpacityValue');

const controls = [rotationRange, offsetRange, shadowBlurRange, shadowOpacityRange];

function spreadAngle(index, total, range) {
  if (total === 1) return 0;
  const normalized = index / (total - 1);
  const centered = normalized * 2 - 1;
  return centered * range;
}

function updateStack() {
  const rotation = Number(rotationRange.value);
  const offset = Number(offsetRange.value);
  const blur = Number(shadowBlurRange.value);
  const shadowOpacity = Number(shadowOpacityRange.value) / 100;

  rotationValue.textContent = `${rotation}°`;
  offsetValue.textContent = `${offset}px`;
  shadowBlurValue.textContent = `${blur}px`;
  shadowOpacityValue.textContent = shadowOpacity.toFixed(2);

  cards.forEach((card, index) => {
    const angle = spreadAngle(index, cards.length, rotation);
    const yOffset = index * offset;

    card.style.zIndex = String(cards.length - index);
    card.style.transform = `translate(-50%, calc(-50% + ${yOffset}px)) rotate(${angle}deg)`;
    card.style.boxShadow = `0 ${Math.max(6, blur / 3)}px ${blur}px rgba(10, 14, 22, ${shadowOpacity})`;
  });
}

controls.forEach((control) => {
  control.addEventListener('input', updateStack);
});

updateStack();
