import { motion } from 'framer-motion';
import { clothingItems, type ClothingItem } from '../data';

interface CatalogProps {
  onSelectItem: (item: ClothingItem) => void;
}

export default function Catalog({ onSelectItem }: CatalogProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
      {clothingItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="group relative cursor-pointer"
          onClick={() => onSelectItem(item)}
        >
          <div className={`w-full aspect-[3/4] rounded-lg overflow-hidden ${item.imageColor} flex items-center justify-center transition-transform duration-300 group-hover:opacity-75`}>
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 font-medium opacity-50 tracking-widest uppercase text-xs">Image Placeholder</span>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                <span aria-hidden="true" className="absolute inset-0" />
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item.category}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{item.price}</p>
          </div>
          <div className="mt-2 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Try On →
          </div>
        </motion.div>
      ))}
    </div>
  );
}
