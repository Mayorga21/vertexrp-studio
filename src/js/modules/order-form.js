import { $, selectContents } from '../utils/dom.js';
import { copyText } from '../utils/clipboard.js';
import { isConfigured, insertOrder } from '../services/supabase.js';
import { getSelectedProduct, syncSummary } from './order-summary.js';

const MANUAL_MESSAGE =
  'Copia el texto y envíalo por mensaje directo en Instagram a VertexRP Studio. ' +
  'Te responderemos por Discord para confirmar detalles y pago antes de iniciar.';
const SENT_MESSAGE =
  'Recibimos tu solicitud. Te escribiremos por Discord para confirmar detalles y pago antes de iniciar el modelado.';

function setError(id, message) {
  $(`#e-${id}`).textContent = message;
  $(`#${id}`).setAttribute('aria-invalid', message ? 'true' : 'false');
}

function buildMessage({ product, servidor, discord, estilo }) {
  return [
    'Solicitud de encargo para VertexRP Studio',
    `Producto: ${product.name} (${product.price}, precio de referencia)`,
    `Servidor: ${servidor}`,
    `Discord para el soporte: ${discord}`,
    `Estilo: ${estilo || 'Sin descripción por ahora'}`,
    'Adjunto logos o referencias en este mensaje: sí / no',
  ].join('\n');
}

function showResult({ title, message, text, canCopy }) {
  $('#resTitle').textContent = title;
  $('#resMsg').textContent = message;
  $('#resultText').textContent = text;
  $('#copyBtn').hidden = !canCopy;
  $('#copyStatus').textContent = '';
  const box = $('#result');
  box.hidden = false;
  box.focus();
}

export function initOrderForm() {
  const form = $('#reqForm');
  if (!form) return;
  const submitBtn = $('#submitBtn');
  const live = isConfigured();
  if (live) submitBtn.textContent = 'Enviar solicitud';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if ($('#web').value) return; // campo trampa para bots

    const servidor = $('#servidor').value.trim();
    const discord = $('#discord').value.trim();
    setError('servidor', servidor ? '' : 'Escribe el nombre de tu servidor.');
    setError('discord', discord ? '' : 'Escribe tu usuario de Discord para el soporte.');
    if (!servidor) return $('#servidor').focus();
    if (!discord) return $('#discord').focus();

    const product = getSelectedProduct();
    const estilo = $('#estilo').value.trim();
    const text = buildMessage({ product, servidor, discord, estilo });

    if (!live) {
      return showResult({ title: 'Tu solicitud está lista para enviar', message: MANUAL_MESSAGE, text, canCopy: true });
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    try {
      await insertOrder({ producto: product.name, precio: product.price, servidor, discord, estilo: estilo || null });
      showResult({ title: 'Solicitud enviada', message: SENT_MESSAGE, text, canCopy: false });
      form.reset();
      syncSummary();
    } catch {
      showResult({ title: 'No pudimos enviar tu solicitud', message: `Hubo un problema de conexión. ${MANUAL_MESSAGE}`, text, canCopy: true });
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar solicitud';
    }
  });

  $('#copyBtn').addEventListener('click', async () => {
    const copied = await copyText($('#resultText').textContent);
    if (copied) {
      $('#copyStatus').textContent = 'Solicitud copiada.';
    } else {
      selectContents($('#resultText'));
      $('#copyStatus').textContent = 'Texto seleccionado. Cópialo con Ctrl+C o con el menú de tu teléfono.';
    }
  });
}
