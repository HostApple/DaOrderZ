let  orders =JSON.parse(localStorage.getItem("daorderz-orderz")) || [];




const tcktlst=document.getElementById("tcktlst");
const sttuss=[
    "shi we buzy w8",
    "we cookin rn broski",
    "DAWG WE READYYY",
    "you got it shalwg",

];


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



    









    if ( order.itm && order.itm.length >0){




        order.itm.forEach(itm=> {
            const line = document.createElement("div");

            line.textContent=`${item.name || `ITEM#${item.id}`} ×  ${item.quantity}`;


            itm.appendChild(line);
        });

    }














    const total =document.createElement("p");
    total.className="ticket-total";
    total.textContent=`TOTAL: ৳${Number(order.total).toFixed(2)}`;




    const dt=document.createElement("p");
    dt.className="ticket-date";
    dt.textContent=order.dt || "DaOrderZ pass";
    main.append(tp,npc,itm,total,dt);




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
        const curindex=sttuss.indexOf(order.sttus);
        order.sttus=sttuss[(curindex+1)%sttuss.length];





        localStorage.setItem("daorderz-orderz", JSON.stringify(orders));
        renderTickets();
    });





    stub.append(admt,sttus,nxt);
    crd.append(main,stub);
    tcktlst.appendChild(crd);
    



});  
}
renderTickets();