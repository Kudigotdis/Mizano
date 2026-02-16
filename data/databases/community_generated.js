// community_generated.js
// Mizano Community Panel Data – Bulletin, Lost & Found, Jobs, News Flash
// Inject into window.MIZANO_DATA.community

window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.community = {

  // ----- Bulletin Board Posts (general announcements) -----
  bulletin: [
    {
      postId: "bul-001",
      type: "bulletin",
      title: "Block 3 Community Cleanup Day",
      content: "Join us on Saturday 22 Feb at 08:00 to clean up Block 3 Park. Bring gloves and bags. Refreshments provided.",
      author: {
        name: "Kago Mosweu",
        profileId: "p_mentor_001",
        avatar: "/avatars/kago.webp"
      },
      location: "Block 3, Gaborone",
      createdAt: "2026-02-13T10:30:00Z",
      expiresAt: "2026-02-22T23:59:59Z",
      whatsappLink: "https://wa.me/26771234567?text=I'm%20interested%20in%20the%20Block%203%20Cleanup"
    },
    {
      postId: "bul-002",
      type: "bulletin",
      title: "Free Chess Lessons at UB",
      content: "Every Saturday 14:00-16:00 at UB Student Centre. All levels welcome.",
      author: {
        name: "Refilwe Moatlhodi",
        profileId: "p_mentor_002",
        avatar: "/avatars/refilwe.webp"
      },
      location: "Gaborone",
      createdAt: "2026-02-12T14:15:00Z",
      whatsappLink: "https://wa.me/26772345678?text=I'd%20like%20to%20join%20the%20chess%20lessons"
    }
  ],

  // ----- Lost & Found Items -----
  lostFound: [
    {
      postId: "lf-001",
      type: "lost",
      title: "Lost: Adidas Football Boots",
      description: "Size 9, black with white stripes. Lost at Block 3 Sports Complex on 12 Feb after 18:00 match.",
      category: "equipment",
      location: "Block 3 Sports Complex, Gaborone",
      date: "2026-02-12",
      photo: "/images/lost/boots.webp",
      poster: {
        name: "John Modise",
        profileId: "p_player_001",
        whatsapp: "+26773456123"
      },
      boosted: false,
      createdAt: "2026-02-13T09:00:00Z"
    },
    {
      postId: "lf-002",
      type: "found",
      title: "Found: Water Bottle",
      description: "Blue Nama brand water bottle, found near the netball court at Broadhurst Complex.",
      category: "accessory",
      location: "Broadhurst Complex, Gaborone",
      date: "2026-02-13",
      photo: null,
      poster: {
        name: "Sarah Kgosana",
        profileId: "p_player_002",
        whatsapp: "+26774567234"
      },
      boosted: true,  // paid P2.00 boost
      createdAt: "2026-02-13T11:30:00Z"
    },
    {
      postId: "lf-003",
      type: "lost",
      title: "Lost: Student ID Card",
      description: "Name: Thato Molefe, UB student. Lost somewhere on campus.",
      category: "document",
      location: "University of Botswana",
      date: "2026-02-12",
      photo: null,
      poster: {
        name: "Thato Molefe",
        profileId: "p_student_001",
        whatsapp: "+26771234001"
      },
      boosted: false,
      createdAt: "2026-02-12T16:20:00Z"
    }
  ],

  // ----- Job Postings -----
  jobs: [
    {
      jobId: "job-001",
      title: "Youth Soccer Coach (Part-Time)",
      company: "FC Gaborone",
      location: "Block 3, Gaborone",
      type: "part_time",
      description: "We're looking for a coach for our U13 team. Practice Wed/Fri 16:00-18:00, matches Sat mornings. Minimum Level 1 coaching certificate.",
      requirements: ["Coaching Level 1", "First Aid certified", "Experience with youth"],
      salary: "P150 per session",
      contactWhatsApp: "+26771234567",
      postedAt: "2026-02-10T08:00:00Z",
      deadline: "2026-02-28T23:59:59Z"
    },
    {
      jobId: "job-002",
      title: "Referees for Corporate League",
      company: "Gaborone Sports Council",
      location: "Various venues, Gaborone",
      type: "casual",
      description: "Need qualified referees for the Corporate Soccer League (March–May). Matches on Saturdays.",
      requirements: ["BFA registered referee", "Available Saturdays"],
      salary: "P200 per match",
      contactWhatsApp: "+26772345678",
      postedAt: "2026-02-12T10:15:00Z",
      deadline: "2026-03-01T23:59:59Z"
    },
    {
      jobId: "job-003",
      title: "Sports Equipment Sales Assistant",
      company: "Champion Sports",
      location: "Main Mall, Gaborone",
      type: "full_time",
      description: "Assist customers with sports gear, manage inventory. Weekday shifts 09:00-18:00, some Saturdays.",
      requirements: ["Grade 12 certificate", "Friendly demeanor", "Interest in sports"],
      salary: "P2,500/month",
      contactWhatsApp: "+26773456987",
      postedAt: "2026-02-09T14:30:00Z",
      deadline: "2026-03-15T23:59:59Z"
    }
  ],

  // ----- News Flash (Official Announcements) -----
  newsFlash: [
    {
      newsId: "news-001",
      source: "Botswana Football Association",
      sourceLogo: "/logos/bfa.webp",
      headline: "Mogogi Gabonamong to host youth clinic",
      summary: "Former Zebras captain Mogogi Gabonamong will conduct a free football clinic for U15 players at National Stadium on 28 Feb. Registration opens 15 Feb.",
      category: "BFA UPDATES",
      thumbnail: "/images/news/mogogi.webp",
      publishedAt: "2026-02-13T08:00:00Z",
      link: "/news/bfa-clinic"  // internal or external
    },
    {
      newsId: "news-002",
      source: "Botswana Netball Association",
      sourceLogo: "/logos/bona.webp",
      headline: "U17 Netball Trials announced",
      summary: "Trials for the national U17 netball team will be held in Gaborone, Francistown and Maun from 5-12 March. Eligible players born 2009-2010.",
      category: "NATIONAL TEAM",
      thumbnail: "/images/news/netball-trials.webp",
      publishedAt: "2026-02-12T09:30:00Z",
      link: "/news/u17-trials"
    },
    {
      newsId: "news-003",
      source: "Mizano Team",
      sourceLogo: "/logos/mizano.webp",
      headline: "New offline map tiles for Francistown",
      summary: "You can now download detailed offline maps for Francistown and surrounding areas. Update your app to v1.2.0 to get them.",
      category: "PLATFORM UPDATE",
      thumbnail: null,
      publishedAt: "2026-02-11T11:00:00Z"
    }
  ]
};