import foo from './foo';
import "./foo.css";
import "./foo.ts";
import "./foo.vue";
import "./foo.tsx";
import "./foo.scss";
import "./foo.less";

const dynamicImport = import("./dynamic-import.js");
const commonjs = require("./commonjs.js");

__export__ = foo;

export default foo;
