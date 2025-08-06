// API helper functions with better error handling

export const fetchWithFallback = async (url, fallbackData = null) => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    
    // Check if response is HTML (error page)
    if (text.trim().startsWith('<!')) {
      throw new Error('Received HTML instead of JSON - API might be blocked');
    }

    return JSON.parse(text);
  } catch (error) {
    console.warn(`API call failed: ${error.message}`);
    if (fallbackData) {
      console.log('Using fallback data');
      return fallbackData;
    }
    throw error;
  }
};

export const handleApiError = (error, fallbackAction = null) => {
  console.error('API Error:', error);
  
  if (error.message.includes('HTML instead of JSON')) {
    return 'API is currently unavailable. Using offline data.';
  }
  
  if (error.message.includes('Failed to fetch')) {
    return 'Network error. Please check your internet connection.';
  }
  
  if (fallbackAction) {
    fallbackAction();
  }
  
  return 'Something went wrong. Please try again later.';
};