// Admin frontend for SwiftShop
document.addEventListener('DOMContentLoaded', initAdmin);

function getToken(){ return localStorage.getItem('ss_token'); }

async function initAdmin(){
  const notice = document.getElementById('adminNotice');
  const token = getToken();
  if (!token) { notice.textContent = 'Non authentifié. Veuillez vous connecter sur la page principale.'; return; }

  try{
    const meRes = await fetch('/api/me', { headers: { Authorization: 'Bearer ' + token }});
    if (!meRes.ok) { notice.textContent = 'Token invalide. Connectez-vous à nouveau.'; return; }
    const me = await meRes.json();
    if (!me || !me.email) { notice.textContent = 'Token invalide. Connectez-vous à nouveau.'; return; }
    if (me.role !== 'admin') { alert('Accès administrateur requis'); location.href = 'index.html'; return; }
    notice.textContent = `Connecté en tant que ${me.name || me.email}`;
    // load data
    await loadProducts();
    await loadOrders();
    document.getElementById('createProductBtn').addEventListener('click', createProduct);

    // Setup admin action listeners
    setupAdminActionListeners();
  } catch(e){ console.error(e); notice.textContent = 'Erreur de vérification. Voir console.'; }
}

async function loadProducts(){
  const token = getToken();
  const res = await fetch('/api/admin/products', { headers: { Authorization: 'Bearer ' + token }});
  if (!res.ok) { console.error('Failed to load products'); return; }
  const data = await res.json();
  const tbody = document.querySelector('#productsTable tbody'); tbody.innerHTML = '';
  (data.products||[]).forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td><input value="${escapeHtml(p.name||'')}" data-id="${p.id}" data-field="name"></td>
      <td><input value="${escapeHtml(p.category||'')}" data-id="${p.id}" data-field="category"></td>
      <td><input value="${p.priceCDF||0}" type="number" data-id="${p.id}" data-field="priceCDF"></td>
      <td>
        <button data-action="save-product" data-product-id="${p.id}" class="button">Save</button>
        <button data-action="delete-product" data-product-id="${p.id}" class="button button--danger">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function createProduct(){
  const token = getToken();
  const name = document.getElementById('pName').value.trim();
  const category = document.getElementById('pCategory').value.trim() || 'other';
  const price = parseInt(document.getElementById('pPrice').value || '0',10);
  if (!name) return alert('Nom requis');
  const res = await fetch('/api/admin/products', { method:'POST', headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify({ name, category, priceCDF: price }) });
  const data = await res.json();
  if (!res.ok) return alert(data.error || 'Erreur création');
  document.getElementById('pName').value=''; document.getElementById('pCategory').value=''; document.getElementById('pPrice').value='';
  await loadProducts();
}

async function saveProduct(id){
  const token = getToken();
  const inputs = Array.from(document.querySelectorAll(`[data-id='${id}']`));
  const payload = {};
  inputs.forEach(i => { const f = i.getAttribute('data-field'); payload[f] = (f==='priceCDF')? parseInt(i.value||0,10) : i.value; });
  const res = await fetch('/api/admin/products/'+id, { method:'PUT', headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(payload) });
  const data = await res.json();
  if (!res.ok) return alert(data.error || 'Erreur sauvegarde');
  await loadProducts();
}

async function deleteProduct(id){
  if (!confirm('Supprimer ce produit ?')) return;
  const token = getToken();
  const res = await fetch('/api/admin/products/'+id, { method:'DELETE', headers:{ Authorization: 'Bearer ' + token }});
  const data = await res.json();
  if (!res.ok) return alert(data.error || 'Erreur suppression');
  await loadProducts();
}

async function loadOrders(){
  const token = getToken();
  const res = await fetch('/api/admin/orders', { headers:{ Authorization: 'Bearer ' + token }});
  if (!res.ok) { console.error('Failed to load orders'); return; }
  const orders = await res.json();
  const tbody = document.querySelector('#ordersTable tbody'); tbody.innerHTML = '';
  (orders||[]).forEach(o => {
    const tr = document.createElement('tr');
    const amount = (o.cart||[]).reduce((s,i)=> s + (i.priceCDF*(i.quantity||1)), 0);
    tr.innerHTML = `
      <td>${o.id}</td>
      <td>${escapeHtml(String(o.customer?.name||o.userId||''))}</td>
      <td>${amount} FC</td>
      <td>${escapeHtml(o.status||'')}</td>
      <td>
        <button data-action="update-order-status" data-order-id="${o.id}" data-status="confirmed" class="button">Confirm</button>
        <button data-action="update-order-status" data-order-id="${o.id}" data-status="cancelled" class="button button--danger">Cancel</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function updateOrderStatus(id, status){
  const token = getToken();
  const res = await fetch(`/api/admin/orders/${id}/status`, { method:'PUT', headers:{ 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify({ status }) });
  const data = await res.json();
  if (!res.ok) return alert(data.error || 'Erreur');
  await loadOrders();
}

/**
 * Setup event listeners for admin data-action elements
 */
function setupAdminActionListeners() {
  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.getAttribute('data-action');
    if (!action) return;

    const productId = e.target.closest('[data-product-id]')?.getAttribute('data-product-id');
    const orderId = e.target.closest('[data-order-id]')?.getAttribute('data-order-id');
    const status = e.target.closest('[data-status]')?.getAttribute('data-status');

    switch (action) {
      case 'save-product':
        if (productId) saveProduct(parseInt(productId));
        break;
      case 'delete-product':
        if (productId) deleteProduct(parseInt(productId));
        break;
      case 'update-order-status':
        if (orderId && status) updateOrderStatus(orderId, status);
        break;
    }
  });
}

function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
