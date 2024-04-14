const Project = require("../models/Project");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary (replace placeholders with your actual Cloudinary credentials)
cloudinary.config({
  cloud_name: "dd2jb03fi",
  api_key: "639884458622366",
  api_secret: "zRqyRW7kZgewyS5SpPirXSrmopU",
});
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const projectController = {
  createProject: async (req, res) => {
    try {
      // Check if req.file is available
      if (!req.files) {
        throw new Error("No file uploaded");
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          folder: "projects", // Specify the folder to store images in Cloudinary
        }
      );

      // Create destination with image URL and other form fields
      const project = await Project.create({
        name: req.body.name,
        image: result.secure_url, // Save the image URL from Cloudinary
        description: req.body.description,
        demoLink: req.body.demoLink,
      });

      res.status(201).json({
        status: "success",
        data: project,
      });
    } catch (err) {
      console.error("Error occurred during file upload:", err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  },

  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find();
      res.status(200).json({
        status: "success",
        data: projects,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
};

module.exports = projectController;
