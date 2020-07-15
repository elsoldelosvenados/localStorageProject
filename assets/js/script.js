const listReminders = document.getElementById('list-reminders')
const form = document.getElementById('form')
const checkboxs = document.getElementById('checkboxs-content')

const checkboxsGroup = [
  document.getElementById('low'),
  document.getElementById('median'),
  document.getElementById('height')
]

eventListeners()


function eventListeners(){

  form.addEventListener('submit',addReminder)
  checkboxs.addEventListener('click', checkboxsValidate)
  listReminders.addEventListener('click', removeReminder)
  document.addEventListener('DOMContentLoaded',loacalStorgeReady)

}

function addReminder(e){

  e.preventDefault()
  const reminder = document.getElementById('reminder')

  const removeButton = document.createElement('a')
  removeButton.classList = 'remove-reminder'
  removeButton.innerText = 'X'

  const li = document.createElement('li')
  li.innerText = reminder.value

  li.appendChild(removeButton)

  listReminders.appendChild(li)
  addReminderToLocalStorage(reminder.value)

  reminder.value = ''
}


//FUnction to fill space white########################################################################
function removeReminder(e){
  e.preventDefault()
  if(e.target.className === 'remove-reminder'){
    e.target.parentElement.remove()
    removeRemainderOnLocalStorage(e.target.parentElement.innerText)
  }
}
function loacalStorgeReady(){
  let reminders = getRemindersFromlocalStorage()
  reminders.forEach((reminder) =>{
    const removeButton = document.createElement('a')
    removeButton.classList = 'remove-reminder'
    removeButton.innerText = 'X'

    const li = document.createElement('li')
    li.innerText = reminder
    li.appendChild(removeButton)
    listReminders.appendChild(li)
  })
}

function addReminderToLocalStorage(reminder){
  let reminders = getRemindersFromlocalStorage()
  reminders.push(reminder)
  localStorage.setItem('reminders',JSON.stringify(reminders))
}

function getRemindersFromlocalStorage(){
  let reminders
  if(localStorage.getItem('reminders')=== null){
    reminders = []
  }else{
    reminders = JSON.parse(localStorage.getItem('reminders'))
  }
  return reminders
}

function removeRemainderOnLocalStorage(reminder){
  let reminders, removeReminder
  removeRminder = reminder.substring(0,reminder.length -1)

  reminders = getRemindersFromlocalStorage()

  reminders.forEach((reminder, index) =>{
    if(removeRminder === reminder){
      reminders.splice(index,1)
    }
  })
  localStorage.setItem('reminders',JSON.stringify(reminders))
}

function checkboxsValidate(e){
  checkboxsGroup.forEach((checkbox)=>{
    checkbox.checked = 0
  })
  e.target.checked = 1
}
