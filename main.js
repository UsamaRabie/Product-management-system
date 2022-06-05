let title     = document.getElementById('title');
let price     = document.getElementById('price');
let taxes     = document.getElementById('taxes');
let ads       = document.getElementById('ads');
let discount  = document.getElementById('discount');
let total     = document.getElementById('total');
let count     = document.getElementById('count');
let category  = document.getElementById('category');
let create    = document.getElementById('create');

let mood = 'create';
let temp;
// total price
function getTotal()
{
    if(price.value != '')
    {
        let result = +price.value + +taxes.value + +ads.value - +discount.value ;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else
    {
        total.innerHTML = '';
         total.style.background = '#FF0000';
    }
  
}


// create product
let dataProduct;
if(localStorage.product!=null)
    {
        dataProduct = JSON.parse(localStorage.product)
    }
    else
    {
         dataProduct = [];
    }

create.onclick = function (){
    let newProduct = {
        title:title.value.toLowerCase() ,
        price:price.value ,
        taxes:taxes.value ,
        ads:ads.value ,
        discount:discount.value ,
        total:total.innerHTML ,
        count:count.value ,
        category:category.value.toLowerCase() 
    }
    if(title.value!=''&&price.value!=''&&category.value!='')
    {
        if(mood=='create')
        {
            if(newProduct.count>1)
            {
                for(i = 0 ; i<newProduct.count ; i++)
                {
                    dataProduct.push(newProduct);
                }
            }
            else
            {
            dataProduct.push(newProduct);
            }
        }
        else
        {
            mood = 'create';
            dataProduct[temp]=newProduct;
            count.style.display='block';
            
            create.innerHTML='Create';
            
        }
           clearData();

    }
    // save local storage
    localStorage.setItem('product' , JSON.stringify(dataProduct));
    showData();

    getTotal();
}




// show data 


function showData()
{
     getTotal();
    
    let table = '';
    for(i = 0 ; i<dataProduct.length ;i++)
    {
        table += 
        `
        <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" class="btn">Update</button></td>
            <td>
            <button onclick="deleteProduct(${i})" class="btn">Delete</button>
            </td>
          </tr>
        `

      
    }
     document.getElementById('tbody').innerHTML = table;
        let deleteAll = document.getElementById('deleteAll');
        if(dataProduct.length > 0)
        {
            
            deleteAll.innerHTML = `
            <button id="btnDelete" onclick="deleteAllData()">Delete All (${dataProduct.length})</button>
            `
        }
        else
        {
            deleteAll.innerHTML = ''; 
        }

        total.style.background='#FF0000'
    
}

showData();

// claer inputs
function clearData()
{
        title.value = '' ;
        price.value = '' ;
        taxes.value = '' ;
        ads.value   =  '';
        discount.value =  '' ;
        total.innerHTML =  '';
        count.value =  '' ;
        category.value =  '';
}




// delete product
 function deleteProduct(i){
     dataProduct.splice(i , 1);
     localStorage.product = JSON.stringify(dataProduct);
     showData();
 }


 // Delete All products
 function deleteAllData()
 {
    
     localStorage.clear();
      dataProduct.splice(0);
     showData();
 }


 // Update
 function updateData(i)
 {
  
    title.value=dataProduct[i].title;
    price.value=dataProduct[i].price;
    taxes.value=dataProduct[i].taxes;
    ads.value=dataProduct[i].ads;
    discount.value=dataProduct[i].discount;
    category.value=dataProduct[i].category;
 
    count.style.display='none';
    create.innerHTML='Update';
    mood = 'update'
    temp = i;
    scroll({top : 0 , behavior:"smooth"});
    showData();
   
       getTotal();
 }
 


 // search
 let searchMode = 'title';
 function getSearchMode(id){
     let search = document.getElementById('search');
     if(id == 'searchTitle' ){
         searchMode='title';
     }
     else
     {
         searchMode='category';
     }
     search.focus();

     search.placeholder='Search by '+searchMode

     search.value = '';
     showData();
 }


 function searchData(value)
 {
     let table = '';
     for(let i = 0 ; i<dataProduct.length ; i++)
     {
         if(searchMode == 'title')
         {
            if(dataProduct[i].title.includes(value.toLowerCase() ))
            {
             table += 
                `
                <tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" class="btn">Update</button></td>
                    <td>
                    <button onclick="deleteProduct(${i})" class="btn">Delete</button>
                    </td>
                </tr>
                `;
            }
         }
         else
         {
            if(dataProduct[i].category.includes(value.toLowerCase() ))
            {
              table += 
                        `
                        <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button onclick="updateData(${i})" class="btn">Update</button></td>
                            <td>
                            <button onclick="deleteProduct(${i})" class="btn">Delete</button>
                            </td>
                        </tr>
                        `;
            }
         } 
     }
      document.getElementById('tbody').innerHTML = table;
 }