
import e from "express";
import MenuItem from "../mongodb/model";


const router=e.Router();

router.get("/", async(req,res)=>{
  const {category, limit = 5, page = 1} = req.query;
  let query = {};
  
  if (category && category !== 'all') {
    query = { category };
  }
  
  try {
   
    const limitNum = parseInt(limit as string) || 20;
    const pageNum = parseInt(page as string) || 1;
    const skip = (pageNum - 1) * limitNum;
    
 
    const total = await MenuItem.countDocuments(query);
    
 
    const menuItems = await MenuItem.find(query)
      .sort({ category: 1 })
      .skip(skip)
      .limit(limitNum);
    
    res.status(200).json({
      message: "success", 
      menu: menuItems,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch(e) {
    console.log(e, 'menu items');
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});
//Fetching a single menu item's details (if needed).
router.get("/:id", async(req,res)=>{
    try{
        const { id } = req.params;

        const menuItem = await MenuItem.findById(id);
    
        if (!menuItem) {
           res.status(404).json({ message: 'Menu item not found' });
           return;
        }
    
        res.status(200).json(menuItem);
        return;
    }catch(e){
        console.log(e , 'menu items');
        res.status(500).json("Internal Server Error");
        return;
    }
});
export default router;