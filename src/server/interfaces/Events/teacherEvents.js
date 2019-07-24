import EventEmitter from 'events'
import onSignUp from '../EventListeners/onSignUP'
// SetUp the various events and listeners 
const teacherEvent = new EventEmitter()

teacherEvent.on('teacher-registered',onSignUp.teacher)

export default teacherEvent