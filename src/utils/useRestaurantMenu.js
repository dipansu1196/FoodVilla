import { useEffect } from "react";
import { useState } from "react";
import { MENU_API } from "./constants";
const useRestaurantMenu=(resId)=>{
     const [resInfo,setResInfo]=useState(null);
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData=async()=>{
        try {
            const response = await fetch(MENU_API + resId, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const text = await response.text();
            
            // Check if response is HTML (error page)
            if (text.trim().startsWith('<!')) {
                throw new Error('Received HTML instead of JSON');
            }
            
            const json = JSON.parse(text);
            console.log(json);
            setResInfo(json.data);
        } catch (error) {
            console.error('Error fetching menu:', error);
            // Set a fallback or empty state
            setResInfo(null);
        }
    }
   

    return resInfo;
}
export default useRestaurantMenu;