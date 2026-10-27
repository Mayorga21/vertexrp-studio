import { initProductSwatches } from './modules/product-swatches.js';
import { initOrderSummary } from './modules/order-summary.js';
import { initOrderForm } from './modules/order-form.js';

// Los módulos se ejecutan cuando el HTML ya está cargado.
initProductSwatches();
initOrderSummary();
initOrderForm();
