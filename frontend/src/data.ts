export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  price: string;
  imageColor: string;
  imageUrl?: string;
}

import tshirtImg from './assets/001.jpeg';
import item2Img from './assets/002.png';
import item3Img from './assets/003.png';
import item4Img from './assets/004.png';

export const clothingItems: ClothingItem[] = [
  { id: '1', name: 'Essential Cotton T-Shirt', category: 'Tops', price: '$25.00', imageColor: 'bg-stone-200', imageUrl: tshirtImg },
  { id: '2', name: 'Classic Denim Jacket', category: 'Outerwear', price: '$85.00', imageColor: 'bg-blue-200', imageUrl: item2Img },
  { id: '3', name: 'Relaxed Fit Jeans', category: 'Bottoms', price: '$60.00', imageColor: 'bg-indigo-200', imageUrl: item3Img },
  { id: '4', name: 'Merino Wool Sweater', category: 'Knitwear', price: '$95.00', imageColor: 'bg-orange-100', imageUrl: item4Img },
  { id: '5', name: 'Lightweight Linen Shirt', category: 'Tops', price: '$45.00', imageColor: 'bg-zinc-200' },
  { id: '6', name: 'Athletic Joggers', category: 'Bottoms', price: '$55.00', imageColor: 'bg-gray-300' },
  { id: '7', name: 'Oversized Hoodie', category: 'Sweatshirts', price: '$65.00', imageColor: 'bg-rose-100' },
  { id: '8', name: 'Tailored Chinos', category: 'Bottoms', price: '$70.00', imageColor: 'bg-amber-100' },
  { id: '9', name: 'Vintage Leather Jacket', category: 'Outerwear', price: '$199.00', imageColor: 'bg-amber-900/30' },
  { id: '10', name: 'Striped Breton Top', category: 'Tops', price: '$35.00', imageColor: 'bg-slate-200' },
  { id: '11', name: 'Puffer Vest', category: 'Outerwear', price: '$75.00', imageColor: 'bg-emerald-100' },
  { id: '12', name: 'Pleated Trousers', category: 'Bottoms', price: '$80.00', imageColor: 'bg-stone-300' },
  { id: '13', name: 'Chunky Cable Knit', category: 'Knitwear', price: '$110.00', imageColor: 'bg-orange-50' },
  { id: '14', name: 'Graphic Print Tee', category: 'Tops', price: '$30.00', imageColor: 'bg-yellow-100' },
  { id: '15', name: 'Cargo Pants', category: 'Bottoms', price: '$85.00', imageColor: 'bg-green-800/20' },
  { id: '16', name: 'Fleece Pullover', category: 'Sweatshirts', price: '$60.00', imageColor: 'bg-fuchsia-100' },
  { id: '17', name: 'Trench Coat', category: 'Outerwear', price: '$150.00', imageColor: 'bg-yellow-900/20' },
  { id: '18', name: 'Basic Tank Top', category: 'Tops', price: '$15.00', imageColor: 'bg-gray-100' },
  { id: '19', name: 'Slim Fit Shorts', category: 'Bottoms', price: '$40.00', imageColor: 'bg-blue-100' },
  { id: '20', name: 'Cashmere Cardigan', category: 'Knitwear', price: '$140.00', imageColor: 'bg-rose-50' },
];
