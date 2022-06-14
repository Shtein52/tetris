import loader from "../loader/loader.js";

class Main {
  constructor() {
    this.render = async (form) => {
      await loader.mountURL(form, `/components/main/main.html`);
      this.components = {        
      
      };      
    };
  }
}

const main = new Main();
export default main;
