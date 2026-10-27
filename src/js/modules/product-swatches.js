import { $, $$ } from '../utils/dom.js';

/** Selector de color de la mochila: cambia la vista previa y el nombre de la variante. */
export function initProductSwatches() {
  const bag = $('#bag');
  if (!bag) return;
  const buttons = $$('.sw');
  const detailIds = ['bagSide1', 'bagSide2', 'bagPocket'];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      $('#bagBody').setAttribute('fill', button.dataset.body);
      detailIds.forEach((id) => $(`#${id}`).setAttribute('fill', button.dataset.detail));
      $('#swName').textContent = button.dataset.name;
      bag.setAttribute('aria-label', `Mochila táctica urbana en color ${button.dataset.name.toLowerCase()}`);
    });
  });
}
