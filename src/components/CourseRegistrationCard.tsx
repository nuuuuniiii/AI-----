'use client';

import RegistrationName from './RegistrationName';

interface CourseRegistrationCardProps {
  courseName: string;
  date: string;
  onCourseNameChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export default function CourseRegistrationCard({ 
  courseName, 
  date, 
  onCourseNameChange, 
  onDateChange 
}: CourseRegistrationCardProps) {
  return (
    <RegistrationName
      courseName={courseName}
      date={date}
      onCourseNameChange={onCourseNameChange}
      onDateChange={onDateChange}
    />
  );
}
