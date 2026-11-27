let  orders =JSON.parse(localStorage.getItem("daorderz-orderz")) || [];




const tcktlst=document.getElementById("tcktlst");
const sttuss=[
    "shi we buzy w8",
    "we cookin rn broski",
    "DAWG WE READYYY",
    "you got it shalwg",

];

function saveOrders(){
    localStorage.setItem("daorderz-orderz",JSON.stringify(orders));
}


function renderTickets(){
    tcktlst.innerHTML="";








    if(orders.length===0){
        const fak =document.createElement("div");


        fak.className="empty-tickets";
        fak.textContent="NO PASSES YET TwT";
        tcktlst.appendChild(fak);




        return;

    }


[...orders].reverse().forEach(order=>{
    const crd=document.createElement("article");


    crd.className="ticket-card";


    const main = document.createElement("div");
    main.className="ticket-main";




    const tp=document.createElement("div")
    tp.className="ticket-top";



    







    //i hate javascript , i shouldve never taken this project UGGHHHHH



    const brand=document.createElement("span")
    brand.className="ticket-brand";
    brand.textContent="DaOrderZ || ADMIT ONE uwu";


    const num=document.createElement("span");
    num.className="ticket-number";
    num.textContent=`PASS#${String(order.id).padStart(4,0)}`;
    tp.append(brand,num);













    //yes im calling customers npc because nobody prolly gonna use this . and if you are reading this then im not ai bro trust :3
    //im just burnt out so im putting these comments else i wouldnt 

    const npc=document.createElement("h2");
    npc.className="ticket-npc";
    npc.textContent=order.npc;





    const itm=document.createElement("div");
    itm.className="tickets-items";

    (order.itm||[]).forEach(itm=>{
        const line=document.createElement("div");
        line.textContent=`${itm.name}× ${itm.quantity}`;
        itm.appendChild(line);
});















    const total =document.createElement("p");
    total.className="ticket-total";
    total.textContent=`TOTAL: ৳${Number(order.total).toFixed(2)}`;



    const discount=document.createElement("p");
    discount.className="ticket-date";
    discount.textContent= `DINO DISCOUNT:${Number(order.discountpercent||0).toFixed(1)}%`;
    const dt=document.createElement("p");
    dt.className="ticket-date";
    dt.textContent=order.dt || "DaOrderZ pass";
    main.append(tp,npc,itm,total,dt,discount);




    const stub=document.createElement("div");
    stub.className="ticket-stub";




    const admt=document.createElement("small");
    admt.textContent="ORDER STATUS";










    const sttus=document.createElement("div");
    sttus.className="ticket-status";
    sttus.textContent=order.sttus;
    const nxt=document.createElement("button");
    nxt.textContent="NEXT STATUS";


    nxt.addEventListener("click",()=>{
        const crnt=order.sttus||sttuss[0];
        const index=sttuss.indexOf(crnt.trim());




        order.sttus=sttuss[(index+1) % sttuss.length];
        saveOrders();
        renderTickets();
    });


    const remove=document.createElement("button");
    remove.className="remove-pass";
    remove.textContent="remove pass";


    remove.addEventListener("click",()=>{
        if(!confirm("remove this pass?")) 
            return;



        orders=orders.filter(saved=>saved !==order);
        saveOrders();
        renderTickets();
    });


    stub.append(admt,sttus,nxt,remove);
    crd.append(main,stub);
    tcktlst.appendChild(crd);
    



});  
};



const clearbtn=document.getElementById("clear-passes");
clearbtn.addEventListener("click",()=> {
    if(orders.length===0)
        return;


    if(!confirm("CKEAR ALL DaOrderZ passes?"))
        return;




    orders=[];
    saveOrders();
    renderTickets();
})
renderTickets();