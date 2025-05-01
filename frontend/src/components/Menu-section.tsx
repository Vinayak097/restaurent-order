"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import { MenuCard } from "./MenuCard"
import { getMenuItems } from "@/lib/api";
interface MenuItem {
    id: string;
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
    
  useEffect(()=>{
    async function fetch() {
      const data=await getMenuItems(activeCategory);
      console.log(data, 'menudata')
      setMenuData(data)
      
    }
    fetch()
        
        
  },[activeCategory])
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

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuData
                  .filter((item) => category.id === "all" || item.category === category.id)
                  .map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
