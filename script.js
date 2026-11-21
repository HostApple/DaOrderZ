const menu = [
    {
        id: 1,
        name:"DAHAPPY SMASH",
        category: "BURGERS" ,
        price: 670,
        image:"images/full_moon.jpg",
        description:"DOUBLE SMASH WITH ZESTIFIED MAGIC AND DAHAPPY STUFF",

    },
    {
        id:2,
        name: "DATHICC fries",
        category: "SIDES",
        price : 167,
        image:"images/full_moon.jpg",
        description:"EXTRA ZESTIFIED THICC FRIES ",


    },


    {
        id:3,
        name:"DaCoke ( the legal stuff )",
        category:"DRINKS",
        price: 67 , 
        image:"images/full_moon.jpg",
        description:"Might have side effects , cant assure you :3"
        ,
    },

    {
        id:4,
        name: "Da dob dob ",
        category:"BURGERS",
        price:1670,
        image:"images/full_moon.jpg",
        description: "A BIG BIG BIG BURGER ( not with skibidy side effects btw)",
    },

    {
        id:5,
        name:"ZESTYPLINGS",
        category: "SIDES",
        price: 670,
        image:"images/full_moon.jpg",
        description: " TOPPED WITH ZESTY SAUCE FROM HOSTAPPLE HIMSELF",

    },



    {
        id:6,
        name:"secret",
        category:"SECRET",
        price:6.7,
        image:"images/full_moon.jpg",
        description:"totally not sus",
    }



];

let crt = [];
let orders = JSON.parse(localStorage.getItem("daorderz-orderz")) || [];


let activeCategory = "ALL";




//mnu renderr

const menugrd = document.getElementById("menu-grd");
const filters = document.getElementById("filters");





function rndFilters(){
    filters.innerHTML = "";
    const categories = ["ALL", ...new Set(menu.map(item => item.category))];
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        if(category === activeCategory) {

            button.classList.add("active");
        }


        button.addEventListener("click" , () => {
            activeCategory = category;

            rndFilters();
            renderMenu();
        });

        filters.appendChild(button);
    });
}






function renderMenu() {
    menugrd.innerHTML = "";



    const fltrdmenu = activeCategory === "ALL"
    ? menu
    : menu.filter(item => item.category ===activeCategory);




    fltrdmenu.forEach(item => {

        const crd = document.createElement("article");
        crd.className = "food-card";




        const image = document.createElement("img");

        image.src=item.image;
        image.alt = item.name ; 
        image.loading = "lazy";
        image.onerror = () => {

            image.removeAttribute("src");
            image.alt = `${item.name} -- pic coming soon gng :v/`;
        };










        const title = document.createElement("h3");
        title.textContent=item.name;






        const description = document.createElement("p");
        description.textContent=item.description;





        const price = document.createElement("p");
        price.textContent = `৳${item.price}`;













        const button = document.createElement("button");
        button.textContent = "ADD TO DA BAG +";

        button.addEventListener("click", () => adtcrt(item.id));




        crd.append(image,title,description,price,button,);
        menugrd.appendChild(crd);
    });
}

rndFilters();
renderMenu();




// genuienly if it wasnt for pixl i wouldnt be doing this TwT



const crtcount = document.getElementById("cart-count");
const crtitems = document.getElementById("crtitems");
const crtTotal = document.getElementById("crt-total");
const crtpnl = document.getElementById("crt-pnl");




function adtcrt(id) {

    const existingitem = crt.find(item => item.id === id);


    


    if (existingitem) {
        existingitem.quantity++;

    }


    else {
        crt.push({
            id: id, quantity:1
        });
    }



    rndrcrt();
}










function removefrmcrt(id) {



    crt = crt.filter(item => item.id !== id);
    rndrcrt();
}

function changeQuantity(id,amount) {
    const item = crt.find(item => item.id === id);

    if (!item) return ;

    

    item.quantity += amount;
    if(item.quantity<=0) {
        crt =crt.filter(item => item.id !== id);

    }

    rndrcrt();
}




function rndrcrt(){
    crtitems.innerHTML= "";



    if(crt.length ===0) {
        const emptymsgg =document.createElement("p");
        emptymsgg.textContent="da bag is empy rn mate";
        
        crtitems.appendChild(emptymsgg);
    }

    let totalquant = 0;
    let totalprice = 0;


    crt.forEach(crtitem => {
        const product = menu.find(item => item.id === crtitem.id);








        if (!product) return;

        totalquant += crtitem.quantity;
        totalprice += product.price * crtitem.quantity;

        const row = document.createElement("div");
        const details = document.createElement("span");
        const minusbutton = document.createElement("button");
        const plusbutton = document.createElement("button");    
        const removebutton = document.createElement("button");






        details.textContent =
        `${
            product.name
        } × ${crtitem.quantity} — ৳${product.price * crtitem.quantity} `;


        minusbutton.textContent= "-";

        plusbutton.textContent="+";
        removebutton.textContent='REMOVE';



        minusbutton.addEventListener("click", ()=>  changeQuantity(product.id,-1));
        plusbutton.addEventListener("click", ()=>  changeQuantity(product.id,1));
        removebutton.addEventListener("click", () => removefrmcrt(product.id));









        row.append(details,minusbutton,plusbutton,removebutton);

        crtitems.appendChild(row);

    });







    crtcount.textContent=totalquant;
    crtTotal.textContent=totalprice.toFixed(2);
    

}


document.getElementById("addtocart").addEventListener("click", () => {

    crtpnl.classList.add("open");
});



document.getElementById("cls-crt").addEventListener("click", () => {

    crtpnl.classList.remove("open");
});

rndrcrt();


const checkotbtn =document.getElementById("checkout-btn");

const npcnm=document.getElementById("npc-name");
const crtmsg = document.getElementById("crt-msg");









checkotbtn.addEventListener("click",()=>{
    const noobnem=npcnm.value.trim();

    if(crt.length ===0){
        crtmsg.textContent="da bag is empty mate";
        return ;

    }




    if (noobnem === "") {
    crtmsg.textContent = "PUT YOUR NAME BRUVVV";
    return;
    }


const total =crt.reduce((sum,crtitem)=> {

    const product = menu.find(item=>item.id ===crtitem.id);
    return sum + product.price * crtitem.quantity;
}, 0);





const neworder = {
    id: orders.length + 1,
    customer: noobnem,
    

    items:crt.map(crtitem=>{
        const product=menu.find(item=>item.id ===crtitem.id);



        return{
            id:product.id,
            name: product.name,
            price: product.price,
            quantity: crtitem.quantity
        };
    }),





    total:total,
    status:"shi we buzy w8",
    date: new Date().toLocaleString()
};

orders.push(neworder);
localStorage.setItem("daorderz-orderz", JSON.stringify(orders));


crt=[];
rndrcrt();





crtmsg.textContent=`order #${neworder.id} sent ( we didnt mess up ayyy)`;
setTimeout(() => {
    crtpnl.classList.remove("open");
}, 1500);
npcnm.value = "";

});

        
//welcscrn
window.addEventListener("load",function(){
    const welc=document.getElementById("welc-scr");



    if(!welc) return;
    setTimeout(function(){
        welc.classList.add("hid");

    },1600);





    setTimeout(function(){

        welc.remove();
    },2700);
});




