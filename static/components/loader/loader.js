async function mountURL(mountPoint, url) {  
  mountPoint.innerHTML = await loadHTML(url);
}

async function loadHTML(url) {
  const res = await fetch(url);
  return await res.text();
}


export default {
  mountURL,
  loadHTML
};
