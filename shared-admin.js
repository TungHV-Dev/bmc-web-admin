(() => {
  const page = document.body.dataset.page || 'dashboard';
  const SESSION_KEY = 'bmc_admin_session_v1';
  const WINDOW_PREFIX = 'BMC_ADMIN_SESSION:';
  const defaultSession = { authenticated: false, name: '' };
  function readSession() {
    try {
      if (window.name.startsWith(WINDOW_PREFIX)) return { ...defaultSession, ...JSON.parse(window.name.slice(WINDOW_PREFIX.length)) };
      const saved = localStorage.getItem(SESSION_KEY); if (saved) return { ...defaultSession, ...JSON.parse(saved) };
    } catch (_) { /* Demo vẫn hoạt động nếu trình duyệt chặn storage trên file://. */ }
    return { ...defaultSession };
  }
  function writeSession(next) {
    const session = { ...defaultSession, ...next }; window.name = WINDOW_PREFIX + JSON.stringify(session);
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (_) {}
  }
  function clearSession() {
    window.name = '';
    try { localStorage.removeItem(SESSION_KEY); } catch (_) {}
  }
  const session = readSession();

  if (page !== 'login' && !session.authenticated) { location.href = 'login.html'; return; }
  if (page === 'login' && session.authenticated) { location.href = 'index.html'; return; }

  const iconDefs = `
    <svg class="sr-only" aria-hidden="true" width="0" height="0"><defs>
      <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M14 7l5 5-5 5"/></symbol>
      <symbol id="i-chevron" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></symbol>
      <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></symbol>
      <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 8.5a3.2 3.2 0 1 1 3 4.4M21.5 20a5.8 5.8 0 0 0-5-5.6"/></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l8 3.5v5c0 5-3.4 8.6-8 9.5-4.6-.9-8-4.5-8-9.5v-5z"/><path d="m9 12 2 2 4-4"/></symbol>
      <symbol id="i-exam" viewBox="0 0 24 24"><path d="M7 3h10v4H7zM5 5H4a1 1 0 0 0-1 1v14h16V6a1 1 0 0 0-1-1h-1M7 12h10M7 16h7"/></symbol>
      <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z"/></symbol>
      <symbol id="i-layout" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/></symbol>
      <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></symbol>
      <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
      <symbol id="i-edit" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></symbol>
      <symbol id="i-trash" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/></symbol>
      <symbol id="i-key" viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3M13 10l3 3"/></symbol>
      <symbol id="i-bell" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></symbol>
      <symbol id="i-logout" viewBox="0 0 24 24"><path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9"/></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
      <symbol id="i-download" viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></symbol>
      <symbol id="i-move" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/></symbol>
      <symbol id="i-home" viewBox="0 0 24 24"><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/></symbol>
      <symbol id="i-file" viewBox="0 0 24 24"><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 13h6M9 17h5"/></symbol>
      <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></symbol>
      <symbol id="i-award" viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"/><path d="m8.5 12.5-2 8 5.5-3 5.5 3-2-8"/></symbol>
      <symbol id="i-history" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 8v4l3 2"/></symbol>
    </defs></svg>`;
  document.body.insertAdjacentHTML('afterbegin', iconDefs);

  if (page === 'login') return;

  const navGroups = [
    { label: 'Tổng quan', links: [['dashboard', 'index.html', 'i-grid', 'Dashboard']] },
    { label: 'Người dùng & phân quyền', links: [
      ['users', 'users.html', 'i-users', 'Người dùng'],
      ['roles', 'roles.html', 'i-shield', 'Vai trò & quyền'],
      ['login-history', 'login-history.html', 'i-history', 'Lịch sử đăng nhập']
    ] },
    { label: 'Học liệu', links: [
      ['question-bank', 'question-bank.html', 'i-exam', 'Kho đề thi/câu hỏi'],
      ['courses', 'courses.html', 'i-book', 'Khoá học'],
      ['classes', 'classes.html', 'i-calendar', 'Lớp học']
    ] },
    { label: 'Chứng nhận', links: [
      ['certificates', 'certificates.html', 'i-award', 'Chứng chỉ & huy hiệu']
    ] },
    { label: 'Nội dung website', links: [
      ['content', 'content.html', 'i-layout', 'Trang chủ · Sách · Tài liệu']
    ] },
    { label: 'Hệ thống', links: [
      ['security', 'security.html', 'i-lock', 'Bảo mật & TOTP']
    ] }
  ];
  const activeGroup = page === 'course-builder' ? 'courses' : page;
  const navHtml = navGroups.map(g => `<div class="admin-nav-group"><span>${g.label}</span><div class="links">${
    g.links.map(([id, href, icon, label]) => `<a class="${activeGroup === id ? 'active' : ''}" href="${href}"><svg class="icon"><use href="#${icon}"/></svg>${label}</a>`).join('')
  }</div></div>`).join('');

  const shell = `
    <div class="admin-shell">
      <aside class="admin-sidebar" id="adminSidebar">
        <a class="admin-sidebar-brand" href="index.html"><span class="brand-mark"><img src="assets/logo.jpeg" alt=""></span><span><strong>BMC Admin</strong><span>Bảng điều khiển demo</span></span></a>
        <nav class="admin-nav" aria-label="Điều hướng quản trị">${navHtml}</nav>
        <div class="admin-sidebar-foot">Web Admin — dữ liệu và quyền hạn trong bản demo này chỉ mang tính minh hoạ.</div>
      </aside>
      <div class="admin-main">
        <header class="admin-topbar">
          <button class="icon-btn sidebar-toggle" type="button" data-sidebar-toggle aria-label="Mở menu"><svg class="icon"><use href="#i-menu"/></svg></button>
          <div class="inline-search"><input id="adminGlobalSearch" placeholder="Tìm người dùng, khoá học, đề thi…"><svg class="icon"><use href="#i-search"/></svg></div>
          <div style="flex:1"></div>
          <button class="icon-btn" type="button" aria-label="Thông báo"><svg class="icon"><use href="#i-bell"/></svg></button>
          <button class="avatar-btn" type="button" data-logout><span class="avatar">AD</span><span><strong>Admin BMC</strong><small>Quản trị viên</small></span></button>
        </header>
        <main class="admin-content" id="adminContent"></main>
      </div>
    </div>
    <div class="toast" id="toast" role="status"></div>`;
  document.querySelector('[data-admin-shell]')?.insertAdjacentHTML('afterbegin', shell);

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const pageTemplate = document.querySelector('template[data-page-content]');
  if (pageTemplate) $('#adminContent').appendChild(pageTemplate.content.cloneNode(true));

  $('[data-sidebar-toggle]')?.addEventListener('click', () => $('#adminSidebar').classList.toggle('open'));
  $$('[data-logout]').forEach(x => x.addEventListener('click', () => { clearSession(); location.href = 'login.html'; }));

  let toastTimer;
  window.bmcAdminToast = message => {
    const t = $('#toast'); clearTimeout(toastTimer);
    t.textContent = message; t.classList.add('show');
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  };
  $$('[data-toast]').forEach(x => x.addEventListener('click', e => { if (x.tagName === 'A') e.preventDefault(); window.bmcAdminToast(x.dataset.toast); }));

  window.bmcAdmin = { $, $$, session, writeSession, clearSession };
})();
