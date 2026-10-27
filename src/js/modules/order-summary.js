import { $, $$ } from '../utils/dom.js';

const productInputs = () => $$('input[name="producto"]');

/** Devuelve el producto elegido como { name, price }. */
export function getSelectedProduct() {
  const [name, price] = $('input[name="producto"]:checked').value.split('|');
  return { name, price };
}

/** Refleja el producto elegido en el resumen lateral. */
export function syncSummary() {
  const { name, price } = getSelectedProduct();
  $('#sumName').textContent = name;
  $('#sumPrice').textContent = price;
}

/** Actualiza el resumen al cambiar de producto y al pulsar "Solicitar" desde el catálogo. */
export function initOrderSummary() {
  productInputs().forEach((input) => input.addEventListener('change', syncSummary));
  $$('[data-pick]').forEach((link) => {
    link.addEventListener('click', () => {
      productInputs()[link.dataset.pick === 'vehiculo' ? 1 : 0].checked = true;
      syncSummary();
    });
  });
}
