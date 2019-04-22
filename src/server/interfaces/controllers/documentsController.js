/*
 * #k_infinityIII@Echwood
 *
 * documentsController: ()
 *
 *  Functions: [CRUD]
 *
 */


import documentsAdapter from '../db/documentsAdapter';

const documentsController = {
    
    async uploadLectureNote(type,subject,Class,lectureNoteData,teacherID){
        return documentsAdapter.uploadLectureNote(type,subject,Class,lectureNoteData,teacherID);
    },
    async validateLectureNote(subject,ClassAlias,lectureNoteID){
        return documentsAdapter.validateLectureNote(subject,ClassAlias,lectureNoteID);
    },
    async getLectureNote(subject,classAlias,lectureNoteID){
        return documentsAdapter.getLectureNote(subject,classAlias,lectureNoteID);
    },
    async getLectureNotes(subject,ClassAlias){
        return documentsAdapter.getLectureNotes(subject,ClassAlias);
    },
    async deletelectureNote(type,subject,Class,noteTitle,teacherID){
        return documentsAdapter.deleteLectureNote(type,subject,Class,noteTitle,teacherID);
    },
    async uploadLectureCuriculum(type,subject,Class,lectureCuriculumData,teacherID){
        return documentsAdapter.uploadLectureCuriculum(type,subject,Class,lectureCuriculumData,teacherID);
    },
    async getLectureCuriculum(type,subject,Class,lectureCuriculumTitle){
        return documentsAdapter.getLectureCuriculum(type,subject,Class,lectureCuriculumTitle);
    },
    async deleteLectureCuriculum(type,subject,Class,lectureCuriculumTitle,teacherID){
        return documentsAdapter.deleteLectureNote(type,subject,Class,lectureCuriculumTitle,teacherID);
    },
    async getAssignment(AssisgnmentTitle,subject,Class){
        return documentsAdapter.getAssignment(AssisgnmentTitle,subject,Class);
    },
    async uploadAssignment(AssignmentData,subject,Class,teacherID){
        return documentsAdapter.uploadAssignment(AssignmentData,subject,Class,teacherID);
    },
    async deleteAssignment(AssisgnmentTitle,subject,Class,teacherID){
        return documentsAdapter.deleteAssignment(AssisgnmentTitle,subject,Class,teacherID);
    }

};

export default documentsController;