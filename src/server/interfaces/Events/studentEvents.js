import EventEmitter from 'events'
import onSignUp from '../EventListeners/onSignUP'
// SetUp the various events and listeners 
const studentEvent = new EventEmitter()

studentEvent.on('student-registered',onSignUp.student)

export default studentEvent