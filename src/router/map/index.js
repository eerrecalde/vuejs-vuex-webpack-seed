import Home from '@view/home'
import Courses from '@view/courses'
import CourseForm from '@view/courseForm'
import About from '@view/about'

export default [
  { path: '/', component: Home },
  { path: '/courses', component: Courses },
  { path: '/course/:id', component: CourseForm },
  { path: '/course/', component: CourseForm },
  { path: '/about', component: About },
];
