export const getCampaigns = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("campaigns") || "[]");
};

export const addCampaign = (campaign) => {
  const existing = getCampaigns();

  const newCampaign = {
    id: Date.now(),
    name: campaign.name,
    type: campaign.type, // whatsapp | email | sms
    status: "Draft",
    contacts: [],
    message: "",
    poster: null,
  };

  localStorage.setItem(
    "campaigns",
    JSON.stringify([...existing, newCampaign])
  );

  return newCampaign;
};

export const getCampaignById = (id) => {
  return getCampaigns().find((c) => c.id === Number(id));
};

export const updateCampaign = (id, data) => {
  const updated = getCampaigns().map((c) =>
    c.id === Number(id) ? { ...c, ...data } : c
  );

  localStorage.setItem("campaigns", JSON.stringify(updated));
};