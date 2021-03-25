// Inspirert av forelesningene//
import Kommentarer from "./IComment";

interface TurPost {
    id: number;
    title: string;
    description: string;
    image_filename: string;
    gradering:string;
    user: {
        id: string; 
        display_name: string;
    } 
    comments?: Kommentarer[];

    //likes: number;

}

export default TurPost;