

export function Footer() {
  return (
    <footer className="m-4  border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">The Digital Diner</h3>
            <p className="text-muted-foreground">
              Serving delicious food with a modern twist. Order online for pickup.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <p className="text-muted-foreground">Monday - Friday: 11am - 10pm</p>
            <p className="text-muted-foreground">Saturday - Sunday: 10am - 11pm</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-muted-foreground">123 Main Street</p>
            <p className="text-muted-foreground">Anytown, USA 12345</p>
            <p className="text-muted-foreground">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Digital Diner. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
