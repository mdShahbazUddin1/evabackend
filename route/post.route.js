const express = require("express");
const jwt = require("jsonwebtoken");
const { PostModel } = require("../model/post.model");
const postRoute = express.Router();

postRoute.get("/",async(req,res)=>{
     const token = req.headers.authorization;
     const decoded = jwt.verify(token, "superman");
     try {
       if (decoded) {
         const post = await PostModel.find({ userID: decoded.userID });
         if (post.length > 0) {
           res.status(200).send(post);
         } else {
           res.status(400).send({ msg: "You haven't added any note yet!" });
         }
       }
     } catch (err) {
       res.status(400).send({ msg: err.message });
     }
})

postRoute.post("/add", async (req, res) => {
  try {
      const post = new PostModel(req.body);
      await post.save()
      res.status(200).send({"msg":"post added"});
  } catch (error) {
    res.status(400).send({ msg:"Failed to post"});
  }
});
postRoute.patch("/update/:id", async (req, res) => {
    const {id} =req.params;
    const payload = req.body;

  try {
     await PostModel.findByIdAndUpdate({_id:id},payload);
      res.status(200).send({"msg":"post updated"});
  } catch (error) {
    res.status(400).send({ msg:"Failed to update"});
  }
});
postRoute.delete("/delete/:id", async (req, res) => {
    const {id} =req.params;

  try {
     await PostModel.findByIdAndDelete({_id:id});
      res.status(200).send({"msg":"post deleted"});
  } catch (error) {
    res.status(400).send({ msg:"Failed to delete"});
  }
});

module.exports = {
    postRoute
}
