import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Markdown from "react-markdown";
import useRequest from "../hooks/useRequest";
import { apiService } from "../services/api";

const countries = [
  "HongKong",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Taiwan",
  "Philippines",
  "Vietnam",
  "India",
  "Africa",
];

const ageGroups = [
  "18-29 years old",
  "30-39 years old",
  "40-49 years old",
  "50 onwards",
];

const CampaignGenerator = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    gender: "",
    ageGroup: "",
    country: "",
    prompt: "",
  });
  const [campaign, setCampaign] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent | SelectChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const { runRequest: runRequestSubmit, isLoading: isLoadingSubmit } =
    useRequest();
  const handleSubmit = async () => {
    const response = await runRequestSubmit(() =>
      apiService.v1CreateCampaign({
        campaign_name: formData.campaignName,
        country: formData.country,
        gender: formData.gender,
        custom_prompt: formData.prompt,
        age_group: formData.ageGroup,
      })
    );
    setCampaign(response.campaign);
  };

  const { runRequest: runRequestSave, isLoading: isLoadingSave } = useRequest();
  const handleSave = async () => {
    await runRequestSave(() =>
      apiService.v1SaveCampaign({
        campaign_name: formData.campaignName,
        country: formData.country,
        gender: formData.gender,
        custom_prompt: formData.prompt,
        age_group: formData.ageGroup,
        campaign: campaign ?? "",
      })
    );
    alert("Campaign saved!");
  };

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <p className="text-4xl font-bold">Campaign Generator</p>
      <div className="flex flex-row gap-16 w-full h-full">
        <div className="flex flex-col gap-4 w-3/6">
          <div className="w-full flex flex-col gap-2">
            <p>Campaign Name</p>
            <TextField
              placeholder="Campaign Name"
              variant="outlined"
              onChange={handleChange}
              name="campaignName"
              value={formData.campaignName}
            ></TextField>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>Country</p>
            <Select
              name="country"
              onChange={handleChange}
              value={formData.country}
            >
              {countries.map((country, i) => (
                <MenuItem value={country} key={i}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-full flex flex-col gap-2">
              <p>Gender</p>
              <Select
                name="gender"
                onChange={handleChange}
                value={formData.gender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </div>
            <div className="w-full flex flex-col gap-2">
              <p>Age Group</p>
              <Select
                name="ageGroup"
                onChange={handleChange}
                value={formData.ageGroup}
              >
                {ageGroups.map((group, i) => (
                  <MenuItem value={group} key={i}>
                    {group}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>Campaign Description</p>
            <TextField
              onChange={handleChange}
              multiline
              placeholder="Provide more information about this campaign"
              minRows={4}
              name="prompt"
              value={formData.prompt}
            ></TextField>
          </div>
          <button
            className="rounded-md w-full py-2 text-white bg-prudential-red"
            onClick={handleSubmit}
            disabled={isLoadingSubmit}
          >
            {isLoadingSubmit ? "Generating..." : "Generate Campaign"}
          </button>
        </div>
        <div
          className={`flex flex-col gap-4 w-3/6 h-full transition duration-500 ${
            campaign == null
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          }`}
        >
          <div className="bg-rose-200 rounded-lg generated-content-container relative">
            <div className="flex flex-row gap-4">
              <AutoAwesomeIcon
                className="text-xs"
                fontSize="small"
              ></AutoAwesomeIcon>
              <div className="h-[640px] overflow-y-auto">
                <div className="flex flex-col gap-2 h-fit">
                  <Markdown>{campaign}</Markdown>
                </div>
              </div>
            </div>
          </div>
          <button
            className="rounded-md px-4 py-2 text-white bg-prudential-red"
            type="submit"
            onClick={handleSave}
            disabled={isLoadingSave}
          >
            Save Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignGenerator;
