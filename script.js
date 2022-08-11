document.addEventListener('DOMContentLoaded',function()
{
  const transcationlist=document.querySelector('#transcationlist')
  var balance=0
  var inc=0
  var exp=0
    
  //const balance=document.querySelector('#balance')
  fetch(`http://localhost:3001/add`)
  .then(res => res.json())
  .then(data =>data.map(function (item) {
    if (item.amount<0){
        balance= balance + parseInt(item.amount)
        exp+=parseInt(item.amount)
    }
    else
    {   balance= balance + parseInt(item.amount)
        inc+=parseInt(item.amount)
    }
    
    
    transcationlist.innerHTML+=
    `<div id= {item.id} >
        <div class="card text-bg-secondary ">
            <div class="card-body"  >
                <div class="row" >
                    <div class="col">
                    ${item.date}
                    </div>
                    <div class="col-5">
                    ${item.text}
                    </div>
                    <div class="col-3">
                    ${item.amount}
                    </div>
                    <div class="col">
                    <i data-id="${item.id}" id="delete-${item.id}" data-action="delete" class="fa-solid fa-delete-left float-end"></i>
                    
                    </div>
                    
                </div>
            </div>
        </div>
        
       
    </div>`
    

document.getElementById("balance").innerHTML = `$ ${balance}`;
document.getElementById("inco").innerHTML = `$ ${inc}`;
document.getElementById("expe").innerHTML = `$ ${exp}`;
  }) )
  
  
  const form=document.querySelector('#form')

  form.addEventListener('submit',(e) => {
    e.preventDefault()
    console.log(e.target)

    const text=form.querySelector('#text').value
    const date=form.querySelector('#date').value
    const amount=form.querySelector('#amount').value
    const sel=form.querySelectorAll('input[name="income_expense"]');
    let amo=0
    
    let selected
    for (const i of sel) {
        if (i.checked) {
            selected = i.value;

            break;
        }
    }
    if (selected=="income")
    {
        amo="+"+amount;
        inc+=parseInt(amount)


    }
        else
    {   amo="-"+amount
    
    }
   

    
    fetch(`http://localhost:3001/add`, {
        method: 'POST',
        body: JSON.stringify({
          text: text,
          amount: amo,
          date: date,
          selected: selected,
          
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(item =>{
       


        transcationlist.innerHTML+=
        `<div id= {item.id}>
        
    
           <p>${item.date}  
           ${item.amount}
           ${item.text}
           ${item.selected}
           <i data-id="${item.id}" id="delete-${item.id}" data-action="delete" class="fa-solid fa-delete-left">del</i>
           
           </p>
                             
        
        </div>`
    
      }) 
  })

  transcationlist.addEventListener('click', (e) => {

    if (e.target.dataset.action === 'delete') {
        console.log('you pressed delete')

        document.querySelector(`#delete-${e.target.dataset.id}`).remove()
        fetch(`http://localhost:3001/add/${e.target.dataset.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( response => response.json())
      }

  })


})