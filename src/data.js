"use strict";

const DataModel = require("./item-model.js");

const Data = {};

Data.addAnItem = async (req, res, next) => {
  try {
    const data = req.body;
    const item = new DataModel(data);
    await item.save()
    res.status(200).json(item);
  } catch (e) {
    next(e.message);
  }
};

Data.getAllItems = async (req, res) => {
  try {
    const items = await DataModel.find().lean().exec();
    console.log("getAll", items);
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
  }
};

Data.getOneItem = async (req, res) => {
  try {
    const id = req.params.id;

    // const items = await DataModel.find({_id:id});
    const items = await DataModel.findOne({ _id: id });

    // console.log("from getOneItem",items[0])
    console.log("from getOneItem", id, items);

    // res.status(200).json(items[0]);
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
  }
};

Data.deleteOneItem = async (req, res) => {
  try {
    const id = req.params.id;
    await DataModel.deleteOne({ _id: id });
    res.status(200).json("successfully deleted");
  } catch (err) {
    console.error(err);
  }
};

Data.updateOneItem = async (req, res) => {
  try {
    // const id = req.param.id;
    const id = req.params.id;
    const data = req.body;
    const item = await DataModel.findByIdAndUpdate(id, data, {
      new: true,
      useFindAndModify: false,
    });
    console.log("from updateOneItem", id, data);
    res.status(200).json(item);
  } catch (err) {
    console.error(err);
  }
};

module.exports = Data;
