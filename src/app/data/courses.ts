import { Course } from '../interfaces/Course';

export function coursesDummyData(): Course[] {
    return [
        {
            id: '1',
            courseName: 'Java',
            description: 'Learn Java, one of the most popular programming languages used for building scalable applications.',
            instructor: 'John Doe',
            duration: '6 weeks',
            difficulty: 'Intermediate',
            imageUrl: 'https://img.freepik.com/free-vector/organic-flat-computer-programming-illustration_23-2148955255.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybridg'
        },
        {
            id: '2',
            courseName: 'JavaFX',
            description: 'Master the art of building graphical user interfaces with JavaFX.',
            instructor: 'Jane Smith',
            duration: '5 weeks',
            difficulty: 'Advanced',
            imageUrl: 'https://img.freepik.com/free-vector/programmer-concept-illustration_114360-2417.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid'
        },
        {
            id: '3',
            courseName: 'Python',
            description: 'Dive into Python programming, a versatile language used for web development, data science, and automation.',
            instructor: 'Alex Johnson',
            duration: '8 weeks',
            difficulty: 'Beginner',
            imageUrl: '/images/python-course.jpg'
        },
        {
            id: '4',
            courseName: 'ReactJS',
            description: 'Learn ReactJS to build interactive user interfaces for web applications.',
            instructor: 'Emma Davis',
            duration: '7 weeks',
            difficulty: 'Intermediate',
            imageUrl: '/images/reactjs-course.jpg'
        },
        {
            id: '5',
            courseName: 'JavaScript',
            description: 'Become proficient in JavaScript, the core language for web development and building dynamic web pages.',
            instructor: 'Michael Brown',
            duration: '6 weeks',
            difficulty: 'Beginner',
            imageUrl: '/images/javascript-course.jpg'
        },
        {
            id: '6',
            courseName: 'Flutter',
            description: 'Learn Flutter to build beautiful cross-platform apps for iOS and Android using a single codebase.',
            instructor: 'Sophia Lee',
            duration: '9 weeks',
            difficulty: 'Intermediate',
            imageUrl: '/images/flutter-course.jpg'
        }
    ];
}
