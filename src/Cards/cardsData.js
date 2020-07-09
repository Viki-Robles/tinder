import builder1 from '../Cards/images/picture1.png';
import builder2 from '../Cards/images/picture2.png';
import builder3 from '../Cards/images/picture3.png';
import builder4 from '../Cards/images/picture4.png';

export default function cardsData() {
    return [
        { id: 1, name: "George", age: 25, picture: builder1 },
        { id: 2, name: "Nick", age: 35, picture: builder2 },
        { id: 3, name: "John", age: 26, picture: builder3 },
        { id: 4, name: "Michael", age: 40, picture: builder4 }
    ]
}