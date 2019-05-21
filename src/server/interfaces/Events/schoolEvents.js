import EventEmitter from 'events'
import onSignUp from '../EventListeners/onSignUP'
import onImageUpload from '../EventListeners/onImageUpload'
import onNotification from '../EventListeners/onNotification'
import onSchoolSession from '../EventListeners/onSchoolSession'

// SetUp the various events and listeners 
const schoolEvent = new EventEmitter()

schoolEvent.on('school-registered',onSignUp.school)
schoolEvent.on('school-logoUploaded',onImageUpload.school.Logo)
schoolEvent.on('school-notificationCreated',onNotification.created)
schoolEvent.on('school-notificationDeleted',onNotification.deleted)
schoolEvent.on('school-sessionCreated',onSchoolSession.created)
// schoolEvent.on('school-sessionCreated',onSchoolSession.created)

export default schoolEvent