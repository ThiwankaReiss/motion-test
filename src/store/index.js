import { proxy } from "valtio";
const state=proxy({
    customer:null,
    navButton:1,
    themeColor:'#152238'
});
export default state;