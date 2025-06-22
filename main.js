 
 let title=document.getElementById('title');
 let price=document.getElementById('price');
 let taxes=document.getElementById('taxes');
 let ads=document.getElementById('ads');
 let discount=document.getElementById('discount');
 let category=document.getElementById('category');
 let count=document.getElementById('count');
 let total=document.getElementById('total');
 let submit=document.getElementById('submit');
 let mood='create';
 let tmp;
 function TOTAL(){
    if(price.value!=''){
   let result=( +price.value+ +taxes.value+ +ads.value)- +discount.value;
   total.innerHTML=result; 
   total.style.background='green'; 
    }else{
       total.innerHTML='';
       total.style.background=' #a00d02';
    } 
 }
 let datapro;
 if(localStorage.length>0){
    datapro=JSON.parse(localStorage.product);
 }else{
  datapro=[];
 }
  submit.onclick=function(){
    let dict={title:title.value ,
       price:price.value,
       taxes:taxes.value,
       ads:ads.value,
       discount:discount.value,
       total:total.innerHTML,
       count:count.value,
       category:category.value }
      if(title.value!=''&& price.value!=''&& category.value!='' && count.value<100){
       if(mood==='create'){
          if(dict.count>1){
             for(let i=0;i<dict.count;i++){
             datapro.push(dict);
             }
          }else{
             datapro.push(dict);
             mood='create';
             submit.innerHTML='create';
             count.style.dislay='block';
          } 
        }else{
          datapro[tmp]=dict;
          count.style.display='inline';
          submit.innerHTML='create';
        }
        DeletData();
      }
       localStorage.setItem('product',JSON.stringify(datapro));
       
       showData();
  }
  function DeletData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
  }
 function showData()
 {
 
 let table='';
 for(let i=0;i<datapro.length;i++){
    table += `<tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="UpdateData(${i})" id="update">update</button></td>
       <td><button onclick="DeleteProd(${i})" id="delete">delete</button></td>`
 
 }
 document.getElementById('tbody').innerHTML=table;
 let deleteAll=document.getElementById('deleteAll');    
 if(datapro.length>0) {
 deleteAll.innerHTML=`<button onclick="deleteAll()">deleteAll</button>`;
 } else{
   deleteAll.innerHTML=''; 
 }
    
 } 
 showData();
 function DeleteProd(i)
 {
  datapro.splice(i,1);
  localStorage.product=JSON.stringify(datapro);
  showData();
 }  
  function deleteAll()
  {
    localStorage.clear();
    datapro.splice(0);
    showData();
  }
  
 function UpdateData(i)
 {
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads; 
    discount.value=datapro[i].discount;
    TOTAL();
    count.style.display= 'none';
    category.value=datapro[i].category;
 submit.innerHTML='update';
 mood='update';
 tmp=i; 
 scroll({
    top:0,
    behavior:'smooth'
 })
 }
 let searchMood='title';
 function getSreachMood(id)
 {
    let search =document.getElementById('search');
 if(id=='searchTitle'){
    searchMood='title';
    search.placeholder='search By Title';
 }else{
    searchMood='category';
    search.placeholder='search By category'; 
 }
 search.focus();
 search.value='';
 }
 function  searchProd(value)
 {
    let table='';
    if(searchMood=='title'){
  for(let i=0;i<datapro.length;i++){
    if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
    table += `<tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="UpdateData(${i})" id="update">update</button></td>
       <td><button onclick="DeleteProd(${i})" id="delete">delete</button></td>`;
    }
  }
    }else{
       for(let i=0;i<datapro.length;i++){
          if(datapro[i].category.toLowerCase().includes(value.toLowerCase())){
          table += `<tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td>
          <td><button onclick="UpdateData(${i})" id="update">update</button></td>
             <td><button onclick="DeleteProd(${i})" id="delete">delete</button></td>`;
          }
        }
    }
    document.getElementById('tbody').innerHTML=table;
 }