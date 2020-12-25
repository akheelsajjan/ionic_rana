export interface IActivity {
    id: string;
    video_url: string;
    name: string;
    description: string;
    duration: string;
    created_by: string;
    image: string;
    thumbnail: string;
    cropped: string;
    file_name_original: string;
    popularity: string;
    category_id: string;
    category: string;
    keywords: string;
  }

  export interface ILoginCredential{
    email:string,
    password:string;
  }