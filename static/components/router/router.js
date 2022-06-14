const ROUTE_CHANGE = "route.change";

function routeHandler(event) {
  event.preventDefault();
  matchRoute(gMountPoint, gRouterPoint, this, gRoutes);
}

function getRouteLinks(mountPoint) {
  return mountPoint.querySelectorAll("a.route");
}

function getRoute(routes = gRoutes, path = window.location.pathname) {
  let defRoute = null;
  for (const route of routes) {
    const mt = match(path, route);
    if (mt == null) continue;
    const dr = { ...route, path, param: mt.groups };
    if (defRoute == null) defRoute = { ...dr, matched: [dr] };
    else defRoute.matched.push(dr);
  }
  return defRoute;
}

function getLocalPath(path) {
  const origin = window.location.origin;
  const pArr = path.split(origin);
  if (pArr.length > 1) return pArr[1];
  return path;
}

function setRouteLinkActive(routeLinks, routes, path) {
  const route = getRoute(routes, path);
  for (const link of routeLinks) {
    const lPath = getLocalPath(link.href);
    if (route.matched.find((m) => m.path == lPath))
      link.classList.add("active");
    else link.classList.remove("active");
  }
}

function match(path, route) {
  if (route == null) return null;
  if (route.path == null) return { groups: {} };
  return route.path.exec(path);
}

function matchRoute(mountPoint, routerPoint, link, routes) {
  const lPath = getLocalPath(link.href);
  setRoute(mountPoint, routerPoint, routes, lPath);
  setHistory(link.href);
}

let gCurrent = null;
let initResolver = null;

const routerInitP = new Promise((resolve) => {
  initResolver = resolve;
});

async function current() {
  await routerInitP;
  return gCurrent;
}

async function setRoute(mountPoint, routerPoint, routes, path) {
  const route = getRoute(routes, path);
  const routeLinks = getRouteLinks(mountPoint);
  setRouteLinkActive(routeLinks, routes, path);
  if (route == null) return;
  gCurrent = route;
  initResolver();
  await route.component.render(routerPoint, route);
  updateRouteLinks(mountPoint);
  const event = new CustomEvent(ROUTE_CHANGE, { detail: route });
  window.dispatchEvent(event);
}

function setHistory(path) {
  window.history.pushState(null, null, path);
}

let gRoutes = [];
let gMountPoint = null;
let gRouterPoint = null;

function updateRouteLinks(mountPoint = gMountPoint) {
  const routeLinks = getRouteLinks(mountPoint);
  for (const link of routeLinks) {
    link.removeEventListener("click", routeHandler);
    link.addEventListener("click", routeHandler);
  }
}


function update(
  mountPoint = gMountPoint,
  routerPoint = gRouterPoint,
  routes = gRoutes
) {
  gMountPoint = mountPoint;
  gRouterPoint = routerPoint;
  gRoutes = routes;
  updateRouteLinks(mountPoint);
  setRoute(mountPoint, routerPoint, routes);
}

window.onpopstate = function () {
  update(gMountPoint, gRouterPoint, gRoutes);
};

function goto(path) {
  setRoute(gMountPoint, gRouterPoint, gRoutes, path);
  setHistory(path);
}

export default {
  update,
  on: {
    change: (callback) => {
      window.addEventListener(ROUTE_CHANGE, callback);
    }
  },
  off: {
    change: (callback) => {
      window.removeEventListener(ROUTE_CHANGE, callback);
    }
  },
  current,
  goto,
  updateRouteLinks
};
