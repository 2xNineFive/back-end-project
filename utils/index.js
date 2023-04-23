function setMainView(view) {
   return {
        footer: "partials/footer",
        header: "partials/header",
        main: `partials/main/${view}`
      }
}


function setNavs (currentHref, navs, isAuthenticated) {
    const _navs = navs.map(nav => {
        nav.className = '';
        if (nav.href === currentHref) {
            nav.className = "active"
        }
        return nav;
    }).filter(nav => {
        if(!isAuthenticated) {
            // show public nav items
            return !nav.isPrivate
        } else {
            // show public and private, except for login
            return nav.isPrivate || nav.isPrivate === undefined;
        }
    }) 
    return {navs: _navs};
}


module.exports = { setMainView, setNavs};