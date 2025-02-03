import { Announcement } from '../interfaces/Announcement';
import { Member } from '../interfaces/Member';

export function announcementDummyData(): Announcement[] {
  const members: Member[] = [
    { id: '1', email: 'taiwoteninlanimi@gmail.com', color: 'green', firstName: 'Teninlanimi', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'admin', profile: 'https://res.cloudinary.com/dq18zmq0f/image/upload/v1732807848/file.jpg' },
    { id: '2', email: 'teninlanimitaiwo@gmail.com', color: 'red', firstName: 'Fola', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'student', profile: 'https://imgcdn.stablediffusionweb.com/2024/5/8/579453e2-3fa3-4d2c-a059-ccc3096780f3.jpg' },
    { id: '3', email: 'teninlanimi@gmail.com', color: 'blue', firstName: 'Bola', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'student', profile: 'https://cdn2.stylecraze.com/wp-content/uploads/2020/09/Beautiful-Women-In-The-World.jpg' },
    { id: '4', email: 'teni@gmail.com', color: 'brown', firstName: 'Bamidele', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'student', profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOeZjZWEr4oFmJhILQQgTy7-WUX9BmRrAAFw&s' },
    { id: '5', email: 'tai@gmail.com', color: 'orangered', firstName: 'Teni', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'student', profile: 'https://pixabay.com/images/search/men/' },
    { id: '6', email: 'avffg@gmail.com', color: 'purple', firstName: 'David', lastName: 'Taiwo', phoneNumber: '+2349068345482', role: 'student', profile: 'https://res.cloudinary.com/dq18zmq0f/image/upload/v1732807848/file.jpg' },
  ];

  return [
    {
      id: '1',
      announcementTitle: '🎉 New Feature Launch: User Profiles!',
      announcementDescription: 'We are excited to launch the new user profiles feature! Now, you can customize your profile and add a bio, picture, and social links.',
      audience: members,
      createdTime: '2025-01-30T10:00:00.000Z',
      announcementPhoto: 'https://img.freepik.com/free-photo/pensive-man-with-megaphone_1187-2083.jpg?t=st=1738338439~exp=1738342039~hmac=c4386e743aa3c898b25bf2bb4a8d4903592817092a023649e8d3a6b3eef990c0&w=740',
    },
    {
      id: '2',
      announcementTitle: '⚠️ Scheduled Maintenance: February 5th',
      announcementDescription: 'Our platform will undergo maintenance on February 5th from 2:00 AM to 4:00 AM. During this time, some features may be temporarily unavailable. Thank you for your understanding.',
      audience: members,
      createdTime: '2025-01-29T15:00:00.000Z',
      announcementPhoto: 'https://img.freepik.com/free-vector/maintenance-concept-illustration_114360-391.jpg?t=st=1738338876~exp=1738342476~hmac=ae85d6c969a01edfb042d42ceb1cbc6fbe30d9bae2476f4c867141d690cb0726&w=740',
    },
    {
      id: '3',
      announcementTitle: '🎓 Webinar Announcement: React Hooks',
      announcementDescription: 'Join us for a free webinar on the basics of React Hooks on February 10th at 3:00 PM. Don’t miss out on this opportunity to learn from Niit Students experts!',
      audience: members,
      createdTime: '2025-01-28T14:30:00.000Z',
      announcementPhoto: 'https://img.freepik.com/free-photo/medium-shot-woman-recording-herself_23-2149272205.jpg?t=st=1738340234~exp=1738343834~hmac=7c01059bed27a559825a87d5abafe2a51c5c02402a4faefae7629b6f1a98e823&w=740',
    },
    {
      id: '4',
      announcementTitle: '💼 Job Openings: Frontend Developer',
      announcementDescription: 'We are hiring! If you have experience with React and want to join a dynamic team, check out our latest job openings.',
      audience: members,
      createdTime: '2025-01-27T11:00:00.000Z',
      announcementPhoto: 'https://img.freepik.com/free-photo/hiring-concept-with-empty-chair_23-2149519862.jpg?ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
    },
    {
      id: '5',
      announcementTitle: '🏆 Monthly Top Performer Award!',
      announcementDescription: 'Congratulations to all top performers this month! Keep up the great work, and look out for your prize in your profile!',
      audience: members,
      createdTime: '2025-01-26T09:00:00.000Z',
      announcementPhoto: 'https://img.freepik.com/free-vector/trophy-award-red-curtain-background-realistic-composition-with-image-golden-star-shaped-cup-pedestal_1284-32296.jpg?ga=GA1.1.407944512.1731239688&semt=ais_hybrid',
    },
  ];
}
