"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

interface OrderItem {
  _id?: string
  menuItemId: string
  quantity: number
  unitPrice: number
  subtotal: number
}

interface Order {
  _id: string
  userName: string
  phoneNumber: string
  status: string
  createdAt: string
  totalAmount: number
  orderItems: OrderItem[]
}

export function OrderHistoryPage() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 5

  useEffect(() => {
    fetchOrders()
  }, [page])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'https://restaurent-order-kfo1.vercel.app';
      console.log("Using backend URL for order history:", backendUrl);
      const response = await fetch(`${backendUrl}/order/getallorders?limit=${limit}&page=${page}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.orders)
      setOrders(data.orders || [])
      setTotalPages(Math.ceil(data.total / limit) || 1)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast({
        title: "Failed to load orders",
        description: "There was an error loading your order history.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-4">No Orders Yet</h1>
        <p className="text-muted-foreground mb-8">You haven't placed any orders yet.</p>
        <Button asChild>
          <Link to="/menu">Browse Menu</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order._id} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Order #{order._id.substring(0, 8)}</CardTitle>
                  <CardDescription>
                    {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {order.status || "Processing"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={`${order._id}-item-${index}`} className="flex justify-between">
                    <span>
                      {item.quantity} x Item #{item.menuItemId.substring(0 , 8)}...
                    </span>
                    <span className="font-medium">${(item.subtotal).toFixed(2)}</span>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground mx-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  )
}
