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
  