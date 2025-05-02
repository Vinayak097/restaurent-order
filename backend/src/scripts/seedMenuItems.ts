import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from '../mongodb/model';

// Load environment variables
dotenv.config();

// Connect to MongoDB
async function seedMenuItems() {
  try {
    await mongoose.connect(process.env.MONGO_DB!);
    console.log('Connected to MongoDB');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Define menu items
    const menuItems = [
      // Appetizers
      {
        name: 'Garlic Bread',
        category: 'Appetizers',
        description: 'Freshly baked bread with garlic butter and herbs',
        price: 5.99,
        imageUrl: 'https://images.unsplash.com/photo-1619535860434-ba383d93e4d4?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Mozzarella Sticks',
        category: 'Appetizers',
        description: 'Golden fried mozzarella sticks served with marinara sauce',
        price: 7.99,
        imageUrl: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Spinach Artichoke Dip',
        category: 'Appetizers',
        description: 'Creamy spinach and artichoke dip served with tortilla chips',
        price: 8.99,
        imageUrl: 'https://images.pexels.com/photos/6419764/pexels-photo-6419764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Chicken Wings',
        category: 'Appetizers',
        description: 'Crispy chicken wings tossed in your choice of sauce: Buffalo, BBQ, or Honey Garlic',
        price: 10.99,
        imageUrl: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Loaded Potato Skins',
        category: 'Appetizers',
        description: 'Crispy potato skins loaded with cheese, bacon, and green onions',
        price: 8.49,
        imageUrl: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Calamari',
        category: 'Appetizers',
        description: 'Lightly breaded and fried calamari served with lemon aioli',
        price: 11.99,
        imageUrl: 'https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Bruschetta',
        category: 'Appetizers',
        description: 'Toasted bread topped with diced tomatoes, basil, and balsamic glaze',
        price: 6.99,
        imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Nachos Grande',
        category: 'Appetizers',
        description: 'Tortilla chips topped with melted cheese, jalapeños, guacamole, and sour cream',
        price: 12.99,
        imageUrl: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Shrimp Cocktail',
        category: 'Appetizers',
        description: 'Chilled jumbo shrimp served with cocktail sauce',
        price: 13.99,
        imageUrl: 'https://images.pexels.com/photos/8470461/pexels-photo-8470461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Stuffed Mushrooms',
        category: 'Appetizers',
        description: 'Mushroom caps stuffed with herb cream cheese and topped with breadcrumbs',
        price: 9.49,
        imageUrl: 'https://images.pexels.com/photos/6419751/pexels-photo-6419751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Spring Rolls',
        category: 'Appetizers',
        description: 'Crispy vegetable spring rolls served with sweet chili sauce',
        price: 7.49,
        imageUrl: 'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Onion Rings',
        category: 'Appetizers',
        description: 'Beer-battered onion rings served with ranch dipping sauce',
        price: 6.49,
        imageUrl: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },

      // Main Courses
      {
        name: 'Classic Cheeseburger',
        category: 'Main Courses',
        description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce on a brioche bun',
        price: 14.99,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Grilled Salmon',
        category: 'Main Courses',
        description: 'Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Chicken Alfredo',
        category: 'Main Courses',
        description: 'Fettuccine pasta tossed in creamy Alfredo sauce with grilled chicken breast',
        price: 16.99,
        imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Ribeye Steak',
        category: 'Main Courses',
        description: '12oz ribeye steak cooked to your preference, served with mashed potatoes and asparagus',
        price: 27.99,
        imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Vegetable Stir Fry',
        category: 'Main Courses',
        description: 'Fresh vegetables stir-fried in a savory sauce, served over steamed rice',
        price: 13.99,
        imageUrl: 'https://images.pexels.com/photos/6896379/pexels-photo-6896379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Fish and Chips',
        category: 'Main Courses',
        description: 'Beer-battered cod fillets served with crispy fries and tartar sauce',
        price: 15.99,
        imageUrl: 'https://images.unsplash.com/photo-1576777647209-e8733d7b851d?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'BBQ Ribs',
        category: 'Main Courses',
        description: 'Slow-cooked pork ribs glazed with BBQ sauce, served with coleslaw and cornbread',
        price: 22.99,
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Margherita Pizza',
        category: 'Main Courses',
        description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil on a thin crust',
        price: 14.49,
        imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Chicken Parmesan',
        category: 'Main Courses',
        description: 'Breaded chicken breast topped with marinara sauce and melted cheese, served with spaghetti',
        price: 17.99,
        imageUrl: 'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Beef Stroganoff',
        category: 'Main Courses',
        description: 'Tender beef strips in a creamy mushroom sauce, served over egg noodles',
        price: 18.49,
        imageUrl: 'https://images.pexels.com/photos/6419758/pexels-photo-6419758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Shrimp Scampi',
        category: 'Main Courses',
        description: 'Jumbo shrimp sautéed in garlic butter sauce, served over linguine',
        price: 20.99,
        imageUrl: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Vegetable Lasagna',
        category: 'Main Courses',
        description: 'Layers of pasta, ricotta cheese, and roasted vegetables in a tomato sauce',
        price: 15.49,
        imageUrl: 'https://images.pexels.com/photos/6046493/pexels-photo-6046493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Lamb Chops',
        category: 'Main Courses',
        description: 'Grilled lamb chops with mint jelly, served with roasted potatoes',
        price: 25.99,
        imageUrl: 'https://images.pexels.com/photos/6941001/pexels-photo-6941001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Beef Tacos',
        category: 'Main Courses',
        description: 'Three soft tacos filled with seasoned ground beef, lettuce, cheese, and pico de gallo',
        price: 13.49,
        imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Eggplant Parmesan',
        category: 'Main Courses',
        description: 'Breaded eggplant slices topped with marinara sauce and melted cheese',
        price: 14.99,
        imageUrl: 'https://images.pexels.com/photos/6419747/pexels-photo-6419747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },

      // Desserts
      {
        name: 'Chocolate Lava Cake',
        category: 'Desserts',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        price: 7.99,
        imageUrl: 'https://images.unsplash.com/photo-1617305855058-336d24456869?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'New York Cheesecake',
        category: 'Desserts',
        description: 'Creamy cheesecake with a graham cracker crust, topped with berry compote',
        price: 8.49,
        imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Apple Pie',
        category: 'Desserts',
        description: 'Classic apple pie with a flaky crust, served warm with a scoop of ice cream',
        price: 6.99,
        imageUrl: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Tiramisu',
        category: 'Desserts',
        description: 'Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream',
        price: 7.49,
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Crème Brûlée',
        category: 'Desserts',
        description: 'Rich custard topped with a layer of caramelized sugar',
        price: 8.99,
        imageUrl: 'https://images.pexels.com/photos/8472100/pexels-photo-8472100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Chocolate Brownie Sundae',
        category: 'Desserts',
        description: 'Warm chocolate brownie topped with vanilla ice cream, chocolate sauce, and whipped cream',
        price: 8.49,
        imageUrl: 'https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Key Lime Pie',
        category: 'Desserts',
        description: 'Tangy lime custard in a graham cracker crust, topped with whipped cream',
        price: 7.49,
        imageUrl: 'https://images.pexels.com/photos/6163263/pexels-photo-6163263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Bread Pudding',
        category: 'Desserts',
        description: 'Warm bread pudding with caramel sauce and vanilla ice cream',
        price: 6.99,
        imageUrl: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Fruit Tart',
        category: 'Desserts',
        description: 'Buttery tart shell filled with custard and topped with fresh seasonal fruits',
        price: 7.99,
        imageUrl: 'https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Chocolate Mousse',
        category: 'Desserts',
        description: 'Light and airy chocolate mousse topped with whipped cream',
        price: 6.49,
        imageUrl: 'https://images.pexels.com/photos/6210876/pexels-photo-6210876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Baklava',
        category: 'Desserts',
        description: 'Layers of phyllo dough filled with chopped nuts and sweetened with honey syrup',
        price: 7.99,
        imageUrl: 'https://images.pexels.com/photos/7474372/pexels-photo-7474372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      },
      {
        name: 'Ice Cream Sundae',
        category: 'Desserts',
        description: 'Three scoops of ice cream with your choice of toppings and whipped cream',
        price: 5.99,
        imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop',
        available: true
      },

      // Drinks
      {
        name: 'Iced Tea',
        category: 'Drinks',
        description: 'Refreshing iced tea, sweetened or unsweetened',
        price: 2.99,
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c1306ee31eba?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Lemonade',
        category: 'Drinks',
        description: 'Freshly squeezed lemonade with a hint of mint',
        price: 3.49,
        imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Strawberry Smoothie',
        category: 'Drinks',
        description: 'Creamy smoothie made with fresh strawberries and yogurt',
        price: 4.99,
        imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a90bb0ae?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Cappuccino',
        category: 'Drinks',
        description: 'Espresso with steamed milk and a layer of foam',
        price: 4.49,
        imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Mojito',
        category: 'Drinks',
        description: 'Classic cocktail with rum, mint, lime, and soda water',
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Margarita',
        category: 'Drinks',
        description: 'Tequila-based cocktail with lime juice and triple sec, served with salt on the rim',
        price: 9.49,
        imageUrl: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Red Wine',
        category: 'Drinks',
        description: 'Glass of house red wine',
        price: 7.99,
        imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Craft Beer',
        category: 'Drinks',
        description: 'Rotating selection of local craft beers',
        price: 6.49,
        imageUrl: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Chocolate Milkshake',
        category: 'Drinks',
        description: 'Thick and creamy chocolate milkshake topped with whipped cream',
        price: 5.99,
        imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Hot Chocolate',
        category: 'Drinks',
        description: 'Rich and creamy hot chocolate topped with marshmallows',
        price: 3.99,
        imageUrl: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Espresso',
        category: 'Drinks',
        description: 'Single shot of espresso',
        price: 2.99,
        imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Orange Juice',
        category: 'Drinks',
        description: 'Freshly squeezed orange juice',
        price: 3.99,
        imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Sparkling Water',
        category: 'Drinks',
        description: 'Bottle of sparkling water with lemon',
        price: 2.49,
        imageUrl: 'https://images.unsplash.com/photo-1603394151851-6275a026ad6e?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Green Tea',
        category: 'Drinks',
        description: 'Traditional green tea served hot',
        price: 2.99,
        imageUrl: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=1000&auto=format&fit=crop',
        available: true
      },
      {
        name: 'Mango Lassi',
        category: 'Drinks',
        description: 'Refreshing yogurt-based drink with mango and a hint of cardamom',
        price: 4.49,
        imageUrl: 'https://images.pexels.com/photos/4051737/pexels-photo-4051737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        available: true
      }
    ];

    // Insert menu items
    await MenuItem.insertMany(menuItems);
    console.log(`${menuItems.length} menu items seeded successfully`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding menu items:', error);
    process.exit(1);
  }
}

// Run the seed function
seedMenuItems();
