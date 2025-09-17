import Home from "@assets/tabBar/home.png"
import Chat from "@assets/tabBar/chat.png"
import Category from "@assets/tabBar/category.png"
import Tube from "@assets/tabBar/tube.png"
import Med from "@assets/tabBar/med.png"

  export const tabIcons = [
  {id: 1, icon: Home, type: "home", stack: "HOMEPAGE"  as const  },
  {id: 2, icon: Chat, type: "chat", stack: "CHAT" },
  {id: 3, icon: Category, type: "category", stack: "CATALOG"  as const  }, 
  {id: 4, icon: Tube, type: "tube" , stack: "MED"  as const },
  {id: 5, icon: Med, type: "med" , stack: "TUBE"  as const }
]
  