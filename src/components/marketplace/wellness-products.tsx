"use client"

import { useState } from 'react'
import { Heart, ShoppingCart, Star, Plus, Minus, X, Eye, Filter, Grid, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  rating: number
  reviews: number
  inStock: boolean
  isNew: boolean
  isSale: boolean
  longDescription: string
  specifications: { [key: string]: string }
  reviews_data: { name: string; rating: number; comment: string; date: string }[]
}

interface CartItem extends Product {
  quantity: number
}

interface WishlistItem extends Product {
  addedDate: string
}

interface Shop {
  id: string;
  name: string;
  description?: string;
  contacts: {
    phone?: string;
    email?: string;
    address?: string;
    website?: string;
    vk?: string;
    instagram?: string;
  };
  image: string;
  products: Product[];
}

const categories = [
  'products.categories.oils',
  'products.categories.accessories',
  'products.categories.skincare',
  'products.categories.tea',
  'products.categories.supplements'
]

const products: Product[] = [
  {
    id: '1',
    name: 'Премиальное масло эвкалипта',
    description: 'Чистое, терапевтическое масло эвкалипта для ароматерапии и оздоровления.',
    longDescription: 'Наше премиальное эфирное масло эвкалипта получено паровой дистилляцией из лучших листьев эвкалипта с сертифицированных органических ферм. Идеально подходит для диффузора, массажных смесей или добавления в ванны для освежающего и бодрящего эффекта.',
    price: 2030,
    originalPrice: 2520,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop'
    ],
    category: 'products.categories.oils',
    rating: 4.8,
    reviews: 127,
    inStock: true,
    isNew: false,
    isSale: true,
    specifications: {
      'Ботаническое название': 'Eucalyptus globulus',
      'Метод экстракции': 'Паровая дистилляция',
      'Объем': '15мл',
      'Происхождение': 'Австралия',
      'Чистота': '100% чистое'
    },
    reviews_data: [
      { name: 'Сара М.', rating: 5, comment: 'Удивительное качество! Аромат такой чистый и освежающий.', date: '2024-01-15' },
      { name: 'Михаил Р.', rating: 5, comment: 'Отлично для диффузора. Помогает при заложенности.', date: '2024-01-10' },
      { name: 'Эмма Л.', rating: 4, comment: 'Хороший продукт, быстрая доставка.', date: '2024-01-08' }
    ]
  },
  {
    id: '2',
    name: 'Традиционный берёзовый веник',
    description: 'Ручной работы берёзовый веник для подлинного русского банного опыта.',
    longDescription: 'Отобранные вручную берёзовые ветки, тщательно связанные традиционными методами, передаваемыми из поколения в поколение. Каждый веник изготовлен из премиальных листьев серебристой берёзы.',
    price: 3150,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542601098-3adb3beb0b9e?w=400&h=600&fit=crop'
    ],
    category: 'products.categories.accessories',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isNew: true,
    isSale: false,
    specifications: {
      'Материал': 'Листья серебристой берёзы',
      'Длина': '40см',
      'Сезон заготовки': 'Раннее лето',
      'Происхождение': 'Карелия, Россия',
      'Обработка': 'Воздушная сушка'
    },
    reviews_data: [
      { name: 'Игорь П.', rating: 5, comment: 'Настоящее качество! Напоминает дом.', date: '2024-01-20' },
      { name: 'Анна К.', rating: 5, comment: 'Идеально для домашней сауны. Отличное состояние.', date: '2024-01-18' }
    ]
  },
  {
    id: '3',
    name: 'Лавандовая смесь для сна',
    description: 'Успокаивающая смесь эфирных масел лаванды для спокойного сна и релаксации.',
    longDescription: 'Тщательно подобранная смесь французской лаванды, ромашки и бергамота, разработанная для глубокого восстанавливающего сна экспертами по ароматерапии.',
    price: 2275,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1609205807107-e7c70e9b4a75?w=400&h=500&fit=crop'
    ],
    category: 'products.categories.oils',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    isNew: false,
    isSale: false,
    specifications: {
      'Компоненты смеси': 'Лаванда, ромашка, бергамот',
      'Объем': '10мл',
      'Разведение': 'Готов к использованию',
      'Происхождение': 'Франция, Болгария',
      'Сертификация': 'Органический'
    },
    reviews_data: [
      { name: 'Лиза Х.', rating: 5, comment: 'Эта смесь творит чудеса с моей бессонницей!', date: '2024-01-22' },
      { name: 'Давид Ж.', rating: 4, comment: 'Прекрасный аромат, помогает расслабиться.', date: '2024-01-19' }
    ]
  },
  {
    id: '4',
    name: 'Гималайская соляная лампа',
    description: 'Лампа из чистой розовой гималайской соли для освещения и очистки воздуха.',
    longDescription: 'Вырезанная вручную из подлинных кристаллов розовой гималайской соли, эта лампа обеспечивает тёплый успокаивающий свет, естественно очищая воздух.',
    price: 5460,
    originalPrice: 6650,
    image: 'https://images.unsplash.com/photo-1551886831-de36bf63b884?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551886831-de36bf63b884?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=500&fit=crop'
    ],
    category: 'products.categories.accessories',
    rating: 4.6,
    reviews: 203,
    inStock: true,
    isNew: false,
    isSale: true,
    specifications: {
      'Материал': '100% гималайская розовая соль',
      'Основание': 'Экологичное дерево',
      'Лампочка': '15Вт накаливания',
      'Размеры': '20см x 15см',
      'Вес': '3-4кг'
    },
    reviews_data: [
      { name: 'Дженнифер К.', rating: 5, comment: 'Красивая лампа, отлично подходит для прикроватного освещения.', date: '2024-01-25' },
      { name: 'Роберт К.', rating: 4, comment: 'Хорошо сделано, приятный тёплый свет.', date: '2024-01-23' }
    ]
  },
  {
    id: '5',
    name: 'Wellness Starter Gift Set',
    description: 'Complete wellness gift set with essential oils, diffuser, and accessories.',
    longDescription: 'The perfect introduction to wellness and aromatherapy. This thoughtfully curated gift set includes a premium ultrasonic diffuser, three essential oil blends, a silk eye pillow, and a comprehensive guide to aromatherapy. Beautifully packaged in our signature eco-friendly gift box.',
    price: 125.00,
    originalPrice: 150.00,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600857062241-98e5dba60f7b?w=400&h=500&fit=crop'
    ],
    category: 'Gift Sets',
    rating: 4.9,
    reviews: 87,
    inStock: true,
    isNew: true,
    isSale: true,
    specifications: {
      'Includes': 'Diffuser, 3 Oils, Eye Pillow, Guide',
      'Diffuser Type': 'Ultrasonic',
      'Essential Oils': 'Lavender, Eucalyptus, Peppermint',
      'Packaging': 'Premium Gift Box',
      'Perfect For': 'Beginners to Aromatherapy'
    },
    reviews_data: [
      { name: 'Maria S.', rating: 5, comment: 'Perfect gift for my sister! She loved everything.', date: '2024-01-26' },
      { name: 'James T.', rating: 5, comment: 'Great value for money. High quality products.', date: '2024-01-24' }
    ]
  },
  {
    id: '6',
    name: 'Oak Sauna Venik',
    description: 'Traditional oak leaf venik for deep cleansing sauna sessions.',
    longDescription: 'Crafted from carefully selected oak leaves, this venik offers a more robust sauna experience compared to birch. Oak leaves contain natural tannins that help cleanse and invigorate the skin while providing a grounding, earthy aroma that enhances the traditional sauna experience.',
    price: 50.00,
    image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=400&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=400&h=600&fit=crop'
    ],
    category: 'Birch Veniks',
    rating: 4.8,
    reviews: 45,
    inStock: false,
    isNew: false,
    isSale: false,
    specifications: {
      'Material': 'Premium Oak Leaves',
      'Length': '45cm',
      'Harvest Season': 'Mid Summer',
      'Origin': 'Scandinavia',
      'Treatment': 'Traditional Drying'
    },
    reviews_data: [
      { name: 'Erik N.', rating: 5, comment: 'Love the robust feel of oak veniks!', date: '2024-01-21' }
    ]
  }
]

