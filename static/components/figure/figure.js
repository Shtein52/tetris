function create(index) {
  const fig = window.document.createElement("div");
  fig.className = `figure type${index}`;
  fig.innerHTML = `
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  `;
  return fig
}


export default {
  create
}
