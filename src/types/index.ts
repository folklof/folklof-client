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
  user: {
    role_id: number;
    username: string;
  };

  isLoading?: boolean;
}

export interface PopularBook {
  book_id: string;
  book?: {
    title: string;
    category: {
      name: string;
    };
    cover_image: string;
    user: {
      role_id: number;
      username: string;
    };
  };
  avgRating?: string;
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
  avgRating?: string;
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

//Favourite
export interface FavouriteBookDetails {
  ID: string;
  title: string;
  desc: string;
  duration: string;
  audio_link: string;
  cover_image: string;
  created_date: string;
  avgRating?: string;
}

export interface FavouriteBook {
  ID: string;
  user_id: string;
  book_id: string;
  is_add: boolean;
  created_date: string;
  book: FavouriteBookDetails;
}

export interface FavouriteProps {
  onLoaded: () => void;
}

// Library
export interface BookDetails {
  ID: string;
  title: string;
  desc: string;
  duration: string;
  audio_link: string;
  cover_image: string;
  created_date: string;
  avgRating?: string;
}

export interface LibraryBook {
  ID: string;
  user_id: string;
  book_id: string;
  is_read: boolean;
  created_date: string;
  book: BookDetails;
}

export interface LibraryProps {
  onLoaded: () => void;
}

// Rating
export interface RatingResponse {
  success: boolean;
  message: string;
  data: {
    avgRating?: number;
    totalBookReviews?: number;
  };
}

//user
export interface UserProfile {
  ID: string;
  role_id: number;
  username: string;
  email: string;
  phone: string | null;
  age: number | null;
  avatar: string;
  created_date: string;
  role?: {
    name: string;
  };
}

//book card
export interface BookCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  author: string;
  avgRating?: string;
  iconRole?: number;
}

// featured card
export interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export interface ImageProps {
  imgUrl: string;
  styleName: string;
  styleName2: string;
  alt: string;
}

export interface UserRootState {
  user: {
    user: UserProfile | null;
  };
}

export interface MesageBackdrop {
  message: string;
}