const shops: Shop[] = [
  {
    id: 's1',
    name: 'Banya Wellness Store',
    description: 'Эксклюзивные эфирные масла, аксессуары и подарочные наборы. Специализация — оздоровление и чистота.',
    contacts: {
      phone: '+7 (495) 123-45-67',
      email: 'info@banya-wellness.ru',
      address: 'г. Москва, ул. Лесная, д. 10',
      website: 'https://banya-wellness.ru',
      instagram: '@banya_wellness',
    },
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop',
    products: products.slice(0, 3),
  },
  {
    id: 's2',
    name: 'Сауна Пак',
    description: 'Традиционные веники для бани и аксессуары премиального качества. Быстрая доставка и подарочная упаковка.',
    contacts: {
      phone: '+7 (812) 555-77-88',
      email: 'zakaz@saunapak.ru',
      address: 'г. Санкт-Петербург, пр. Банный, д. 8',
      website: 'https://saunapak.ru',
      vk: 'vk.com/saunapak',
    },
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop',
    products: products.slice(3),
  },
]

// Список регионов по городам из адресов магазинов
const allRegions = Array.from(new Set(shops.map(shop => {
  const cityMatch = shop.contacts.address?.match(/г\. ([^,]+)/);
  return cityMatch ? cityMatch[1] : 'Другое';
})))

