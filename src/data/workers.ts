export type Category = {
  id: string;
  title: string;
  blurb: string;
  rate: string;
  icon: "driver" | "home" | "cook" | "spark" | "care" | "leaf";
};

export type Worker = {
  id: string;
  name: string;
  role: string;
  city: string;
  rate: string;
  rating: number;
  jobs: number;
  verified: boolean;
  languages: string[];
  bio: string;
  image: string;
  category: string;
};

export const categories: Category[] = [
  {
    id: "drivers",
    title: "Drivers",
    blurb: "Daily commute, airport runs, and family trips.",
    rate: "From Rs 1,500 / day",
    icon: "driver",
  },
  {
    id: "housekeeping",
    title: "Housekeeping",
    blurb: "Trusted help for homes that stay spotless.",
    rate: "From Rs 1,200 / day",
    icon: "home",
  },
  {
    id: "cooks",
    title: "Cooks",
    blurb: "Home-style meals planned around your table.",
    rate: "From Rs 1,800 / day",
    icon: "cook",
  },
  {
    id: "cleaners",
    title: "Cleaners",
    blurb: "Deep cleans for apartments and offices.",
    rate: "From Rs 1,000 / visit",
    icon: "spark",
  },
  {
    id: "care",
    title: "Caregivers",
    blurb: "Patient support for elders and children.",
    rate: "From Rs 2,000 / day",
    icon: "care",
  },
  {
    id: "gardeners",
    title: "Gardeners",
    blurb: "Lawns, plants, and outdoor upkeep.",
    rate: "From Rs 900 / visit",
    icon: "leaf",
  },
];

export const workers: Worker[] = [
  {
    id: "w1",
    name: "Imran Khan",
    role: "Personal Driver",
    city: "Karachi",
    rate: "Rs 45,000 / mo",
    rating: 4.9,
    jobs: 128,
    verified: true,
    languages: ["Urdu", "English"],
    bio: "12 years of safe city driving. Comfortable with school runs and late airport pickups.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    category: "drivers",
  },
  {
    id: "w2",
    name: "Saima Bibi",
    role: "Housekeeper",
    city: "Lahore",
    rate: "Rs 28,000 / mo",
    rating: 4.8,
    jobs: 96,
    verified: true,
    languages: ["Urdu", "Punjabi"],
    bio: "Reliable full-home care — laundry, organizing, and daily tidying with quiet care.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    category: "housekeeping",
  },
  {
    id: "w3",
    name: "Farah Naz",
    role: "Home Cook",
    city: "Islamabad",
    rate: "Rs 35,000 / mo",
    rating: 5.0,
    jobs: 74,
    verified: true,
    languages: ["Urdu", "English"],
    bio: "Pakistani and continental menus for busy households. Flexible for parties.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    category: "cooks",
  },
  {
    id: "w4",
    name: "Ali Raza",
    role: "Deep Clean Specialist",
    city: "Karachi",
    rate: "Rs 3,500 / visit",
    rating: 4.7,
    jobs: 210,
    verified: true,
    languages: ["Urdu"],
    bio: "Move-in cleans, kitchens, and bathrooms done thoroughly and on schedule.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    category: "cleaners",
  },
  {
    id: "w5",
    name: "Naseem Akhtar",
    role: "Elder Caregiver",
    city: "Lahore",
    rate: "Rs 40,000 / mo",
    rating: 4.9,
    jobs: 61,
    verified: true,
    languages: ["Urdu", "Punjabi"],
    bio: "Gentle companionship, medicine reminders, and light household support.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    category: "care",
  },
  {
    id: "w6",
    name: "Hassan Malik",
    role: "Family Driver",
    city: "Rawalpindi",
    rate: "Rs 42,000 / mo",
    rating: 4.8,
    jobs: 89,
    verified: true,
    languages: ["Urdu", "English"],
    bio: "Licensed, punctual, and experienced with kids’ school schedules.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    category: "drivers",
  },
];
