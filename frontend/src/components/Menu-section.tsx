"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuCard } from "./MenuCard"
import { getMenuItems } from "@/lib/api";
import { useCart } from "@/store/cartStore";

interface MenuItem {
    _id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    imageUrl: string;
    available: boolean;
  }

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [menuData, setMenuData] = useState<MenuItem[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const { clearCart } = useCart()

  // Function to fetch menu items
  const fetchMenuItems = async (category: string, pageNum: number, isNewCategory: boolean = false) => {
    setLoading(true)
    try {
      const data = await getMenuItems(category, 9, pageNum);

      if (data.length === 0) {
        setHasMore(false)
      } else {
        if (isNewCategory) {
          setMenuData(data)
        } else {
          setMenuData(prevData => [...prevData, ...data])
        }
      }
    } catch (error) {
      console.error('Error fetching menu items:', error)
    } finally {
      setLoading(false)
    }
  }

  // Clear cart on initial load
  useEffect(() => {
    clearCart();
    console.log("Cart cleared on menu page load");
  }, []);

  // Initial load and category change
  useEffect(() => {
    setMenuData([])
    setPage(1)
    setHasMore(true)
    fetchMenuItems(activeCategory, 1, true)
  }, [activeCategory])

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchMenuItems(activeCategory, page)
    }
  }, [page])



  const categories = [
    { id: "all", name: "All" },
    { id: "appetizers", name: "Appetizers" },
    { id: "main-courses", name: "Main Courses" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Drinks" },
  ]

  return (
    <section id="menu" className="m-4 py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Menu</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our delicious offerings and add your favorites to your cart. All orders are prepared fresh for
            pickup.
          </p>
        </div>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-overflow">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-flow-col auto-cols-max gap-0">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuData.map((item, index) => {
                if (menuData.length === index + 1) {
                  return (
                    <div ref={node => {
                      if (node) {
                        // Use the callback ref to observe the last item
                        const observer = new IntersectionObserver(entries => {
                          if (entries[0].isIntersecting && hasMore && !loading) {
                            setPage(prevPage => prevPage + 1)
                          }
                        }, { threshold: 1.0 })

                        observer.observe(node)
                        return () => observer.disconnect()
                      }
                    }} key={item._id}>
                      <MenuCard key={item._id} item={{...item, id: item._id}} />
                    </div>
                  )
                } else {
                  return <MenuCard key={item._id} item={{...item, id: item._id}} />
                }
              })}
            </div>

            {loading && (
              <div className="flex justify-center mt-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}

            {!hasMore && menuData.length > 0 && (
              <div className="text-center mt-8 text-muted-foreground">
                No more items to load
              </div>
            )}

            {menuData.length === 0 && !loading && (
              <div className="text-center mt-8 text-muted-foreground">
                No items found in this category
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
