import EventEmitter from 'events'
import onSignUp from '../EventListeners/onSignUP'

// SetUp the various events and listeners 
const schoolSignUp = new EventEmitter()

schoolSignUp.on('school-registered',onSignUp.school)

const schoolEvent = {
    schoolSignUp,
}

export default schoolEvent