import { Task } from "../models/Account";
import { v4 as uuidv4 } from "uuid";

// Pre-Move Planning Tasks
export const preMovePlanningTasks: Task[] = [
  {
    uuid: uuidv4(),
    name: "Create Moving Budget",
    content: "Outline a budget for all moving expenses.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Start Planning",
    content: "Start planning your move well in advance.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Hire Moving Company",
    content: "Research and hire a reputable moving company.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Order Packing Supplies",
    content: "Order boxes, tape, bubble wrap, and other supplies.",
    deadline: "",
  },
  // ... other related tasks
];
// Packing Tasks
export const packingTasks: Task[] = [
  {
    uuid: uuidv4(),
    name: "Start Packing Non-Essentials",
    content: "Begin packing items you won't need before the move.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Label Boxes",
    content: "Label each box with its contents and designated room.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Pack Essentials Box",
    content: "Pack a box with essentials for moving day.",
    deadline: "",
  },
  // ... other related tasks
];
// Day of Move Tasks
export const dayOfMoveTasks: Task[] = [
  {
    uuid: uuidv4(),
    name: "Moving Day",
    content: "Oversee the loading of the moving truck.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Clean Old Residence",
    content: "Clean your current home or apartment.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Final Walk-Through",
    content: "Do a final inspection of your old home.",
    deadline: "",
  },
  // ... other related tasks
];
// Post-Move Tasks
export const postMoveTasks: Task[] = [
  {
    uuid: uuidv4(),
    name: "Unpacking Day",
    content: "Unpack and organize items in your new home.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Dispose of Packing Materials",
    content: "Properly dispose of or recycle packing materials.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Update Legal Documents",
    content: "Update your address on legal documents and IDs.",
    deadline: "",
  },
  // ... other related tasks
];
// Utility and Administration Tasks
export const utilityAdminTasks: Task[] = [
  {
    uuid: uuidv4(),
    name: "Transfer Utilities",
    content:
      "Arrange for utilities at your new address and disconnection at your current one.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Change Address",
    content:
      "Update your address with the postal service and relevant parties.",
    deadline: "",
  },
  {
    uuid: uuidv4(),
    name: "Update Subscriptions",
    content: "Update your address for subscriptions and online accounts.",
    deadline: "",
  },
  // ... other related tasks
];
