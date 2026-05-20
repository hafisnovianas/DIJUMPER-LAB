export function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const bgClass = type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                    type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' :
                    'bg-sky-50 border-sky-200 text-sky-800';
    
    const iconClass = type === 'success' ? 'fa-check-circle text-emerald-500' :
                      type === 'error' ? 'fa-triangle-exclamation text-rose-500' :
                      'fa-info-circle text-sky-500';

    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border ${bgClass} shadow-lg pointer-events-auto transform transition-all duration-300 translate-y-2 opacity-0 max-w-sm`;
    toast.innerHTML = `
        <i class="fa-solid ${iconClass} text-lg"></i>
        <p class="text-xs font-semibold font-mono">${message}</p>
        <button class="ml-auto text-slate-400 hover:text-slate-600" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);
    
    // Trigger animation in
    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 50);

    // Trigger animation out
    setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

export function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}