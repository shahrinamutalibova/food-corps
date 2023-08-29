    console.log(product);

    const productToHtml = () =>{
        const product_Html = [];
        for(let i of product){
            console.log(i.image);
            product_Html.push(`
                <div class="card">
                    <img src="${i.image}" alt="">
                    <nav>
                        <h4>${i.title}</h4>
                    <h5>${i.price}</h5>
                    </nav>
                    <h6>${i.text}</h6>
                    <div class="footer">
                    <div class="footer2">${i.rate}</div>
                    ${
                        card.some(item => item.id === i.id) ? 
                        `<div>
                            <button onclick="minusCount(${i.id})" class="addBtn"> - </button>
                            <b style="font-size: 20px;">
                                ${getCount(i.id)}
                            </b>
                            <button onclick="plusCount(${i.id})" class="addBtn ${getCount(i.id) >= i.stock && "no_active"}">+</button>
                        </div>`
                        :
                        `<button onclick="addToCard(${i.id})" class="addBtn block"> + </button>`
                    }
                    </div>
                </div>
            `)
        }
        document.getElementById("cards").innerHTML = product_Html.join("");
    }
    const productToModal = () => {
        const Modal = [];
        let index = 0;
        for(let item of card){
            index++
            Modal.push(
                `
                <tr style="background-color: #D2DDF0;">
                    <th class="textcenter">${index}</th>
                    <td class="text-center"><img style="width:83.5px;border-radius:10px;" src="${item.image}" alt="" </td>
                    <td>${item.title}</td>
                    <td>${item.count}</td>
                    <td>${item.price}</td>
                    <td>${item.count * item.price}</td>
                    <td class="text-center"><button class="my-3" onclick="deleteBtn(${item.id})" id="delete"> ✕ </button></td>
                </tr>
                `
            
            )}
            document.getElementById("tbody").innerHTML = Modal.join(" ");
    }
    const getCount = id => {
            return card.find(item => item.id === id)?.count;
        }
    const addToCard = (id) => {
            const response = product.find(i => i.id === id);
            card.push({...response, count: 1});
            productToHtml();
        }
    const plusCount = (id) => {
            const index = card.findIndex(i => i.id === id);
            card[index].count = card[index].count + 1;
            productToHtml();
        }
    const minusCount = (id) => {
            const index = card.findIndex(i => i.id === id);
            if (card[index].count === 1) {
                card.splice(index, 1)
            } else {
                card[index].count = card[index].count - 1;
            }
            productToHtml();
        }
    const toggleModal = () => {
            document.getElementById("product_modal").classList.toggle("active_Modal");
            productToModal();
        }
    const deleteBtn = (id) =>{
        const index = card.findIndex(item => item.id === id);
        card.splice(index , 1);
        productToModal();
    }
    const closeBtn = () => {
        toggleModal();
        card = [];
        productToHtml();
    }   
     
    productToModal();
    productToHtml();

