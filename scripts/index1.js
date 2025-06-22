 
// js code for detecting if the user has connected
window.onload=function()
{
  if(window.navigator.onLine)
  {
    onLine();
  }
  else{
     offLine();
  }
}
function onLine()
{
   document.querySelector(".product-box").style.display='block';
   document.querySelector(".bag span").style.display='inline';
   document.querySelector(".connect").style.display="none";
   document.querySelector(".evaluation ").style.display="block";
}
function offLine()
{
      document.querySelector(".product-box").style.display='none';
      document.querySelector(".bag span").style.display='none';
      document.querySelector(".connect").style.display="block";
      document.querySelector(".evaluation ").style.display="none";
}
window.addEventListener('online',function(){
  onLine();
})
window.addEventListener('offline',function(){
    offLine();
})

// js code for detecting the scroll
let btnScroll=document.querySelector(".scroll");
btnScroll.style.display='none';
onscroll=function()
{
    if(scrollY>=800)
    {
         btnScroll.style.display='block';
    }
    else{
        btnScroll.style.display='none';
    }
}
btnScroll.onclick=function()
{
     scroll({
    top:0,
    behavior:'smooth'
 })
}
// js code for geting the total price
const total = document.querySelector(".total");
let box=document.querySelector(".box");
let dataPro=[];
//  localStorage.clear();
// js code for comment and feedback
function control()
{
  let keyArray=Object.keys(localStorage);
  for(var i in keyArray)
  {
    if(keyArray[i]==="counter1")
    {
      document.querySelector(".evaluation .reaction span .counter1").textContent=localStorage.getItem(keyArray[i]);
    }
    if(keyArray[i]==="counter2")
    { 
      document.querySelector(".evaluation .reaction span .counter2").textContent=localStorage.getItem(keyArray[i]);
    }
    if(keyArray[i]==="products")
    {
       dataPro= JSON.parse(localStorage.getItem(keyArray[i]));
       box.innerHTML='';
         for(let j=0;j<dataPro.length;j++)
  {
    document.querySelector(".box").innerHTML += `
    <div class="div"> 
      <div class="imgBox">
              <img src=" ${dataPro[j].image}">
             </div>
             <div class="price"> ${dataPro[j].price}$</div>
             <span class="trash" onclick="deleteProduct(${dataPro[j].price},${j})"><i class="fa-solid fa-trash"></i></span>
    </div>
   `;
  }
  // total price 
    let  totalPrice;
    total.textContent=localStorage.getItem("price");
    totalPrice = +(total.textContent);
    total.textContent = totalPrice.toFixed(3);

    }
  }
}
control();
function goodCounter()
{
  let counter1=document.querySelector(".evaluation .reaction span .counter1");
  number=+counter1.textContent;
  number+=1;
  counter1.textContent=number;
  localStorage.setItem("counter1",number);
}
let commentBtn=document.querySelector('.evaluation .commentSubmit');
commentBtn.style.display='none';
function badCounter()
{
  let counter2=document.querySelector(".evaluation .reaction span .counter2");
  number=+counter2.textContent;
  number+=1;
  counter2.textContent=number;
  commentBtn.style.display='block';
  localStorage.setItem("counter2",number);
}

 
// java script code for fetching the data from server using api method and show them on the box
let ProductBox=document.querySelector('.product-box .row');
const api="https://fakestoreapi.com/products";
let searchArray=[];
async function getProduct()
{
    let response =await fetch(api);
    let data=await response.json();
    searchArray=data;
    data.map((content,index)=>
    {
        ProductBox.innerHTML+=` <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
              <div class="card m-auto">
                <img src="${content.image}" alt="this is a product image" loading="lazy">
                <div class="card-body">
                  <div class="description mt-3 mb-3">
                   ${content.title}
                  </div>
                  <span class="price">${content.price}$</span>
                  <div class="select mt-3">
                    <button class="btn btn-outline-success" onclick="showInfOnCardBox(${index})">select</button>
                  </div>
                </div>
              </div>
            </div>`;
    });
};
getProduct();
// js code for showing the card box
let cardBox=document.querySelector(".cardBox");
function showCardBox()
{ 
   cardBox.classList.add("inf");
   document.querySelector(".bag span").style.display='none';
}
// js code for showing the information on the box
   async function showInfOnCardBox(i) {
   const response = await fetch(api);
  const data = await response.json();
  box.innerHTML='';
  dataPro.push(data[i]);
  localStorage.setItem("products",JSON.stringify(dataPro));
  for(let i=0;i<dataPro.length;i++)
  {
    document.querySelector(".box").innerHTML += `
    <div class="div"> 
      <div class="imgBox">
              <img src=" ${dataPro[i].image}">
             </div>
             <div class="price"> ${dataPro[i].price}$</div>
             <span class="trash" onclick="deleteProduct(${dataPro[i].price},${i})"><i class="fa-solid fa-trash"></i></span>
    </div>
   `;
  }
  // total price 
   let  totalPrice;
  totalPrice = +(total.innerHTML);
  totalPrice += +(data[i].price);
  total.innerHTML = totalPrice.toFixed(3);
  localStorage.setItem("price",totalPrice);
  showCardBox();
}
// js code for hiding the cardBox
function hideCardBox()
{
  cardBox.classList.remove("inf");
  document.querySelector(".bag span").style.display='inline';
}
// js code for deleting the product of the cardBox
   function  deleteProduct(price,i)
   {
         var totalPrice;
        if(+(total.innerHTML)>0)
 {
          totalPrice = +(total.innerHTML);
          totalPrice-=price;
          localStorage.setItem("price",totalPrice);
          total.innerHTML = totalPrice.toFixed(3);
 }
       dataPro.splice(i,1);
       localStorage.setItem("products",JSON.stringify(dataPro));
       box.innerHTML='';
   for(let i=0;i<dataPro.length;i++)
 {
        document.querySelector(".box").innerHTML += `
   <div class="div"> 
     <div class="imgBox">
             <img src=" ${dataPro[i].image}">
            </div>
            <div class="price"> ${dataPro[i].price}$</div>
            <span class="trash" onclick="deleteProduct(${dataPro[i].price},${i})"><i class="fa-solid fa-trash"></i></span>
   </div>
  `;
 }
}
// js code for searching on the products
let inpSearch=document.querySelector(".inp-search");
function search()
{
     for(let i=0;i<searchArray.length;i++)
  {
    if(inpSearch.value!='')
    {
      if(searchArray[i].title.includes(inpSearch.value))
      {
         ProductBox.innerHTML='';
                 ProductBox.innerHTML+=` <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
              <div class="card m-auto">
                <img src="${searchArray[i].image}" alt="this is a product image">
                <div class="card-body">
                  <div class="description mt-3 mb-3">
                   ${searchArray[i].title}
                  </div>
                  <span class="price">${searchArray[i].price}$</span>
                  <div class="select mt-3">
                    <button class="btn btn-outline-success" onclick="showInfOnCardBox(${i})">select</button>
                  </div>
                </div>
              </div>
            </div>`;
      }
    }
  }
}

inpSearch.addEventListener("keydown",function(event)
{
   if(event.key==="Enter")
   {
    event.preventDefault();
      search();
   }
});

inpSearch.addEventListener("keyup",(e)=>
{
  e.preventDefault();
  if(inpSearch.value==='')
  {
    getProduct();
  }
  search();
})
