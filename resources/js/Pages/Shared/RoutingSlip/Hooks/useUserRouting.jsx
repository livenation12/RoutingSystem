import { useContext } from "react";
import { UserRoutingContext } from "../Contexts/UserRoutingContext";
export default function useUserRouting() {
          const context = useContext(UserRoutingContext)
          if (!context) {
                    throw new Error('useUserRouting must be encased within a UserRoutingProvider');
          }
          return context
}