import mongoose, { Schema } from 'mongoose';

/**
 * Progress Schema
 * Tracks a specific student's journey through a specific course.
 */
const ProgressSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  completedLessonIds: [{
    type: String, // Storing as strings for compatibility with sub-document IDs
    default: []
  }],
  lastAccessedLessonId: {
    type: String
  }
}, { 
  timestamps: true 
});

// Ensure a student only has one progress record per course
ProgressSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

export const Progress = mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