export default function WellnessProducts() {
  const { t, language } = useLanguage()
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [region, setRegion] = useState('all')

  // NEW: Lightbox modal state for enlarged images
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null)

  // Helper: open lightbox modal for any image
  const openImageModal = (src: string) => {
    setModalImageSrc(src);
    setIsImageModalOpen(true);
  };

  // Helper: close modal
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageSrc(null);
  };

  // Ensure selectedImageIndex is reset when product changes
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
  };

  // Фильтрация магазинов по региону
  const filteredShops = region === 'all' ? shops : shops.filter(shop => {
    const cityMatch = shop.contacts.address?.match(/г\. ([^,]+)/)
    const city = cityMatch ? cityMatch[1] : 'Другое'
    return city === region
  })

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.isNew ? 1 : -1
      default:
        return 0
    }
  })

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevCart, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const toggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id)
      if (isInWishlist) {
        return prevWishlist.filter(item => item.id !== product.id)
      }
      return [...prevWishlist, { ...product, addedDate: new Date().toISOString() }]
    })
  }

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId)
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Магазинная карточка
  const ShopCard = ({ shop }: { shop: Shop }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Card className="bg-card border-border overflow-hidden hover:shadow-lg transition-all duration-300 h-full cursor-pointer" onClick={() => setSelectedShop(shop)}>
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          draggable={false}
        />
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors mb-2">
            {shop.name}
          </h3>
          {shop.description && <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{shop.description}</p>}
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <span>{shop.products.length} товаров</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Card className="bg-card border-border overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-zoom-in"
            onClick={() => openImageModal(product.image)}
            draggable={false}
            tabIndex={0}
            role="button"
            aria-label={product.name + ' — увеличить фото'}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openImageModal(product.image)}
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground px-2 py-1 text-xs">
                Новинка
              </Badge>
            )}
            {product.isSale && (
              <Badge className="bg-destructive text-destructive-foreground px-2 py-1 text-xs">
                Скидка
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
              onClick={() => toggleWishlist(product)}
            >
              <Heart
                className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-primary text-primary' : 'text-foreground'}`}
              />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
              onClick={() => handleOpenProduct(product)}
            >
              <Eye className="h-4 w-4 text-foreground" />
            </Button>
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-muted/80 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">
                {t('products.outOfStock')}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
          {product.description && <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>}
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <span>{product.category}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('products.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Магазины, где вы найдете лучшие товары для здоровья и бани
          </p>
        </div>

        {/* Фильтр регионов */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-foreground mb-2">Регион</label>
            <select
              value={region}
              onChange={e => setRegion(e.target.value)}
              className="w-full bg-background border-border rounded-lg border px-3 py-2 outline-none"
            >
              <option value="all">Все регионы</option>
              {allRegions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Сетка магазинов */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Диалоговое окно магазина */}
        <Dialog open={!!selectedShop} onOpenChange={() => setSelectedShop(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto bg-card">
            {selectedShop && (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0 w-full md:w-1/3 space-y-4">
                  <img
                    src={selectedShop.image}
                    alt={selectedShop.name}
                    className="w-full object-cover rounded-xl"
                    style={{maxHeight: 220}}
                  />
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-foreground">{selectedShop.name}</h2>
                    {selectedShop.description && <p className="mb-2 text-muted-foreground">{selectedShop.description}</p>}
                    <div className="space-y-1 text-sm">
                      {selectedShop.contacts.phone && (<div><span className="font-medium">Тел.:</span> {selectedShop.contacts.phone}</div>)}
                      {selectedShop.contacts.email && (<div><span className="font-medium">Email:</span> {selectedShop.contacts.email}</div>)}
                      {selectedShop.contacts.address && (<div><span className="font-medium">Адрес:</span> {selectedShop.contacts.address}</div>)}
                      {selectedShop.contacts.website && (<div><span className="font-medium">Сайт:</span> <a href={selectedShop.contacts.website} target="_blank" className="text-primary underline">{selectedShop.contacts.website}</a></div>)}
                      {selectedShop.contacts.vk && (<div><span className="font-medium">VK:</span> <a href={`https://${selectedShop.contacts.vk}`} target="_blank" className="text-primary underline">{selectedShop.contacts.vk}</a></div>)}
                      {selectedShop.contacts.instagram && (<div><span className="font-medium">Instagram:</span> <a href={`https://instagram.com/${selectedShop.contacts.instagram.replace('@', '')}`} target="_blank" className="text-primary underline">{selectedShop.contacts.instagram}</a></div>)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Товары магазина</h3>
                  {selectedShop.products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedShop.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-center">Товары отсутствуют</div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Universal Image Lightbox Modal */}
        <Dialog open={isImageModalOpen} onOpenChange={closeImageModal}>
          <DialogContent className="flex flex-col items-center justify-center bg-transparent shadow-none max-w-2xl aspect-auto p-0 ">
            <button
              onClick={closeImageModal}
              className="absolute top-3 right-3 z-10 bg-background/80 rounded-full p-2 hover:bg-muted transition"
              aria-label="Закрыть просмотр фото"
              tabIndex={0}
            >
              <span className="text-2xl font-bold text-foreground">×</span>
            </button>
            {modalImageSrc && (
              <img
                src={modalImageSrc}
                alt={"Просмотр фото"}
                className="max-h-[80vh] max-w-full rounded-lg shadow-xl animate-in zoom-in-75"
                draggable={false}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                onClick={() => setIsCartOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border shadow-xl z-50 flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Корзина покупок</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-auto p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Ваша корзина пуста</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 bg-background rounded-lg border border-border">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground text-sm line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-primary font-semibold">
                              {language === 'ru' ? `${item.price} ₽` : `$${(item.price / 70).toFixed(2)}`}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto h-6 w-6 p-0 text-destructive hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {cart.length > 0 && (
                  <div className="border-t border-border p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-foreground">Итого:</span>
                      <span className="font-semibold text-primary text-lg">
                        {language === 'ru' ? `${cartTotal} ₽` : `$${(cartTotal / 70).toFixed(2)}`}
                      </span>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      К оформлению
                    </Button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Product Quick View Modal */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-[98vw] max-h-[98vh] overflow-auto bg-card">
            {selectedProduct && (
              <div className="grid md:grid-cols-2 gap-10 p-2 md:p-6">
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={selectedProduct.images[selectedImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-[32rem] md:h-[40rem] object-cover rounded-lg cursor-zoom-in"
                      onClick={() => openImageModal(selectedProduct.images[selectedImageIndex])}
                      draggable={false}
                      tabIndex={0}
                      role="button"
                      aria-label={selectedProduct.name + ' — увеличить фото'}
                      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openImageModal(selectedProduct.images[selectedImageIndex])}
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {selectedProduct.isNew && (
                        <Badge className="bg-primary text-primary-foreground">Новинка</Badge>
                      )}
                      {selectedProduct.isSale && (
                        <Badge className="bg-destructive text-destructive-foreground">Скидка</Badge>
                      )}
                    </div>
                  </div>
                  {selectedProduct.images.length > 1 && (
                    <div className="flex gap-4">
                      {selectedProduct.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 border-2 rounded-md overflow-hidden ${
                            selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                          }`}
                          type="button"
                          tabIndex={0}
                          aria-label={selectedProduct.name + ` — миниатюра фото ${index + 1}`}
                          style={{ outline: 'none' }}
                        >
                          <img
                            src={image}
                            alt={`${selectedProduct.name} ${index + 1}`}
                            className="w-28 h-28 object-cover cursor-pointer"
                            draggable={false}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-foreground">
                      {selectedProduct.name}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(selectedProduct.rating) 
                                ? 'fill-primary text-primary' 
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-base text-muted-foreground">
                        {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                      </span>
                    </div>
                    <Badge variant="secondary">{selectedProduct.category}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-5">
                    <span className="text-3xl font-bold text-primary">
                      {language === 'ru' ? `${selectedProduct.price} ₽` : `$${(selectedProduct.price / 70).toFixed(2)}`}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        {language === 'ru' ? `${selectedProduct.originalPrice} ₽` : `$${(selectedProduct.originalPrice / 70).toFixed(2)}`}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-lg text-muted-foreground">
                    {selectedProduct.longDescription}
                  </p>
                  
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="details">Спецификации</TabsTrigger>
                      <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="space-y-2">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                          <span className="font-medium text-foreground">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="reviews" className="space-y-6">
                      {selectedProduct.reviews_data.map((review, index) => (
                        <div key={index} className="space-y-2 pb-4 border-b border-border last:border-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{review.name}</span>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating 
                                    ? 'fill-primary text-primary' 
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-base text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex gap-5 pt-4">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14"
                      onClick={() => {
                        addToCart(selectedProduct)
                        setSelectedProduct(null)
                      }}
                      disabled={!selectedProduct.inStock}
                    >
                      <ShoppingCart className="h-5 w-5 mr-3" />
                      {selectedProduct.inStock ? t('products.addToCart') : t('products.outOfStock')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toggleWishlist(selectedProduct)}
                      className={isInWishlist(selectedProduct.id) ? 'border-primary text-primary' : ''}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist(selectedProduct.id) ? 'fill-primary text-primary' : ''
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}