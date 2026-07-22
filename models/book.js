const mongoose = require("mongoose")

const books = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    type: "recommended",
    price: 299,
    image: "https://covers.openlibrary.org/b/id/10523338-M.jpg",
    rating: 4.5,
    description: "A psychological thriller."
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-help",
    type: "featured",
    price: 399,
    image: "https://covers.openlibrary.org/b/id/11153223-M.jpg",
    rating: 4.8,
    description: "Build good habits."
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    type: "recommended",
    price: 350,
    image: "https://covers.openlibrary.org/b/id/8228691-M.jpg",
    rating: 4.6,
    description: "Money mindset."
  },
  {
    id: 4,
    title: "Ikigai",
    author: "Héctor García",
    category: "Motivation",
    type: "recent",
    price: 250,
    image: "https://covers.openlibrary.org/b/id/9259256-M.jpg",
    rating: 4.4,
    description: "Purpose of life."
  },
  {
    id: 5,
    title: "Deep Learning",
    author: "Ian Goodfellow",
    category: "AI & ML",
    type: "featured",
    price: 599,
    image: "https://covers.openlibrary.org/b/id/8108691-M.jpg",
    rating: 4.7,
    description: "AI concepts."
  },
  {
    id: 6,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    category: "Web Dev",
    type: "recommended",
    price: 450,
    image: "https://covers.openlibrary.org/b/id/8099251-M.jpg",
    rating: 4.9,
    description: "JS deep dive."
  },
  {
    id: 7,
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    category: "Web Dev",
    type: "recent",
    price: 500,
    image: "https://eloquentjavascript.net/img/cover.jpg",
    rating: 4.8,
    description: "Modern JS guide."
  },
  {
    id: 8,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    type: "featured",
    price: 650,
    image: "https://covers.openlibrary.org/b/id/9641982-M.jpg",
    rating: 4.7,
    description: "Write better code."
  },

  // ---------- More Books ----------

  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    type: "recommended",
    price: 300,
    image: "https://covers.openlibrary.org/b/id/8275261-M.jpg",
    rating: 4.7,
    description: "Spiritual journey."
  },
  {
    id: 10,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Finance",
    type: "featured",
    price: 280,
    image: "https://covers.openlibrary.org/b/id/7222246-M.jpg",
    rating: 4.5,
    description: "Success mindset."
  },
  {
    id: 11,
    title: "The Power ",
    author: "Charles Duhigg",
    category: "Self-help",
    type: "recent",
    price: 320,
    image: "https://covers.openlibrary.org/b/id/8167891-M.jpg",
    rating: 4.6,
    description: "Habit science."
  },
  {
    id: 12,
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    type: "recommended",
    price: 350,
    image: "https://covers.openlibrary.org/b/id/8231856-M.jpg",
    rating: 4.4,
    description: "Startup ideas."
  },
  {
    id: 13,
    title: "Start With Why",
    author: "Simon Sinek",
    category: "Motivation",
    type: "featured",
    price: 330,
    image: "https://covers.openlibrary.org/b/id/8225631-M.jpg",
    rating: 4.6,
    description: "Leadership mindset."
  },
  {
    id: 14,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    type: "recommended",
    price: 700,
    image: "https://covers.openlibrary.org/b/id/8091016-M.jpg",
    rating: 4.8,
    description: "Coding practices."
  },
  {
    id: 15,
    title: "Design Patterns",
    author: "Erich Gamma",
    category: "Programming",
    type: "featured",
    price: 800,
    image: "https://covers.openlibrary.org/b/id/240726-M.jpg",
    rating: 4.7,
    description: "Software design."
  },
  {
    id: 16,
    title: " Coding Interview",
    author: "Gayle Laakmann",
    category: "Programming",
    type: "recent",
    price: 900,
    image: "https://covers.openlibrary.org/b/id/8235116-M.jpg",
    rating: 4.9,
    description: "Interview prep."
  },
  {
    id: 17,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    type: "recommended",
    price: 450,
    image: "https://covers.openlibrary.org/b/id/8370226-M.jpg",
    rating: 4.8,
    description: "Human history."
  },
  {
    id: 18,
    title: "Homo Deus",
    author: "Yuval Noah Harari",
    category: "History",
    type: "featured",
    price: 480,
    image: "https://covers.openlibrary.org/b/id/8369251-M.jpg",
    rating: 4.7,
    description: "Future humans."
  },
  {
    id: 19,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "Self-help",
    type: "recommended",
    price: 300,
    image: "https://covers.openlibrary.org/b/id/8231996-M.jpg",
    rating: 4.5,
    description: "Life lessons."
  },
  {
    id: 20,
    title: "Make Your Bed",
    author: "William McRaven",
    category: "Motivation",
    type: "recent",
    price: 200,
    image: "https://covers.openlibrary.org/b/id/9259259-M.jpg",
    rating: 4.3,
    description: "Small habits."
  },
  {
    id: 21,
    title: "Can't Hurt Me",
    author: "David Goggins",
    category: "Motivation",
    type: "featured",
    price: 450,
    image: "https://covers.openlibrary.org/b/id/9876543-M.jpg",
    rating: 4.9,
    description: "Mental toughness."
  },
  {
    id: 22,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    type: "recommended",
    price: 350,
    image: "https://covers.openlibrary.org/b/id/10567891-M.jpg",
    rating: 4.8,
    description: "Money behavior."
  },
  {
    id: 23,
    title: "Rework",
    author: "Jason Fried",
    category: "Business",
    type: "recent",
    price: 300,
    image: "https://covers.openlibrary.org/b/id/8234412-M.jpg",
    rating: 4.5,
    description: "Business ideas."
  },
  {
    id: 24,
    title: "Hooked",
    author: "Nir Eyal",
    category: "Business",
    type: "featured",
    price: 400,
    image: "https://covers.openlibrary.org/b/id/8234415-M.jpg",
    rating: 4.4,
    description: "Product habits."
  },
  {
    id: 25,
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    type: "recommended",
    price: 420,
    image: "https://covers.openlibrary.org/b/id/8221256-M.jpg",
    rating: 4.6,
    description: "Startup method."
  },
  {
    id: 26,
    title: "Python Crash Course",
    author: "Eric Matthes",
    category: "Programming",
    type: "recent",
    price: 500,
    image: "https://covers.openlibrary.org/b/id/8092231-M.jpg",
    rating: 4.7,
    description: "Learn Python."
  },
  {
    id: 27,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    category: "Web Dev",
    type: "featured",
    price: 380,
    image: "https://covers.openlibrary.org/b/id/8099255-M.jpg",
    rating: 4.6,
    description: "JS essentials."
  },
  {
    id: 28,
    title: "Head First Java",
    author: "Kathy Sierra",
    category: "Programming",
    type: "recommended",
    price: 600,
    image: "https://covers.openlibrary.org/b/id/8093212-M.jpg",
    rating: 4.7,
    description: "Java basics."
  },
  {
    id: 29,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Programming",
    type: "featured",
    price: 1200,
    image: "https://covers.openlibrary.org/b/id/240726-M.jpg",
    rating: 4.9,
    description: "Algorithms bible."
  },
  {
    id: 30,
    title: "Grokking Algorithms",
    author: "Aditya Bhargava",
    category: "Programming",
    type: "recent",
    price: 650,
    image: "https://covers.openlibrary.org/b/id/8235112-M.jpg",
    rating: 4.8,
    description: "Easy algorithms."
  }
];

const bookSchema = new mongoose.Schema({
  id:Number,
  author:String,
  title:String,
  category:String,
 
  price:Number,
  image:String,
  rating:Number,
  description:String,
  type:{
    type:String,
    default: "recent"
  },
  status:{
    type:String,
    default: "available"
  },
  isActive:{
    type:Boolean,
    default:true
  }


})
const bookss = mongoose.model("book", bookSchema);

module.exports = {bookss, books}

