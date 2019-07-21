import EventEmitter from 'events'
import onSignUp from '../EventListeners/onSignUP'
// SetUp the various events and listeners 
const parentEvent = new EventEmitter()

parentEvent.on('parent-registered',onSignUp.parent)

export default parentEvent