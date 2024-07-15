import express from "express";
import Image from "../models/ImageModel.js";

// NOTICE: req.file.path? oder req.body?
// CREAT new image
export const createImage = async (req, res, next) => {
  try {
    await Image.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

// GET all users
export const getAllImages = async (req, res, next) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};

// GET user
export const getSingleImage = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    image ? res.status(200).json(image) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

// UPDATE user
export const updateSingleImage = async (req, res, next) => {
  try {
    const image = await Image.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    image ? res.status(200).json(image) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

// DELETE user

export const deleteSingleImage = async (req, res, next) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    res.status(200).json(image);
  } catch (error) {
    next(error);
  }
};
