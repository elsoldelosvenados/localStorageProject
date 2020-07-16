const listReminders = document.getElementById('list-reminders')
const form = document.getElementById('form')
const checkboxs = document.getElementById('checkboxs-content')
let   checkValue;
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
  document.addEventListener('DOMContentLoaded',loadReminders)

}

function addReminder(e){

  e.preventDefault()
  const reminder = document.getElementById('reminder')
  getValueFromCheckbox()
  addReminderToLocalStorage(reminder.value + checkValue)
  reminder.value = ''
  loadReminders()
}


//FUnction to fill space white########################################################################
function removeReminder(e){
  e.preventDefault()
  if(e.target.className === 'remove-reminder'){
    e.target.parentElement.remove()
    removeRemainderOnLocalStorage(e.target.parentElement.innerText)
  }
}
function loadReminders(){
  let reminders = getRemindersFromlocalStorage()
  listReminders.innerText = ''
  reminders.forEach((reminder) =>{
    const removeButton = document.createElement('a')
    removeButton.classList = 'remove-reminder'
    removeButton.innerText = 'X'
    const li = document.createElement('li')
    reminder[reminder.length -1] == '1' ? li.classList = 'important':null
    reminder[reminder.length -1] == '2' ? li.classList = 'medion':null
    reminder[reminder.length -1] == '3' ? li.classList = 'level':null
    reminder = reminder.substring(0,reminder.length -1)
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

  return orderReminders(reminders)
}

function removeRemainderOnLocalStorage(reminder){
  let reminders, removeReminder
  removeRminder = reminder.substring(0,reminder.length -1)

  reminders = getRemindersFromlocalStorage()

  reminders.forEach((reminder, index) =>{
    if(removeRminder === reminder.substring(0,reminder.length-1)){
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

function getValueFromCheckbox(){
  checkboxsGroup.forEach((checkbox)=>{
  if(checkbox.checked){
    checkValue = checkbox.value
  }
})
}

function orderReminders(reminders){
  const remindersOrdered = []
  reminders.forEach((reminder)=>{
    if(reminder[reminder.length -1] === '1'){
    remindersOrdered.push(reminder)

  }})
  reminders.forEach((reminder) =>{
    if(reminder[reminder.length -1] === '2'){
    remindersOrdered.push(reminder)
  }})
  reminders.forEach((reminder) =>{
    if(reminder[reminder.length -1] === '3'){
    remindersOrdered.push(reminder)
  }})
 console.log(remindersOrdered)
  return remindersOrdered
}
