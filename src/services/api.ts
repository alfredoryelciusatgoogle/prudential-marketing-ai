import axios from "axios";

namespace ApiPayload {
  export type V1CreateCampaign = {
    campaign_name: string;
    custom_prompt: string;
    gender: string;
    age_group: string;
    country: string;
  };
  export type V1SaveCampaign = V1CreateCampaign & {
    campaign: string;
  };
}

class ApiService {
  private baseUrl: string;

  constructor() {
    if (process.env.NODE_ENV === "development") {
      this.baseUrl = "http://localhost:3001";
    } else {
      this.baseUrl = "https://backend-em677icz4q-uc.a.run.app";
    }
  }

  async v1CreateCampaign(payload: ApiPayload.V1CreateCampaign) {
    const url = `${this.baseUrl}/v1/campaign`;
    const response = await axios.post(url, payload);
    return response.data;
  }

  async v1SaveCampaign(payload: ApiPayload.V1SaveCampaign) {
    const url = `${this.baseUrl}/v1/saved-campaign`;
    const response = await axios.post(url, payload);
    return response.data;
  }
}

export const apiService = new ApiService();
