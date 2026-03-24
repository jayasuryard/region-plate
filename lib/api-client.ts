// API client for the Region Plate backend
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Regions
  async getRegions() {
    return this.request('/regions');
  }

  async getRegionById(id: string) {
    return this.request(`/regions/${id}`);
  }

  // Foods
  async getFoods() {
    return this.request('/foods');
  }

  async getFoodById(id: string) {
    return this.request(`/foods/${id}`);
  }

  async getRegionalFood(foodId: string, regionId: string) {
    return this.request(`/foods/regional/${foodId}/${regionId}`);
  }

  async searchFoods(query: string) {
    return this.request(`/foods/search/${encodeURIComponent(query)}`);
  }

  // Meals
  async getUserMeals(userId: string) {
    return this.request(`/meals/user/${userId}`);
  }

  async getTodayMeals(userId: string) {
    return this.request(`/meals/user/${userId}/today`);
  }

  async logMeal(mealData: {
    userId: string;
    foodId: string;
    regionalFoodId?: string;
    portionSize: string;
    quantityGrams: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    mealType?: string;
    notes?: string;
    photoUrl?: string;
  }) {
    return this.request('/meals', {
      method: 'POST',
      body: JSON.stringify(mealData),
    });
  }

  async deleteMeal(mealId: string) {
    return this.request(`/meals/${mealId}`, {
      method: 'DELETE',
    });
  }

  async getNutritionSummary(userId: string, startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const queryString = params.toString();
    return this.request(`/meals/user/${userId}/summary${queryString ? `?${queryString}` : ''}`);
  }

  // Profile
  async getUserProfile(userId: string) {
    return this.request(`/profile/${userId}`);
  }

  async updateUserProfile(userData: {
    id?: string;
    name?: string;
    primaryRegion?: string;
    secondaryRegions?: string[];
    dietPreferences?: string[];
    dailyCalorieGoal?: number;
    dailyProteinGoal?: number;
  }) {
    return this.request('/profile', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUserGoals(userId: string, goals: {
    dailyCalorieGoal?: number;
    dailyProteinGoal?: number;
  }) {
    return this.request(`/profile/${userId}/goals`, {
      method: 'PATCH',
      body: JSON.stringify(goals),
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
