const Diabetes = require("../models/diabetes.model");
const Heart = require("../models/heart.model");
const Stroke = require("../models/stroke.model");

const patientRecords = async (req, res) => {
  try {
    const { page = 1, limit = 20, model, sort = "recent" } = req.query;

    const sortOrder =
      sort === "probHigh"
        ? { probability: -1, createdAt: -1 }
        : sort === "probLow"
        ? { probability: 1, createdAt: -1 }
        : { createdAt: -1 };

    const diabetesProject = {
      _id: 1,
      predictedLabel: "$prediction",
      probability: "$probability",
      createdAt: { $toDate: "$_id" },
      model: { $literal: "diabetes" },
    };

    const heartProject = {
      _id: 1,
      predictedLabel: "$prediction",
      probability: "$probability",
      createdAt: { $toDate: "$_id" },
      model: { $literal: "heart" },
    };

    const strokeProject = {
      _id: 1,
      predictedLabel: "$prediction",
      probability: "$probability",
      createdAt: { $toDate: "$_id" },
      model: { $literal: "stroke" },
    };

    const pipeline = [
      { $project: diabetesProject },
      {
        $unionWith: {
          coll: Heart.collection.name,
          pipeline: [{ $project: heartProject }],
        },
      },
      {
        $unionWith: {
          coll: Stroke.collection.name,
          pipeline: [{ $project: strokeProject }],
        },
      },
      ...(model ? [{ $match: { model } }] : []),
      { $sort: sortOrder },
      {
        $facet: {
          data: [
            { $skip: (Number(page) - 1) * Number(limit) },
            { $limit: Number(limit) },
            {
              $project: {
                _id: 1,
                model: 1,
                predictedLabel: 1,
                probability: 1,
                createdAt: 1,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await Diabetes.aggregate(pipeline);
    const data = result?.[0]?.data || [];
    const total = result?.[0]?.totalCount?.[0]?.count || 0;

    res
      .status(200)
      .json({
        success: true,
        page: Number(page),
        limit: Number(limit),
        total,
        data,
      });
  } catch (error) {
    console.log("Error in doctor controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { patientRecords };
