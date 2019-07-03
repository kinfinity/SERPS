import EventEmitter from 'events'
import onSignUp from '../EventListeners/onSignUP'
import onImageUpload from '../EventListeners/onImageUpload'
import onNotification from '../EventListeners/onNotification'
import onSchoolSession from '../EventListeners/onSchoolSession'
import onClass from '../EventListeners/onClass'
import onSubject from '../EventListeners/onSubject'
import onActivity from '../EventListeners/onActivity'
import onLectureNote from '../EventListeners/onLectureNote'
import ontimeTable from '../EventListeners/ontimeTable'

// SetUp the various events and listeners 
const schoolEvent = new EventEmitter()

// SignUp
schoolEvent.on('school-registered',onSignUp.school)
schoolEvent.on('school-logoUploaded',onImageUpload.school.Logo)

//Notification
schoolEvent.on('school-notificationCreated',onNotification.created)
schoolEvent.on('school-notificationDeleted',onNotification.deleted)
schoolEvent.on('school-notificationImageUploaded',onNotification.imageUploaded)

// Session
schoolEvent.on('school-sessionCreated',onSchoolSession.created)

// Class
schoolEvent.on('school-classCreated',onClass.created)
schoolEvent.on('school-classTeacherUpdate',onClass.teacherUpdate)

// Subject - Holder
schoolEvent.on('school-subjectCreated',onSubject.holderCreated)
schoolEvent.on('school-subjectDeleted',onSubject.holderDeleted)
// subject - update Holder
schoolEvent.on('school-classSubjectCreated',onSubject.createdH)
schoolEvent.on('school-classSubjectDeleted',onSubject.deletedH)
// subject - update Class   
schoolEvent.on('school-classSubjectCreated',onSubject.createdC)
schoolEvent.on('school-classSubjectDeleted',onSubject.deletedC)

// Activity
schoolEvent.on('school-ActivityCreated',onActivity.created)
schoolEvent.on('school-ActivityTeacherUpdate',onActivity.updateTeacher)

// lectureNotes
schoolEvent.on('school-lectureNoteUpdloaded',onLectureNote.uploaded)

// timeTable
schoolEvent.on('school-timeTableCreated',ontimeTable.created)

export default schoolEvent