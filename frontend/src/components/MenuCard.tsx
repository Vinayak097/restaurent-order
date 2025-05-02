"use client"


import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { toast } from "sonner"



import { useCart } from "@/store/cartStore"

interface MenuCardProps {
  item: any
}

export function MenuCard({ item }: MenuCardProps) {

  const { addItem, removeItem, getItemQuantity } =useCart()
  const quantity = getItemQuantity(item.id)

  const handleAddToCart = () => {
    addItem(item)
    toast(
     "Added to cart"
    )
  }

  const handleRemoveFromCart = () => {
    removeItem(item.id)
  }

  return (
    <Card className=" overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <img
          src={item.imageUrl || item.image || "/placeholder.svg?height=200&width=300"}
          alt={item.name}
          className="object-cover w-full h-full"
        />
        {item.vegetarian && (
          <Badge className="absolute top-2 right-2 bg-green-600" variant="secondary">
            Vegetarian
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {quantity > 0 ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleRemoveFromCart}>
              <Minus className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
            <span className="font-medium w-6 text-center">{quantity}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleAddToCart}>
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add</span>
            </Button>
          </div>
        ) : (
          <Button onClick={handleAddToCart} className="w-full">
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
