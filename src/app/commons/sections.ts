
export const USER_SECTIONS: Sections[] = [
    { label: 'Catalogue', link: '/item2' },
    { label: 'Your Carts', link: '/item2' },
    { label: 'Login', link: '/item2' },
    { label: 'Your Profile', link: '/item2' }    
];
  
export interface Sections {
    label: string;
    link: string;
}