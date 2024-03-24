
export const MENU_ITEMS: MenuItem[] = [
    { label: 'Availability', link: '/item1' },
    { label: 'Catalogue', link: '/item2' },
    { label: 'Carts', link: '/item2' },
    { label: 'Picking', link: '/item2' },
    { label: 'Deliveries', link: '/item2' }    
];
  
export interface MenuItem {
    label: string;
    link: string;
}