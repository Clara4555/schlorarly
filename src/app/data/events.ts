import { Member } from "../interfaces/Member";
import { Event } from "../interfaces/Event";

export function eventsDummyData(): Event[] {

    const members: Member[] = [
        {
            id: '1', email: 'taiwoteninlanimi@gmail.com', firstName: 'Teninlanimi', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'admin', profile: 'https://res.cloudinary.com/dq18zmq0f/image/upload/v1732807848/file.jpg',
            color: 'red'
        },
        {
            id: '2', email: 'teninlanimitaiwo@gmail.com', firstName: 'Fola', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'student', profile: 'https://imgcdn.stablediffusionweb.com/2024/5/8/579453e2-3fa3-4d2c-a059-ccc3096780f3.jpg',
            color: ''
        },
        {
            id: '3', email: 'teninlanimi@gmail.com', firstName: 'Bola', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'student', profile: 'https://cdn2.stylecraze.com/wp-content/uploads/2020/09/Beautiful-Women-In-The-World.jpg',
            color: ''
        },
        {
            id: '4', email: 'teni@gmail.com', firstName: 'Bamidele', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'student', profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOeZjZWEr4oFmJhILQQgTy7-WUX9BmRrAAFw&s',
            color: ''
        },
        {
            id: '5', email: 'tai@gmail.com', firstName: 'Teni', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'student', profile: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fmen%2F&psig=AOvVaw3tt5LhAhA799g-pEhib0Bj&ust=1732916963361000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiL0fmAgIoDFQAAAAAdAAAAABAJ',
            color: ''
        },
        {
            id: '6', email: 'avffg@gmail.com', firstName: 'David', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'student', profile: 'https://res.cloudinary.com/dq18zmq0f/image/upload/v1732807848/file.jpg',
            color: ''
        },
    ];

    return [
        {
            id: '1',
            eventTitle: 'JavaScript Basics Webinar',
            eventDescription: 'Join us for a free live webinar to learn the basics of JavaScript and how to start coding from scratch. Hosted by industry experts.',
            audience: members,
            designatedTime: '2025-02-10T10:00:00.000Z',
            createdTime: '2025-01-28T10:00:00.000Z',
            eventPhoto: 'https://img.freepik.com/free-vector/programmers-using-javascript-programming-language-computer-tiny-people-javascript-language-javascript-engine-js-web-development-concept_335657-2412.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
            isAttending: undefined,
            announcementTitle: ""
        },
        {
            id: '2',
            eventTitle: 'Introduction to React Workshop',
            eventDescription: 'Learn how to build dynamic web apps using React. This workshop will cover the fundamentals and advanced concepts of React.',
            audience: members,
            designatedTime: '2025-02-15T14:00:00.000Z',
            createdTime: '2025-01-29T12:00:00.000Z',
            eventPhoto: 'https://img.freepik.com/free-vector/website-designer-concept-illustration_114360-4449.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
            isAttending: undefined,
            announcementTitle: ""
        },
        {
            id: '3',
            eventTitle: 'Frontend Development Bootcamp',
            eventDescription: 'A 3-day bootcamp focused on frontend development, covering HTML, CSS, JavaScript, and React. Get hands-on experience with projects.',
            audience: members,
            designatedTime: '2025-03-01T09:00:00.000Z',
            createdTime: '2025-01-30T09:00:00.000Z',
            eventPhoto: 'https://img.freepik.com/free-photo/programming-background-collage_23-2149901789.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
            isAttending: undefined,
            announcementTitle: ""
        },
        {
            id: '4',
            eventTitle: 'Career Development Webinar',
            eventDescription: 'A webinar dedicated to helping students prepare for the job market. Learn how to create an outstanding resume, prepare for interviews, and more.',
            audience: members,
            designatedTime: '2025-03-05T11:00:00.000Z',
            createdTime: '2025-02-01T08:00:00.000Z',
            eventPhoto: 'https://img.freepik.com/free-photo/hiring-career-employment-human-resources-concept_53876-123631.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
            isAttending: undefined,
            announcementTitle: ""
        },
        {
            id: '5',
            eventTitle: 'Project Management Essentials',
            eventDescription: 'This event will help you understand the basics of project management, focusing on agile methodologies and tools used in the industry.',
            audience: members,
            designatedTime: '2025-03-10T15:00:00.000Z',
            createdTime: '2025-02-02T09:30:00.000Z',
            eventPhoto: 'https://img.freepik.com/free-vector/illustrated-people-business-training_52683-60661.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
            isAttending: undefined,
            announcementTitle: ""
        },
        {
            id: '6',
            eventTitle: 'Web Development Career Paths',
            eventDescription: 'Explore the various career paths in web development. This webinar will feature experts who will discuss opportunities in the field.',
            audience: members,
            designatedTime: '2025-03-12T13:00:00.000Z',
            createdTime: '2025-02-05T10:30:00.000Z',
            eventPhoto: 'https://img.freepik.com/free-vector/starting-career-concept-illustration_114360-23773.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
            isAttending: undefined,
            announcementTitle: ""
        },
        {
            id: '7',
            eventTitle: 'Building Your Personal Brand Online',
            eventDescription: 'This workshop will teach you how to build a personal brand that stands out online, focusing on LinkedIn, GitHub, and other professional networks.',
            audience: members,
            designatedTime: '2025-03-18T16:00:00.000Z',
            createdTime: '2025-02-07T12:00:00.000Z',
            eventPhoto: 'https://img.freepik.com/free-vector/brand-creation-concept-illustration_114360-12407.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
            isAttending: undefined,
            announcementTitle: ""
        },
        {
            id: '8',
            eventTitle: 'Mobile App Development 101',
            eventDescription: 'Learn the basics of mobile app development for iOS and Android. This event will give you a solid foundation in building apps.',
            audience: members,
            designatedTime: '2025-03-22T10:00:00.000Z',
            createdTime: '2025-02-10T11:30:00.000Z',
            eventPhoto: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149024129.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
            isAttending: undefined,
            announcementTitle: ""
        },
        {
            id: '9',
            eventTitle: 'UX/UI Design Fundamentals',
            eventDescription: 'This workshop will guide you through the basics of UX/UI design, focusing on user-centered design, prototyping, and design tools.',
            audience: members,
            designatedTime: '2025-03-25T14:30:00.000Z',
            createdTime: '2025-02-12T15:00:00.000Z',
            eventPhoto: 'https://img.freepik.com/free-vector/flat-ui-ux-background-illustrated_23-2149048690.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
            isAttending: undefined,
            announcementTitle: ""
        },
        {
            id: '10',
            eventTitle: 'AI in Web Development',
            eventDescription: 'Explore how AI is revolutionizing web development. This session will cover AI tools and frameworks that can enhance your development process.',
            audience: members,
            designatedTime: '2025-03-30T12:00:00.000Z',
            createdTime: '2025-02-14T09:00:00.000Z',
            eventPhoto: 'https://img.freepik.com/free-vector/artificial-intelligence-landing-page-template_23-2148384079.jpg?uid=R88163011&ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
            isAttending: undefined,
            announcementTitle: ""
        }
    ];
}
