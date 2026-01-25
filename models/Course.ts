import mongoose, { Schema } from 'mongoose';

/**
 * Lesson Sub-document Schema
 * Represents the smallest unit of learning content.
 */
const LessonSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  type: { 
    type: String, 
    enum: ['video', 'text'], 
    required: true 
  },
  content: {
    videoUrl: { 
      type: String,
      trim: true 
    },
    textContent: { 
      type: String 
    }
  },
  duration: { 
    type: Number, 
    default: 0 // Estimated time in minutes
  },
  order: { 
    type: Number, 
    default: 0 
  }
}, { 
  _id: true // Enables unique IDs for each lesson within a module
});

/**
 * Module (Section) Sub-document Schema
 * Represents a logical grouping of lessons within a course.
 */
const ModuleSchema = new Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  order: { 
    type: Number, 
    default: 0 
  },
  lessons: [LessonSchema] // Embedded Lesson sub-documents
}, { 
  _id: true 
});

/**
 * Course Main Schema
 * The primary entity for the LMS content layer.
 */
const CourseSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  instructorId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true 
  },
  modules: [ModuleSchema], // Embedded Module sub-documents
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  enrollmentCount: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

// Create and export the model
// Using a check to prevent model re-compilation errors during hot-reloads
export const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
