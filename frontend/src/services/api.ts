const BASE_URL = "http://127.0.0.1:8000";

export const predictAPI = async (data: any) => {
  try {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("API Error");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getDashboardData = async () => {
  const res = await fetch("http://127.0.0.1:8000/dashboard");
  return res.json();
};