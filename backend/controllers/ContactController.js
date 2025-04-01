import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Message from "../models/MessagesModel.js";

export const searchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm) {
      return res.status(400).send("Search Term is required.");
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } }, // ✅ Fixed `req.userId`
        { $or: [{ firstName: regex }, { lastName: regex }, { email: regex }] }, // ✅ Fixed `lastName`
      ],
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getContactsForDMList = async (req, res) => {
  try {
    let { userId } = req; // Change const to let
    const userObjectId = new mongoose.Types.ObjectId(userId); // Use a new variable

    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userObjectId }, { recipient: userObjectId }],
        },
      },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userObjectId] }, // Fix: Use "$sender" (field reference)
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      { $unwind: "$contactInfo" },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          image: "$contactInfo.image",
          color: "$contactInfo.color",
        },
      },
      { $sort: { lastMessageTime: -1 } },
    ]);

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error fetching DM contacts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};