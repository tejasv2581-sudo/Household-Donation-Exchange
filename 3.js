// Household Donation Exchange - plain JS, data saved in localStorage
const CATS = {
  "Furniture":"🪑","Kitchen":"🍳","Clothes":"👕","Books":"📚",
  "Electronics":"🔌","Toys & kids":"🧸","Appliances":"🧺","Other":"📦"
};
const KEY = "hde_items_v1";

const $ = s => document.querySelector(s);
const grid = $("#grid"), empty = $("#empty");

let items = load();

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return seed();
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(items)); }
  catch(e){ toast("Storage full. Try a smaller photo."); }
}
function seed(){
  const now = Date.now();
  return [
    {id:1,title:"Wooden study table",category:"Furniture",condition:"Good",location:"Karnal",desc:"120 x 60 cm, one small scratch on the side.",donor:"Rohit",photo:"",claimed:false,date:now-86400000*3},
    {id:2,title:"Pressure cooker (5 L)",category:"Kitchen",condition:"Like new",location:"Panipat",desc:"Used a few times, gasket replaced.",donor:"Meena",photo:"",claimed:false,date:now-86400000*2},
    {id:3,title:"Class 11-12 PCM books",category:"Books",condition:"Fair",location:"Kurukshetra",desc:"NCERT and some reference books, pages intact.",donor:"Ankit",photo:"",claimed:false,date:now-86400000},
    {id:4,title:"Table fan",category:"Appliances",condition:"Needs repair",location:"Ambala",desc:"Motor works, regulator is faulty.",donor:"Sunita",photo:"",claimed:true,date:now-86400000*5}
  ];
}

// fill dropdowns
function fillCats(){
  const opts = Object.keys(CATS).map(c=>`<option>${c}</option>`).join("");
  $("#fCategory").insertAdjacentHTML("beforeend", opts);
  $("#catSelect").innerHTML = opts;
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));