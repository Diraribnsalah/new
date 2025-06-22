// java script code for fetching the data from server using api method and show them on the box
let ProductBox=document.querySelector('.product-box .row');
const api="https://fakestoreapi.com/products";
async function getProduct()
{
    let response =await fetch(api);
    let data=await response.json();
    data.map((content,index)=>
    {
        ProductBox.innerHTML+=` <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
              <div class="card m-auto">
                <img src="${content.image}" alt="this is a product image">
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
   const total = document.querySelector(".total");
   let dataPro=[];
   async function showInfOnCardBox(i) {
   const response = await fetch(api);
  const data = await response.json();
  cart.innerHTML='';
  dataPro.push(data[i]);
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
  var totalPrice;
  totalPrice = +(total.innerHTML);
  totalPrice += +(data[i].price);
  total.innerHTML = totalPrice.toFixed(3);
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
          total.innerHTML = totalPrice.toFixed(3);
 }
       dataPro.splice(i,1);
       document.querySelector('.box').innerHTML='';
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





 box.innerHTML='';
        for(let i=0;i<proArray.length;i++)
  {
    box.innerHTML += `
    <div class="div"> 
      <div class="imgBox">
              <img src=" ${proArray[i].image}">
             </div>
             <div class="price"> ${proArray[i].price}$</div>
             <span class="trash" onclick="deleteProduct(${proArray[i].price},${i})"><i class="fa-solid fa-trash"></i></span>
    </div>
   `;
  }
  let  totalPrice;
  totalPrice = +(total.innerHTML);
  totalPrice += +(data[i].price);
  total.innerHTML = totalPrice.toFixed(3);