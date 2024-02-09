function setSidebarState(isFixed) {
    sessionStorage.setItem('sidebarFixed', isFixed);
}

function toggleSidebar() {
    const body = document.body;
    const isSidebarFixed = body.classList.contains('fixed-sidebar');

    body.classList.toggle('fixed-sidebar', !isSidebarFixed);
    setSidebarState(!isSidebarFixed);
}

function checkSidebarState() {
    const body = document.body;
    const isSidebarFixed = sessionStorage.getItem('sidebarFixed') === 'true';
    body.classList.toggle('fixed-sidebar', isSidebarFixed);
}

checkSidebarState();
