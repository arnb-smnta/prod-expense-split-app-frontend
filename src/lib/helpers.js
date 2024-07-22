import { FaDashcube } from "react-icons/fa6";
import { MdGroupAdd, MdGroups2 } from "react-icons/md";
import { TiInfoLarge } from "react-icons/ti";
// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";
export class LocalStorage {
  // Get a value from local storage by key
  static get(key) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  // Set a value in local storage by key
  static set(key, value) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}

//A utilty function for handling API requests with loading,success and error handling
export const requestHandler = async (api, setLoading, onSuccess, onError) => {
  if (setLoading) setLoading(true);

  try {
    //Making the api request

    const response = await api();
    const { data } = response;
    if (data && data.success) {
      onSuccess(data);
    }
  } catch (error) {
    console.log(error.response);
    if (error && error.response && [401, 403].includes(error.response.status)) {
      localStorage.clear();
      if (isBrowser) {
        window.location.href = "/login"; //redirects to login page
      }
    }

    onError({
      variant: "destructive",
      description: error?.response?.data?.message || "Something went wrong",
    });
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const menuItems = [
  {
    key: "dashboard",
    icon: FaDashcube,
    label: "Dashboard",
    link: "dashboard/app",
  },
  {
    key: "group",
    icon: MdGroups2,
    label: "Groups",
    link: "dashboard/groups",
  },
  {
    key: "CreateGroup",
    icon: MdGroupAdd,
    label: "CreateGroup",
    link: "dashboard/createGroup",
  },
  {
    key: "about",
    icon: TiInfoLarge,
    label: "About",
    link: "about",
  },
];
export const ExpenseGroupTypes = {
  HOME: "Home",
  TRIP: "Trip",
  OFFICE: "Office",
  SPORTS: "Sports",
  OTHERS: "Others",
};
export const AvailableExpenseGroupTypes = Object.values(ExpenseGroupTypes);
export const PaymentMethods = {
  CASH: "Cash",
  UPI: "Upi",
  CARD: "Card",
};

export const AvailablePaymentMethods = Object.values(PaymentMethods);

export const ExpenseTypes = {
  FOOD_AND_DRINK: "Food & drink",
  SHOPPING: "shopping",
  ENTERTAINMENT: "entertainment",
  HOME: "Home",
  TRANSPORTATION: "Transportation",
  OTHERS: "Others",
};

export const AvailableExpenseTypes = Object.values(ExpenseTypes);

export function updateGroupSplit(group) {
  let updateGroupSplit = {};

  Object.keys(group.split).forEach((key) => {
    const value = group.split[key];

    for (let i = 0; i < group.participants.length; i++) {
      console.log(group.participants[i]);
      if (group.participants[i]._id === key) {
        updateGroupSplit.group.participants[i] = value;
      }
    }
  });
  return updateGroupSplit;
}

export const aboutList = [
  { name: "introduction", link: "#" },
  { name: "Key Features", link: "#" },
  { name: "Configuration and Setup", link: "#" },
  { name: "License", link: "#" },
];

export const TechnologiesUsed = {
  name: "Technologies Used",
  subLinks: [
    { name: "Frontend", link: "#" },
    { name: "Backend", link: "#" },
    { name: "Database", link: "#" },
  ],
};
