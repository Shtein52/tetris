import main from "./components/main/main.js";

export default [
    { path: /^\/$/i, component: main },        
    { path: /^\/index.html$/i, component: main }
];
