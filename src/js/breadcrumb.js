export function updateBreadcrumb(data) {
  const breadcrumbEl = document.getElementById('breadcrumbs');
  if (!breadcrumbEl) return;

  // Clear previous content
  breadcrumbEl.innerHTML = '';

  // Hide breadcrumb on home page or if no data
  if (!data || data.pageType === 'home') {
    breadcrumbEl.style.display = 'none';
    return;
  }

  breadcrumbEl.style.display = 'block';

  if (data.pageType === 'category') {
    // e.g. "Tents -> (24 items)"
    breadcrumbEl.textContent = `${data.category} -> (${data.productCount} items)`;
  } else if (data.pageType === 'product') {
    // e.g. "Tents" (just category name)
    breadcrumbEl.textContent = data.category || '';
  } else if (data.pageType === 'register') {
    breadcrumbEl.textContent = data.pageType || '';
  }
}
