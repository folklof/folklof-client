export interface BookAttributes {
  ID: string;
  category_id: string;
  agegroup_id: string;
  book_code: string;
  title: string;
  desc: string;
  duration: string;
  audio_link: string;
  cover_image: string;
  created_date: string;
  category: {
    ID: string;
    name: string;
    desc: string;
  };
  agegroup: {
    ID: string;
    name: string;
    desc: string;
  };
  isLoading?: boolean; // Optional isLoading attribute
}

export interface ICategory {
  ID: string;
  name: string;
  desc: string;
}

export interface IAgeGroup {
  ID: string;
  name: string;
  desc: string;
}

export interface QuizQuestion {
  ID: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
}

export interface QuizProps {
  bookId: string;
}

export interface BookWithRating extends BookAttributes {
  avgRating?: number;
  totalBookReviews?: number;
}

// Review
export interface Review {
  ID: string;
  user_id: string;
  book_id: string;
  title: string;
  description: string;
  rating: number;
  created_date: string;
  user: {
    ID: string;
    role_id: number;
    username: string;
    email: string;
    phone?: string;
    age?: number;
    avatar: string;
    created_date: string;
  };
  book: {
    ID: string;
    category_id: string;
    agegroup_id: string;
    book_code: string;
    title: string;
    desc: string;
    duration: string;
    audio_link: string;
    cover_image: string;
    created_date: string;
  };
}
