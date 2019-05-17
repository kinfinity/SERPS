import EventEmitter from 'events'
import onSignUp from '../EventListeners/onSignUP'
import onImageUpload from '../EventListeners/onImageUpload'

// SetUp the various events and listeners 
const schoolEvent = new EventEmitter()

schoolEvent.on('school-registered',onSignUp.school)
schoolEvent.on('school-logoUploaded',onImageUpload.school.Logo)

export default schoolEvent