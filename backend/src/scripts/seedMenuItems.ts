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
        imageUrl: 'https://example.com/garlic-bread.jpg',
        available: true
      },
      {
        name: 'Mozzarella Sticks',
        category: 'Appetizers',
        description: 'Golden fried mozzarella sticks served with marinara sauce',
        price: 7.99,
        imageUrl: 'https://example.com/mozzarella-sticks.jpg',
        available: true
      },
      {
        name: 'Spinach Artichoke Dip',
        category: 'Appetizers',
        description: 'Creamy spinach and artichoke dip served with tortilla chips',
        price: 8.99,
        imageUrl: 'https://example.com/spinach-dip.jpg',
        available: true
      },
      {
        name: 'Chicken Wings',
        category: 'Appetizers',
        description: 'Crispy chicken wings tossed in your choice of sauce: Buffalo, BBQ, or Honey Garlic',
        price: 10.99,
        imageUrl: 'https://example.com/chicken-wings.jpg',
        available: true
      },
      {
        name: 'Loaded Potato Skins',
        category: 'Appetizers',
        description: 'Crispy potato skins loaded with cheese, bacon, and green onions',
        price: 8.49,
        imageUrl: 'https://example.com/potato-skins.jpg',
        available: true
      },
      {
        name: 'Calamari',
        category: 'Appetizers',
        description: 'Lightly breaded and fried calamari served with lemon aioli',
        price: 11.99,
        imageUrl: 'https://example.com/calamari.jpg',
        available: true
      },
      {
        name: 'Bruschetta',
        category: 'Appetizers',
        description: 'Toasted bread topped with diced tomatoes, basil, and balsamic glaze',
        price: 6.99,
        imageUrl: 'https://example.com/bruschetta.jpg',
        available: true
      },
      {
        name: 'Nachos Grande',
        category: 'Appetizers',
        description: 'Tortilla chips topped with melted cheese, jalapeños, guacamole, and sour cream',
        price: 12.99,
        imageUrl: 'https://example.com/nachos.jpg',
        available: true
      },
      {
        name: 'Shrimp Cocktail',
        category: 'Appetizers',
        description: 'Chilled jumbo shrimp served with cocktail sauce',
        price: 13.99,
        imageUrl: 'https://example.com/shrimp-cocktail.jpg',
        available: true
      },
      {
        name: 'Stuffed Mushrooms',
        category: 'Appetizers',
        description: 'Mushroom caps stuffed with herb cream cheese and topped with breadcrumbs',
        price: 9.49,
        imageUrl: 'https://example.com/stuffed-mushrooms.jpg',
        available: true
      },
      {
        name: 'Spring Rolls',
        category: 'Appetizers',
        description: 'Crispy vegetable spring rolls served with sweet chili sauce',
        price: 7.49,
        imageUrl: 'https://example.com/spring-rolls.jpg',
        available: true
      },
      {
        name: 'Onion Rings',
        category: 'Appetizers',
        description: 'Beer-battered onion rings served with ranch dipping sauce',
        price: 6.49,
        imageUrl: 'https://example.com/onion-rings.jpg',
        available: true
      },

      // Main Courses
      {
        name: 'Classic Cheeseburger',
        category: 'Main Courses',
        description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce on a brioche bun',
        price: 14.99,
        imageUrl: 'https://example.com/cheeseburger.jpg',
        available: true
      },
      {
        name: 'Grilled Salmon',
        category: 'Main Courses',
        description: 'Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables',
        price: 19.99,
        imageUrl: 'https://example.com/grilled-salmon.jpg',
        available: true
      },
      {
        name: 'Chicken Alfredo',
        category: 'Main Courses',
        description: 'Fettuccine pasta tossed in creamy Alfredo sauce with grilled chicken breast',
        price: 16.99,
        imageUrl: 'https://example.com/chicken-alfredo.jpg',
        available: true
      },
      {
        name: 'Ribeye Steak',
        category: 'Main Courses',
        description: '12oz ribeye steak cooked to your preference, served with mashed potatoes and asparagus',
        price: 27.99,
        imageUrl: 'https://example.com/ribeye-steak.jpg',
        available: true
      },
      {
        name: 'Vegetable Stir Fry',
        category: 'Main Courses',
        description: 'Fresh vegetables stir-fried in a savory sauce, served over steamed rice',
        price: 13.99,
        imageUrl: 'https://example.com/vegetable-stir-fry.jpg',
        available: true
      },
      {
        name: 'Fish and Chips',
        category: 'Main Courses',
        description: 'Beer-battered cod fillets served with crispy fries and tartar sauce',
        price: 15.99,
        imageUrl: 'https://example.com/fish-and-chips.jpg',
        available: true
      },
      {
        name: 'BBQ Ribs',
        category: 'Main Courses',
        description: 'Slow-cooked pork ribs glazed with BBQ sauce, served with coleslaw and cornbread',
        price: 22.99,
        imageUrl: 'https://example.com/bbq-ribs.jpg',
        available: true
      },
      {
        name: 'Margherita Pizza',
        category: 'Main Courses',
        description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil on a thin crust',
        price: 14.49,
        imageUrl: 'https://example.com/margherita-pizza.jpg',
        available: true
      },
      {
        name: 'Chicken Parmesan',
        category: 'Main Courses',
        description: 'Breaded chicken breast topped with marinara sauce and melted cheese, served with spaghetti',
        price: 17.99,
        imageUrl: 'https://example.com/chicken-parmesan.jpg',
        available: true
      },
      {
        name: 'Beef Stroganoff',
        category: 'Main Courses',
        description: 'Tender beef strips in a creamy mushroom sauce, served over egg noodles',
        price: 18.49,
        imageUrl: 'https://example.com/beef-stroganoff.jpg',
        available: true
      },
      {
        name: 'Shrimp Scampi',
        category: 'Main Courses',
        description: 'Jumbo shrimp sautéed in garlic butter sauce, served over linguine',
        price: 20.99,
        imageUrl: 'https://example.com/shrimp-scampi.jpg',
        available: true
      },
      {
        name: 'Vegetable Lasagna',
        category: 'Main Courses',
        description: 'Layers of pasta, ricotta cheese, and roasted vegetables in a tomato sauce',
        price: 15.49,
        imageUrl: 'https://example.com/vegetable-lasagna.jpg',
        available: true
      },
      {
        name: 'Lamb Chops',
        category: 'Main Courses',
        description: 'Grilled lamb chops with mint jelly, served with roasted potatoes',
        price: 25.99,
        imageUrl: 'https://example.com/lamb-chops.jpg',
        available: true
      },
      {
        name: 'Beef Tacos',
        category: 'Main Courses',
        description: 'Three soft tacos filled with seasoned ground beef, lettuce, cheese, and pico de gallo',
        price: 13.49,
        imageUrl: 'https://example.com/beef-tacos.jpg',
        available: true
      },
      {
        name: 'Eggplant Parmesan',
        category: 'Main Courses',
        description: 'Breaded eggplant slices topped with marinara sauce and melted cheese',
        price: 14.99,
        imageUrl: 'https://example.com/eggplant-parmesan.jpg',
        available: true
      },

      // Desserts
      {
        name: 'Chocolate Lava Cake',
        category: 'Desserts',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        price: 7.99,
        imageUrl: 'https://example.com/chocolate-lava-cake.jpg',
        available: true
      },
      {
        name: 'New York Cheesecake',
        category: 'Desserts',
        description: 'Creamy cheesecake with a graham cracker crust, topped with berry compote',
        price: 8.49,
        imageUrl: 'https://example.com/cheesecake.jpg',
        available: true
      },
      {
        name: 'Apple Pie',
        category: 'Desserts',
        description: 'Classic apple pie with a flaky crust, served warm with a scoop of ice cream',
        price: 6.99,
        imageUrl: 'https://example.com/apple-pie.jpg',
        available: true
      },
      {
        name: 'Tiramisu',
        category: 'Desserts',
        description: 'Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream',
        price: 7.49,
        imageUrl: 'https://example.com/tiramisu.jpg',
        available: true
      },
      {
        name: 'Crème Brûlée',
        category: 'Desserts',
        description: 'Rich custard topped with a layer of caramelized sugar',
        price: 8.99,
        imageUrl: 'https://example.com/creme-brulee.jpg',
        available: true
      },
      {
        name: 'Chocolate Brownie Sundae',
        category: 'Desserts',
        description: 'Warm chocolate brownie topped with vanilla ice cream, chocolate sauce, and whipped cream',
        price: 8.49,
        imageUrl: 'https://example.com/brownie-sundae.jpg',
        available: true
      },
      {
        name: 'Key Lime Pie',
        category: 'Desserts',
        description: 'Tangy lime custard in a graham cracker crust, topped with whipped cream',
        price: 7.49,
        imageUrl: 'https://example.com/key-lime-pie.jpg',
        available: true
      },
      {
        name: 'Bread Pudding',
        category: 'Desserts',
        description: 'Warm bread pudding with caramel sauce and vanilla ice cream',
        price: 6.99,
        imageUrl: 'https://example.com/bread-pudding.jpg',
        available: true
      },
      {
        name: 'Fruit Tart',
        category: 'Desserts',
        description: 'Buttery tart shell filled with custard and topped with fresh seasonal fruits',
        price: 7.99,
        imageUrl: 'https://example.com/fruit-tart.jpg',
        available: true
      },
      {
        name: 'Chocolate Mousse',
        category: 'Desserts',
        description: 'Light and airy chocolate mousse topped with whipped cream',
        price: 6.49,
        imageUrl: 'https://example.com/chocolate-mousse.jpg',
        available: true
      },
      {
        name: 'Baklava',
        category: 'Desserts',
        description: 'Layers of phyllo dough filled with chopped nuts and sweetened with honey syrup',
        price: 7.99,
        imageUrl: 'https://example.com/baklava.jpg',
        available: true
      },
      {
        name: 'Ice Cream Sundae',
        category: 'Desserts',
        description: 'Three scoops of ice cream with your choice of toppings and whipped cream',
        price: 5.99,
        imageUrl: 'https://example.com/ice-cream-sundae.jpg',
        available: true
      },

      // Drinks
      {
        name: 'Iced Tea',
        category: 'Drinks',
        description: 'Refreshing iced tea, sweetened or unsweetened',
        price: 2.99,
        imageUrl: 'https://example.com/iced-tea.jpg',
        available: true
      },
      {
        name: 'Lemonade',
        category: 'Drinks',
        description: 'Freshly squeezed lemonade with a hint of mint',
        price: 3.49,
        imageUrl: 'https://example.com/lemonade.jpg',
        available: true
      },
      {
        name: 'Strawberry Smoothie',
        category: 'Drinks',
        description: 'Creamy smoothie made with fresh strawberries and yogurt',
        price: 4.99,
        imageUrl: 'https://example.com/strawberry-smoothie.jpg',
        available: true
      },
      {
        name: 'Cappuccino',
        category: 'Drinks',
        description: 'Espresso with steamed milk and a layer of foam',
        price: 4.49,
        imageUrl: 'https://example.com/cappuccino.jpg',
        available: true
      },
      {
        name: 'Mojito',
        category: 'Drinks',
        description: 'Classic cocktail with rum, mint, lime, and soda water',
        price: 8.99,
        imageUrl: 'https://example.com/mojito.jpg',
        available: true
      },
      {
        name: 'Margarita',
        category: 'Drinks',
        description: 'Tequila-based cocktail with lime juice and triple sec, served with salt on the rim',
        price: 9.49,
        imageUrl: 'https://example.com/margarita.jpg',
        available: true
      },
      {
        name: 'Red Wine',
        category: 'Drinks',
        description: 'Glass of house red wine',
        price: 7.99,
        imageUrl: 'https://example.com/red-wine.jpg',
        available: true
      },
      {
        name: 'Craft Beer',
        category: 'Drinks',
        description: 'Rotating selection of local craft beers',
        price: 6.49,
        imageUrl: 'https://example.com/craft-beer.jpg',
        available: true
      },
      {
        name: 'Chocolate Milkshake',
        category: 'Drinks',
        description: 'Thick and creamy chocolate milkshake topped with whipped cream',
        price: 5.99,
        imageUrl: 'https://example.com/chocolate-milkshake.jpg',
        available: true
      },
      {
        name: 'Hot Chocolate',
        category: 'Drinks',
        description: 'Rich and creamy hot chocolate topped with marshmallows',
        price: 3.99,
        imageUrl: 'https://example.com/hot-chocolate.jpg',
        available: true
      },
      {
        name: 'Espresso',
        category: 'Drinks',
        description: 'Single shot of espresso',
        price: 2.99,
        imageUrl: 'https://example.com/espresso.jpg',
        available: true
      },
      {
        name: 'Orange Juice',
        category: 'Drinks',
        description: 'Freshly squeezed orange juice',
        price: 3.99,
        imageUrl: 'https://example.com/orange-juice.jpg',
        available: true
      },
      {
        name: 'Sparkling Water',
        category: 'Drinks',
        description: 'Bottle of sparkling water with lemon',
        price: 2.49,
        imageUrl: 'https://example.com/sparkling-water.jpg',
        available: true
      },
      {
        name: 'Green Tea',
        category: 'Drinks',
        description: 'Traditional green tea served hot',
        price: 2.99,
        imageUrl: 'https://example.com/green-tea.jpg',
        available: true
      },
      {
        name: 'Mango Lassi',
        category: 'Drinks',
        description: 'Refreshing yogurt-based drink with mango and a hint of cardamom',
        price: 4.49,
        imageUrl: 'https://example.com/mango-lassi.jpg',
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
