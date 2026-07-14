import "./styles/reset.css";
import "./styles/global.css";
import { makeElement } from "./domHelper.js";
import { setupController } from "./controller.js";

const body = document.querySelector("body");

const header = makeElement("header","header");
const main = makeElement("main","main");
const navBar = makeElement("nav","navBar");
const footer = makeElement("footer","footer");

const newPrjct = makeElement("button","newPrjct button","New Project");
const newTodo = makeElement("button","newTodo button","New To-Do");

body.append(header, main, footer);
header.append(newPrjct, newTodo);
main.append(navBar);

setupController();