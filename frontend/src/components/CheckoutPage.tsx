"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

import { useCart } from "@/store/cartStore"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone_number: z.string().min(10, { message: "Please enter a valid phone number." }),
})

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getSubtotal, clearCart } = useCart()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtotal = getSubtotal()
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
    },
  })

  async function onSubmit(_values: z.infer<typeof formSchema>) {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare order items and filter out any with invalid IDs
      const orderItems = items
        .filter(item => {
          // Check if the ID is a valid MongoDB ID (24 character hex string)
          const isValidMongoId = item.id && /^[0-9a-fA-F]{24}$/.test(item.id);
          if (!isValidMongoId) {
            console.warn("Skipping item with invalid MongoDB ID:", item);
          }
          return isValidMongoId;
        })
        .map(item => {
          console.log("Processing cart item:", item);
          return {
            menuItemId: item.id,
            quantity: item.quantity
          };
        });

      if (orderItems.length === 0) {
        toast({
          title: "No valid items in cart",
          description: "Please add valid menu items before checking out.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      console.log('Order items to be sent:', orderItems);
      const payload = { orderItems };
      console.log("Sending order payload:", JSON.stringify(payload));

      // Create order with exact payload format
      const response = await fetch(`${'http://localhost:3000'}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        throw new Error(`Order creation failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Order created:", data);

      // Clear cart and redirect to order history
      clearCart()

      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and is being processed.",
      })

      // Wait a moment before redirecting to ensure toast is visible
      setTimeout(() => {
        navigate("/history");
      }, 1000);
    } catch (error) {
      console.error("Error during checkout:", error);

      let errorMessage = "There was an error processing your order. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Checkout failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Add some delicious items from our menu to get started.</p>
        <Button asChild>
          <Link to="/">Browse Menu</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="m-4 grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Please provide your contact information to complete your order.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="flex-1">
                    {item.quantity} x {item.name}
                  </span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
