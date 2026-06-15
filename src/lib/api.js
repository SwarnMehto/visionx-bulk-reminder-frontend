const API =
  process.env.NEXT_PUBLIC_API_URL;

console.log("API URL:", API);

// ======================================
// TOKEN HELPER
// ======================================

const getToken = () => {
  if (typeof window === "undefined")
    return null;

  return localStorage.getItem("token");
};

// ======================================
// REGISTER
// ======================================

export const registerAPI = async (data) => {
  try {
    const res = await fetch(
      `${API}/api/auth/register`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    console.log(
      "REGISTER RESPONSE:",
      result
    );

    return result;

  } catch (error) {
    console.log(
      "REGISTER ERROR:",
      error
    );

    return {
      success: false,
      message: "Register Failed",
    };
  }
};

// ======================================
// LOGIN
// ======================================

export const loginAPI = async (data) => {
  try {
    const res = await fetch(
      `${API}/api/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    console.log(
      "LOGIN RESPONSE:",
      result
    );

    return result;

  } catch (error) {
    console.log(
      "LOGIN ERROR:",
      error
    );

    return {
      success: false,
      message: "Login Failed",
    };
  }
};

// ======================================
// CREATE CAMPAIGN
// ======================================

export const createCampaignAPI =
  async (data) => {
    try {
      const res = await fetch(
        `${API}/api/campaigns/create`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${getToken()}`,
          },

          body: JSON.stringify(data),
        }
      );

      return await res.json();

    } catch (error) {
      console.log(
        "CREATE CAMPAIGN ERROR:",
        error
      );
    }
  };

// ======================================
// GET ALL CAMPAIGNS
// ======================================

export const getCampaignsAPI =
  async () => {
    try {
      const res = await fetch(
        `${API}/api/campaigns`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

      return await res.json();

    } catch (error) {
      console.log(
        "GET CAMPAIGNS ERROR:",
        error
      );
    }
  };

// ======================================
// GET SINGLE CAMPAIGN
// ======================================

export const getSingleCampaignAPI =
  async (id) => {
    try {
      const res = await fetch(
        `${API}/api/campaigns/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

      return await res.json();

    } catch (error) {
      console.log(
        "GET SINGLE CAMPAIGN ERROR:",
        error
      );
    }
  };

// ======================================
// CSV UPLOAD
// ======================================

export const uploadCSVAPI =
  async (
    file,
    campaignId
  ) => {
    try {
      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "campaignId",
        campaignId
      );

      const res = await fetch(
        `${API}/api/contacts/upload`,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },

          body: formData,
        }
      );

      return await res.json();

    } catch (error) {
      console.log(
        "CSV UPLOAD ERROR:",
        error
      );
    }
  };

// ======================================
// GET CONTACTS
// ======================================

export const getContactsAPI =
  async (campaignId) => {
    try {
      const res = await fetch(
        `${API}/api/contacts/${campaignId}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

      return await res.json();

    } catch (error) {
      console.log(
        "GET CONTACTS ERROR:",
        error
      );
    }
  };

// ======================================
// LAUNCH CAMPAIGN
// ======================================

export const launchCampaignAPI =
  async (
    campaignId
  ) => {
    try {
      const res = await fetch(
        `${API}/api/bulk/launch`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${getToken()}`,
          },

          body: JSON.stringify({
            campaignId,
          }),
        }
      );

      return await res.json();

    } catch (error) {
      console.log(
        "LAUNCH ERROR:",
        error
      );
    }
  };