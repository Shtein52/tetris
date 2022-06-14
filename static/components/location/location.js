function query() {
  const res = {};  
  const qa = window.location.search.split('?');
  const search = qa[1] ?? qa[0];
  const sa = search.split("&");
  for (const attr of sa) {
    const [name, value] = attr.split('=');
    res[name] = value;
  }
  return res;
}

export default {
  query
}