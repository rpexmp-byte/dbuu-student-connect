/**
 * Idempotent Seed Script for DBUU Student Connect Public Presentation
 * Usage: node src/scripts/seedDemoTeam.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Connection from '../models/Connection.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

dotenv.config();

const DEFAULT_USER_PASSWORD = process.env.DEFAULT_USER_PASSWORD || '1234';
const TEAM_DEMO_PASSWORD = process.env.DEMO_SEED_PASSWORD || 'Dbuu@2026';

const TEAM_ACCOUNTS = [
  {
    email: 'rajat.kishore@dbuu.ac.in',
    fullName: 'Rajat Kishore',
    firstName: 'Rajat',
    lastName: 'Kishore',
    role: 'student',
    department: 'SoEC - Computer Science & Engineering',
    academicYear: '3rd Year',
    rollNumber: '24BTCSE0039',
    graduationYear: null,
    currentPosition: '',
    headline: 'B.Tech CSE (3rd Year) • Backend APIs, MongoDB & Real-Time Socket.io Lead | DBUU Student Connect',
    about:
      'Undergraduate CSE student at Dev Bhoomi Uttarakhand University (SoEC). Leading full-stack system integration, JWT authentication, and real-time campus mentorship workflows for DBUU Student Connect.',
    location: 'Dehradun, Uttarakhand, India',
    profilePicURL: '/avatars/rajat.svg',
    skills: [
      { name: 'Node.js', endorsements: 14 },
      { name: 'Express.js', endorsements: 12 },
      { name: 'MongoDB', endorsements: 11 },
      { name: 'React', endorsements: 10 },
      { name: 'Socket.io', endorsements: 9 },
    ],
    education: [
      {
        school: 'Dev Bhoomi Uttarakhand University (DBUU)',
        degree: 'B.Tech',
        fieldOfStudy: 'Computer Science & Engineering',
        startDate: new Date('2024-08-01'),
        grade: '8.7 CGPA',
        description: 'School of Engineering & Computing (SoEC), Roll No: 24BTCSE0039',
      },
    ],
    experience: [
      {
        company: 'DBUU Student Connect (Review-I Team)',
        position: 'Full-Stack & Backend Architecture Lead',
        startDate: new Date('2026-08-01'),
        current: true,
        location: 'DBUU Dehradun Campus',
        description: 'Built cohort role schemas, REST APIs, Socket.io messaging, and frontend state integration.',
      },
    ],
  },
  {
    email: 'ansh@dbuu.ac.in',
    fullName: 'Ansh',
    firstName: 'Ansh',
    lastName: '',
    role: 'student',
    department: 'SoEC - Computer Science & Engineering',
    academicYear: '3rd Year',
    rollNumber: '24BTCSE0340',
    graduationYear: null,
    currentPosition: '',
    headline: 'B.Tech CSE (3rd Year) • Frontend UI/UX, Tailwind Design System & Component Engineering',
    about:
      'B.Tech Computer Science student at DBUU focused on modern React interfaces, accessible academic dashboards, and role-based visual hierarchy for intra-campus collaboration.',
    location: 'Dehradun, Uttarakhand, India',
    profilePicURL: '/avatars/ansh.svg',
    skills: [
      { name: 'React 18', endorsements: 13 },
      { name: 'Tailwind CSS', endorsements: 15 },
      { name: 'UI/UX Prototyping', endorsements: 11 },
      { name: 'Redux Toolkit', endorsements: 8 },
    ],
    education: [
      {
        school: 'Dev Bhoomi Uttarakhand University (DBUU)',
        degree: 'B.Tech',
        fieldOfStudy: 'Computer Science & Engineering',
        startDate: new Date('2024-08-01'),
        grade: '8.5 CGPA',
        description: 'School of Engineering & Computing (SoEC), Roll No: 24BTCSE0340',
      },
    ],
    experience: [
      {
        company: 'DBUU Student Connect (Review-I Team)',
        position: 'Frontend & Design System Engineer',
        startDate: new Date('2026-08-01'),
        current: true,
        location: 'DBUU Dehradun Campus',
        description: 'Designed the DBUU Navy & Saffron visual system, interactive feed layout, and role badge UI.',
      },
    ],
  },
  {
    email: 'yash.kholiya@dbuu.ac.in',
    fullName: 'Yash Kholiya',
    firstName: 'Yash',
    lastName: 'Kholiya',
    role: 'student',
    department: 'SoEC - Artificial Intelligence & ML',
    academicYear: '3rd Year',
    rollNumber: '24BTCSEAI0137',
    graduationYear: null,
    currentPosition: '',
    headline: 'B.Tech CSE (AI & ML) • Semantic Doubt Routing & Phase-2 NLP Helpdesk Architecture',
    about:
      'CSE (AI & ML) undergraduate at DBUU researching Hinglish/code-mixed semantic embeddings and automated student doubt fallback pipelines for Phase 2 of DBUU Student Connect.',
    location: 'Dehradun, Uttarakhand, India',
    profilePicURL: '/avatars/yash.svg',
    skills: [
      { name: 'Machine Learning', endorsements: 14 },
      { name: 'Sentence-BERT', endorsements: 10 },
      { name: 'Python', endorsements: 12 },
      { name: 'JavaScript', endorsements: 9 },
    ],
    education: [
      {
        school: 'Dev Bhoomi Uttarakhand University (DBUU)',
        degree: 'B.Tech',
        fieldOfStudy: 'CSE - Artificial Intelligence & Machine Learning',
        startDate: new Date('2024-08-01'),
        grade: '8.6 CGPA',
        description: 'School of Engineering & Computing (SoEC), Roll No: 24BTCSEAI0137',
      },
    ],
    experience: [
      {
        company: 'DBUU Student Connect (Review-I Team)',
        position: 'AI / NLP Module & Feed Tag Architect',
        startDate: new Date('2026-08-01'),
        current: true,
        location: 'DBUU Dehradun Campus',
        description: 'Specifying the semantic retrieval pipeline and campus quick-tag routing into public mentorship threads.',
      },
    ],
  },
  {
    email: 'sumit.sharma@dbuu.ac.in',
    fullName: 'Dr. Sumit Sharma',
    firstName: 'Dr. Sumit',
    lastName: 'Sharma',
    role: 'mentor',
    department: 'SoEC - Computer Science & Engineering',
    academicYear: 'Faculty',
    rollNumber: 'FAC-SOEC-01',
    graduationYear: null,
    currentPosition: 'Professor (CSE), SoEC • Project Supervisor',
    headline: 'Professor (CSE), School of Engineering & Computing, DBUU • Project Supervisor',
    about:
      'Faculty mentor and Review-I Project Supervisor at Dev Bhoomi Uttarakhand University, guiding undergraduate research in Software Engineering, Distributed Systems, and Applied NLP.',
    location: 'DBUU SoEC Campus, Dehradun',
    profilePicURL: '/avatars/sumit.svg',
    skills: [
      { name: 'Software Architecture', endorsements: 28 },
      { name: 'Distributed Systems', endorsements: 22 },
      { name: 'Academic Mentorship', endorsements: 35 },
      { name: 'Applied NLP', endorsements: 19 },
    ],
    education: [
      {
        school: 'Dev Bhoomi Uttarakhand University / Research Division',
        degree: 'Ph.D.',
        fieldOfStudy: 'Computer Science & Engineering',
        description: 'Supervisor — DBUU Student Connect Intra-College Mentorship Platform',
      },
    ],
    experience: [
      {
        company: 'Dev Bhoomi Uttarakhand University (SoEC)',
        position: 'Professor (CSE) & Project Supervisor',
        startDate: new Date('2020-01-01'),
        current: true,
        location: 'Dehradun, Uttarakhand',
        description: 'Mentoring B.Tech Computer Science & AI engineering cohorts and reviewing synopsis deliverables.',
      },
    ],
  },
  {
    email: 'rohan.rawat@dbuu.ac.in',
    fullName: 'Rohan Rawat',
    firstName: 'Rohan',
    lastName: 'Rawat',
    role: 'passout',
    department: 'SoEC - Computer Science & Engineering',
    academicYear: 'Alumni',
    rollNumber: '20BTCSE0112',
    graduationYear: 2024,
    currentPosition: 'Software Engineer at Infosys',
    headline: "DBUU Alumni (Class of '24) • Software Engineer at Infosys | Placement & DSA Mentor",
    about:
      'Graduated from DBUU School of Engineering & Computing in 2024. Active alumni mentor helping 2nd and 3rd year DBUU students with DSA interviews, MERN full-stack portfolios, and campus placements.',
    location: 'Bengaluru / Dehradun, India',
    profilePicURL: '/avatars/rohan.svg',
    skills: [
      { name: 'Data Structures & Algorithms', endorsements: 19 },
      { name: 'System Design', endorsements: 14 },
      { name: 'MERN Stack', endorsements: 16 },
      { name: 'Interview Prep', endorsements: 21 },
    ],
    education: [
      {
        school: 'Dev Bhoomi Uttarakhand University (DBUU)',
        degree: 'B.Tech',
        fieldOfStudy: 'Computer Science & Engineering',
        startDate: new Date('2020-08-01'),
        endDate: new Date('2024-06-01'),
        grade: '8.9 CGPA',
        description: "Class of '24 Alumnus • Training & Placement Student Coordinator",
      },
    ],
    experience: [
      {
        company: 'Infosys',
        position: 'Software Engineer',
        startDate: new Date('2024-07-01'),
        current: true,
        location: 'Bengaluru, India',
        description: 'Working on cloud-native REST microservices and mentoring DBUU juniors via Student Connect.',
      },
    ],
  },
];

async function upsertDemoUsers() {
  const usersByEmail = {};

  for (const data of TEAM_ACCOUNTS) {
    const accountPassword =
      data.email === 'rajat.kishore@dbuu.ac.in'
        ? DEFAULT_USER_PASSWORD
        : TEAM_DEMO_PASSWORD;
    let user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      user = new User({
        email: data.email,
        password: accountPassword,
        fullName: data.fullName,
        authMethod: 'email-password',
      });
    } else {
      user.password = accountPassword;
      user.markModified('password');
    }

    user.fullName = data.fullName;
    user.profilePicURL = data.profilePicURL;
    user.role = data.role;
    user.department = data.department;
    user.academicYear = data.academicYear;
    user.rollNumber = data.rollNumber;
    user.graduationYear = data.graduationYear;
    user.currentPosition = data.currentPosition;
    user.active = true;
    user.profile = {
      ...(user.profile || {}),
      firstName: data.firstName,
      lastName: data.lastName,
      headline: data.headline,
      about: data.about,
      countryLoc: 'India',
      postalCodeLoc: '248007',
      location: data.location,
      experience: data.experience,
      education: data.education,
      skills: data.skills,
    };

    await user.save();
    usersByEmail[data.email] = user;
  }

  // Establish mutual connections across all demo accounts
  const allUsers = Object.values(usersByEmail);
  for (const u of allUsers) {
    const peerIds = allUsers
      .filter((other) => other._id.toString() !== u._id.toString())
      .map((other) => other._id);

    u.followers = peerIds;
    u.following = peerIds;
    u.connections = peerIds;
    await u.save();
  }

  for (let i = 0; i < allUsers.length; i += 1) {
    for (let j = i + 1; j < allUsers.length; j += 1) {
      const a = allUsers[i]._id;
      const b = allUsers[j]._id;
      const [user1, user2] = a.toString() < b.toString() ? [a, b] : [b, a];
      await Connection.findOneAndUpdate(
        { user1, user2 },
        { user1, user2, active: true, connectedAt: new Date() },
        { upsert: true, new: true }
      );
    }
  }

  return usersByEmail;
}

async function seedCampusPosts(users) {
  const existingCount = await Post.countDocuments({
    user: { $in: Object.values(users).map((u) => u._id) },
    active: true,
  });

  if (existingCount >= 5) {
    console.log(`ℹ️  Demo campus feed already has ${existingCount} posts; skipping post duplication.`);
    return;
  }

  const rajat = users['rajat.kishore@dbuu.ac.in'];
  const ansh = users['ansh@dbuu.ac.in'];
  const yash = users['yash.kholiya@dbuu.ac.in'];
  const sumit = users['sumit.sharma@dbuu.ac.in'];
  const rohan = users['rohan.rawat@dbuu.ac.in'];

  const samplePosts = [
    {
      user: sumit._id,
      text: 'Welcome to DBUU Student Connect (Review-I Portal)! Teams presenting synopsis updates this week should share module progress under #Review1_Synopsis and tag their departmental mentors for feedback. #SoECNotice',
      hashtags: ['review1_synopsis', 'soecnotice'],
      likes: [rajat._id, ansh._id, yash._id, rohan._id],
      reactions: [
        { user: rajat._id, type: 'like' },
        { user: ansh._id, type: 'insightful' },
        { user: yash._id, type: 'like' },
        { user: rohan._id, type: 'celebrate' },
      ],
      comments: [
        {
          user: rajat._id,
          text: 'Thank you Sir! Backend REST endpoints, cohort schemas, and Socket.io DMs are live and ready for Review-I verification.',
        },
        {
          user: ansh._id,
          text: 'UI theme and Role Badges (Student / Pass-out / Mentor) are integrated across Feed, Composer, and Profile views.',
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 180),
    },
    {
      user: rajat._id,
      text: 'Completed full cohort identity persistence across MongoDB + Redux! Students, Pass-out Alumni, and Faculty Mentors now render verified role badges, enrollment IDs, and direct mentoring threads seamlessly. #MERN_Stack #MiniProject #Review1_Synopsis',
      hashtags: ['mern_stack', 'miniproject', 'review1_synopsis'],
      likes: [sumit._id, ansh._id, yash._id],
      reactions: [
        { user: sumit._id, type: 'celebrate' },
        { user: ansh._id, type: 'like' },
        { user: yash._id, type: 'insightful' },
      ],
      comments: [
        {
          user: sumit._id,
          text: 'Well structured architecture. Good separation between Phase 1 mentorship feed and the reserved Phase 2 AI slot.',
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      user: ansh._id,
      text: 'Standardized the DBUU Navy (#172B52) and Saffron (#F58220) design system across the desktop feed, profile headers, and circular crest badge geometry. Quick academic hashtag pills are now 1-click inside the composer! #MiniProject #Review1_Synopsis',
      hashtags: ['miniproject', 'review1_synopsis'],
      likes: [rajat._id, yash._id, sumit._id],
      reactions: [
        { user: rajat._id, type: 'like' },
        { user: yash._id, type: 'celebrate' },
        { user: sumit._id, type: 'like' },
      ],
      comments: [
        {
          user: rohan._id,
          text: 'Clean hierarchy — juniors will be able to filter placement and project queries much faster than scrolling WhatsApp groups.',
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 75),
    },
    {
      user: yash._id,
      text: 'Doubt for Phase 2 planning: For code-mixed Hinglish queries (like "3rd year mini project synopsis deadline kya hai?"), should we benchmark Sentence-BERT multilingual embeddings before routing low-confidence queries to seniors here? #MiniProject #ExamPrep',
      hashtags: ['miniproject', 'examprep'],
      likes: [rajat._id, ansh._id, rohan._id, sumit._id],
      reactions: [
        { user: sumit._id, type: 'insightful' },
        { user: rohan._id, type: 'support' },
        { user: rajat._id, type: 'like' },
      ],
      comments: [
        {
          user: sumit._id,
          text: 'Yes Yash — keep confidence threshold tunable (e.g. 0.72) and preserve the 1-click Escalate-to-Mentor option for Phase 2.',
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 40),
    },
    {
      user: rohan._id,
      text: "Alumni note for DBUU 2nd & 3rd Year SoEC students: Build at least one deployed MERN or full-stack project with clean API docs and real Git history before campus placement drives begin. Happy to review resumes over Direct Messages! #Placements #MERN_Stack",
      hashtags: ['placements', 'mern_stack'],
      likes: [rajat._id, ansh._id, yash._id, sumit._id],
      reactions: [
        { user: rajat._id, type: 'support' },
        { user: ansh._id, type: 'celebrate' },
        { user: yash._id, type: 'like' },
      ],
      comments: [
        {
          user: rajat._id,
          text: 'Thanks Rohan bhaiya! Sharing our DBUU Student Connect Review-I demo with you shortly.',
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 15),
    },
  ];

  await Post.insertMany(samplePosts);
  console.log(`✅ Seeded ${samplePosts.length} DBUU campus feed posts with comments & reactions.`);
}

async function seedDemoConversations(users) {
  const existingConv = await Conversation.countDocuments({
    participants: users['rajat.kishore@dbuu.ac.in']._id,
  });

  if (existingConv > 0) {
    console.log(`ℹ️  Demo Direct Messages already seeded (${existingConv} conversations).`);
    return;
  }

  const rajat = users['rajat.kishore@dbuu.ac.in'];
  const ansh = users['ansh@dbuu.ac.in'];
  const sumit = users['sumit.sharma@dbuu.ac.in'];
  const rohan = users['rohan.rawat@dbuu.ac.in'];
  const yash = users['yash.kholiya@dbuu.ac.in'];

  const pairs = [
    {
      p1: rajat._id,
      p2: sumit._id,
      messages: [
        { sender: rajat._id, content: 'Good evening Sir, our DBUU Student Connect prototype and team logins are ready for Review-I.' },
        { sender: sumit._id, content: 'Great work team. Be ready to demonstrate Student, Alumni Pass-out, and Faculty Mentor views plus live DM messaging.' },
      ],
    },
    {
      p1: rajat._id,
      p2: ansh._id,
      messages: [
        { sender: ansh._id, content: 'Role badges, circular DBUU crest, and profile edit modals are synced cleanly.' },
        { sender: rajat._id, content: 'Awesome! Backend schema and seeded demo accounts are verified too.' },
      ],
    },
    {
      p1: yash._id,
      p2: rohan._id,
      messages: [
        { sender: yash._id, content: 'Hi Rohan bhaiya, we added an Alumni Pass-out badge workflow so seniors can mentor students directly.' },
        { sender: rohan._id, content: 'Looks super clean! Ping me anytime before placements or Review-II.' },
      ],
    },
  ];

  for (const item of pairs) {
    const conv = await Conversation.create({
      participants: [item.p1, item.p2],
      isGroup: false,
      lastMessageAt: new Date(),
    });

    let lastMsg = null;
    for (const m of item.messages) {
      lastMsg = await Message.create({
        conversation: conv._id,
        sender: m.sender,
        content: m.content,
        readBy: [{ user: m.sender, readAt: new Date() }],
      });
    }

    conv.lastMessage = lastMsg._id;
    conv.lastMessageAt = lastMsg.createdAt;
    await conv.save();
  }

  console.log(`✅ Seeded ${pairs.length} DBUU mentorship conversations & Direct Messages.`);
}

async function runSeed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not set in backend/.env');
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB:', process.env.MONGO_URI);

    const users = await upsertDemoUsers();
    console.log(`✅ Upserted ${Object.keys(users).length} verified DBUU team/cohort profiles:`);
    for (const u of Object.values(users)) {
      console.log(`   - ${u.fullName} | ${u.email} | role=${u.role} | id=${u._id}`);
    }

    await seedCampusPosts(users);
    await seedDemoConversations(users);

    console.log('\n🎉 Presentation database seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

runSeed();
