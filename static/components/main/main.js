import loader from "../loader/loader.js";
import figure from "../figure/figure.js";

class Main {
  constructor() {
    this.render = async (form) => {
      await loader.mountURL(form, `/components/main/main.html`);
      this.components = {        
        game: form.querySelector('.game')
      };

      const fig = figure.create(0);
      fig.style.left = '8rem';
      fig.style.top = '8rem';
      
      this.components.game.appendChild(fig);

      let index = 0;      
      setInterval(() => {
        fig.classList.remove('rotate0');
        fig.classList.remove('rotate1');
        fig.classList.remove('rotate2');
        fig.classList.remove('rotate3');        
        fig.classList.add(`rotate${index}`);
        index = (index == 3) ? index = 0 : index = index + 1;
      }, 500);
    };
  }
}

const main = new Main();
export default main;
