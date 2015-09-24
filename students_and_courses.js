function Student(first, last) {
  this.first = first;
  this.last = last;
  this.courses = [];
}

Student.prototype.name = function() {
  return this.first + ' ' + this.last;
};

Student.prototype.courses = function(){
  return this.courses;
};

Student.prototype.hasConflict = function(course) {
  this.courses.forEach(function(studentCourse) {
    if (studentCourse.conflictsWith(course)) {
      return true;
    }
  });
  return false;
};

Student.prototype.enroll = function(course) {
  if (course.students.index(this) === -1 && !this.hasConflict(course)) {
    this.courses.push(course);
    course.students.push(this);
  }
};

Student.prototype.courseLoad = function() {
  var load = {};
  this.courses.forEach( function (course) {
    load[course.dep] = load[course.dep] || 0;
    load[course.dep] += 1;
  });
};

function Course(courseName, dep, numCredits, daysOfTheWeek, timeBlock) {
  this.courseName = courseName;
  this.dep = dep;
  this.numCredits = numCredits;
  this.students = [];
  this.daysOfTheWeek = daysOfTheWeek;
  this.timeBlock = timeBlock;
}

Course.prototype.students = function() {
  return this.students;
};

Course.prototype.addStudent = function(student) {
  student.enroll(this);
};

Course.prototype.conflictsWith = function(course) {
  if (this.timeBlock !== course.timeBlock) {
    return false;
  } else {
    this.daysOfTheWeek.forEach(function(day) {
      if (course.daysOfTheWeek.indexOf(day) !== -1) {
        return true;
      }
    });
  }
  return false;
};
