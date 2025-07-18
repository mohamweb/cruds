let title    = document.getElementById('title')
let price    = document.getElementById('price')
let tax      = document.getElementById('taxes')
let ads      = document.getElementById('ads')
let discount = document.getElementById('discount')
let total    = document.getElementById('total')
let count    = document.getElementById('count')
let category = document.getElementById('category')
let submit   = document.getElementById('submit')
let deleteall = document.getElementById('deleteall')
let table = document.getElementById('table')
let showproducts = document.getElementById('showproducts')
let mode = "Create"
let tmp;

// localStorage.clear()
//creat functions
//1- get total

function gettotal(){
    if(price.value <= 0){
        total.innerHTML = ""
        total.style.backgroundColor = "red"
    }
    else if(price.value == '' ){
        total.innerHTML = ""
        total.style.backgroundColor = "blue"
    }
    else{
        total.innerHTML= (+price.value + +tax.value + +ads.value) - + discount.value
        total.style.backgroundColor = "green"
    }
}
price.onkeyup =()=>{
    gettotal()
}
tax.onkeyup =()=>{
    gettotal()
}
ads.onkeyup =()=>{
    gettotal()
}
discount.onkeyup =()=>{
    gettotal()
}

//2- create product
//3- save localstorage

let datapro = [];

if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}
else {
    datapro = []
}

submit.onclick = ()=>{
    if(title.value == '' || price.value == '' || category.value == null || count.value>100){
        window.alert('please fill in the inputs corectlly befor press the create button ياعرص')
    }
    else if(title.value != null && price.value != null && category.value != null && count.value<=100){
    
        let newpro = {
            title:title.value.toLowerCase(),
            price:price.value,
            tax:tax.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase()
        };
    
        //7- count 
        if(mode === 'Create'){
            if(newpro.count>1){
                for(let i=0; i < newpro.count;i++){
                    datapro.push(newpro);
                }
                deleteall.innerText= "Delete all " + '(' + datapro.length + " Product" + ')'
            }
            else{
                datapro.push(newpro);
                deleteall.innerText= "Delete all " + '(' + datapro.length + " Product" + ')'
            }
        }
        else{
            datapro[tmp] = newpro
            mode = 'Create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            window.scroll (
                {
                    left:0,
                    top:320,
                    behavior:'smooth',
        
                }
            )
       }
    
        localStorage.setItem('product' , JSON.stringify(datapro));
    
        clear()
        showpro()
        deleteall.classList.remove('hide')        
    }
}

//4- clear inputs

function clear(){
    title.value = ""
    price.value = ""
    tax.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""
    total.style.backgroundColor = "brown"
}

//5- read
function showpro(){
    let table = '';
    for(let i=0; i<datapro.length; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].tax}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td>   <button onclick=update(${i}) id='update'> update </button>   </td>
                <td>   <button onclick=clearpro(${i}) id='delete'> delete </button>   </td>
            </tr>
            `
    }

    document.getElementById('table').innerHTML = table;
}
showpro()
deleteall.innerText= "Delete all " + '(' + datapro.length + " Product" + ')'


//6- delete

function clearpro(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro)
    if (datapro=="") {
        deleteall.classList.add('hide')
    } else {
        deleteall.classList.remove('hide')
        deleteall.innerText= "Delete all " + '(' + datapro.length + " Product" + ')'
    }
    showpro()
}

if (datapro=="") {
    deleteall.classList.add('hide')
} else {
    deleteall.classList.remove('hide')
}


deleteall.onclick = ()=>{
    datapro.splice(0)
    // datapro=[]
    localStorage.clear();
    deleteall.classList.add('hide')
    showpro()
}

//8- update
function update(i){
    title.value    = datapro[i].title;
    price.value    = datapro[i].price;
    tax.value      = datapro[i].tax;
    ads.value      = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal()
    count.style.display = 'none'
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mode = 'Update';
    // console.log(mode)
    tmp = i;
    window.scroll(
        {
            left:0,
            top:0,
            behavior:'smooth',

        }
    )
}

//9- search

let searchmode = 'title'
let searchtitle123 = document.getElementById('searchtitle')
let searchcategory123 = document.getElementById('searchcategory')
let search = document.getElementById('search')

searchtitle123.onclick = ()=>{
    getsearchbuttonid(searchtitle123.id)
}
searchcategory123.onclick = ()=>{
    getsearchbuttonid(searchcategory123.id)
}

search.onkeyup = ()=>{
    searchdata(search.value)
}

function getsearchbuttonid(id){
    if(id =='searchtitle'){
        searchmode = 'title';
        search.placeholder = 'Search by Title';
    }
    else{
        searchmode = 'Category';
        search.placeholder = 'Search by Category';
    }

    search.focus() 
    search.value = "";
    showpro() 
}

function searchdata(value){
    let table = "";
    if(searchmode == 'title'){
        for(let i=0 ; i<datapro.length ;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].tax}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td>   <button onclick=update(${i}) id='update'> update </button>   </td>
                        <td>   <button onclick=clearpro(${i}) id='delete'> delete </button>   </td>
                    </tr>            
                    `
            }
        }
    }
    else{
        for(let i=0 ; i<datapro.length ;i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].tax}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td>   <button onclick=update(${i}) id='update'> update </button>   </td>
                        <td>   <button onclick=clearpro(${i}) id='delete'> delete </button>   </td>
                    </tr>            
                    `
            }
        }
    }
    document.getElementById('table').innerHTML = table;
    window.scroll(
        {
            top:400,
            behavior:'smooth',

        }
    )
}









//10- clean data
// searchcategory

