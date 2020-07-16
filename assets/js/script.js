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

/**
*It loads the evnts as soons as the page is loads
*/
function eventListeners(){

  form.addEventListener('submit',addReminder)
  checkboxs.addEventListener('click', checkboxsValidate)
  listReminders.addEventListener('click', removeReminder)
  document.addEventListener('DOMContentLoaded',loadReminders)

}

/**
*It adds on the local storage the reminder and also call the method to add on DOM
*/
function addReminder(e){
  e.preventDefault()
  const reminder = document.getElementById('reminder')
  getValueFromCheckbox()
  addReminderToLocalStorage(reminder.value + checkValue)
  reminder.value = ''
  loadReminders()
}

/**
*It removes a reminder from DOM and it also call the methos to remove 
* from local storage
*/
function removeReminder(e){
  e.preventDefault()
  if(e.target.className === 'remove-reminder'){
    e.target.parentElement.remove()
    removeRemainderOnLocalStorage(e.target.parentElement.innerText)
  }
}
/**
*This is a main method which take all reminder from local atorage and send them to DOM
*/
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


/**
*Add a reminder in the local storage, first it is add to array
* then the array  is converted to string, finally teh string is added 
*local storage
*/
function addReminderToLocalStorage(reminder){
  let reminders = getRemindersFromlocalStorage()
  reminders.push(reminder)
  localStorage.setItem('reminders',JSON.stringify(reminders))
}
/**
*Retursn a array with the reminders on the local storage, in the case that it is
* empty it returns the array empty
*/
function getRemindersFromlocalStorage(){
  let reminders
  if(localStorage.getItem('reminders')=== null){
    reminders = []
  }else{
    reminders = JSON.parse(localStorage.getItem('reminders'))
  }

  return orderReminders(reminders)
}
/**
*Remove a reminder from local storage throught its content,
*if the content is the same in the DOM and local storage it is removed
*/
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

/**
*Check that in the form only is one checkbox selected
*/
function checkboxsValidate(e){
  checkboxsGroup.forEach((checkbox)=>{
    checkbox.checked = 0
  })
  e.target.checked = 1
}
/**
*Get the value from the form to the checkbox of imporatance of reminder
*/
function getValueFromCheckbox(){
  checkboxsGroup.forEach((checkbox)=>{
  if(checkbox.checked){
    checkValue = checkbox.value
  }
})
}
/**
*It takes all reminders form local storage and returns them sorted in order of importance
*/
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
  return remindersOrdered
}
